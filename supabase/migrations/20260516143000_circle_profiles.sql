-- =============================================================================
-- Circle: invite-only member directory
-- =============================================================================
-- Adds a `public.profiles` table linked 1:1 to `auth.users`, an `is_admin`
-- helper, RLS so members can only see/edit themselves (admins see all), and a
-- trigger that auto-creates a profile row whenever an invited user accepts.
--
-- Apply this in the Supabase SQL editor (Project → SQL → New query → paste).
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'circle_role') then
    create type public.circle_role as enum ('member', 'admin');
  end if;
end$$;

-- ---------------------------------------------------------------------------
-- Profiles table
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id              uuid primary key references auth.users (id) on delete cascade,
  email           text not null,
  full_name       text,
  location        text,
  linkedin_url    text,
  title_company   text,
  role            public.circle_role not null default 'member',
  invited_by      uuid references auth.users (id) on delete set null,
  invited_at      timestamptz,
  accepted_at     timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table  public.profiles is 'Per-user profile data for SKULPT Circle members.';
comment on column public.profiles.role is 'member = ordinary Circle member; admin = can invite + see all profiles.';
comment on column public.profiles.accepted_at is 'Set when the user finishes the accept-invite flow (sets password + completes profile).';

-- Lowercase emails so lookups are deterministic.
create unique index if not exists profiles_email_lower_idx
  on public.profiles (lower(email));

-- Index admin queries that filter/order by role.
create index if not exists profiles_role_idx on public.profiles (role);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- is_admin helper
-- ---------------------------------------------------------------------------
-- security definer so RLS policies can call it without recursing back into
-- profiles' own RLS. search_path is locked down per Supabase guidance.
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = uid and role = 'admin'
  );
$$;

revoke all on function public.is_admin(uuid) from public;
grant execute on function public.is_admin(uuid) to authenticated, service_role;

-- ---------------------------------------------------------------------------
-- Auto-create profile when a user is created in auth.users
-- ---------------------------------------------------------------------------
-- Fires for both magic-link invites (auth.admin.inviteUserByEmail) and any
-- other auth.users insert. We pull full_name from raw_user_meta_data if the
-- admin passed it when inviting.
create or replace function public.handle_new_circle_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, invited_at)
  values (
    new.id,
    new.email,
    nullif(new.raw_user_meta_data ->> 'full_name', ''),
    new.invited_at
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_circle_user();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.profiles force row level security;

-- Members can read their own profile.
drop policy if exists profiles_select_self on public.profiles;
create policy profiles_select_self on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

-- Admins can read every profile.
drop policy if exists profiles_select_admin on public.profiles;
create policy profiles_select_admin on public.profiles
  for select
  to authenticated
  using ((select public.is_admin(auth.uid())));

-- Members can update their own profile, but cannot change their role.
-- NB: `with check (role = 'member')` is intentional — it prevents self-promotion
-- without querying the profiles table again (which would cause infinite recursion).
-- Admins updating their own row are covered by the profiles_update_admin policy.
drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check (
    (select auth.uid()) = id
    and role = 'member'
  );

-- Admins can update any profile (including promoting/demoting role).
drop policy if exists profiles_update_admin on public.profiles;
create policy profiles_update_admin on public.profiles
  for update
  to authenticated
  using ((select public.is_admin(auth.uid())))
  with check ((select public.is_admin(auth.uid())));

-- No client-side inserts or deletes. The trigger handles inserts; the
-- service_role bypasses RLS for deletes (e.g. revoking an invite).

-- ---------------------------------------------------------------------------
-- Backfill profile rows for any pre-existing auth users
-- ---------------------------------------------------------------------------
insert into public.profiles (id, email, full_name, invited_at)
select u.id,
       u.email,
       nullif(u.raw_user_meta_data ->> 'full_name', ''),
       u.invited_at
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null;
