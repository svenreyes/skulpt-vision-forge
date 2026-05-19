# Circle Supabase setup

Circle is invite-only. There is no public signup form. Admins invite new
members by email through `/api/circle/admin/invite`, which calls Supabase's
`auth.admin.inviteUserByEmail`. The invitee gets a one-time email link, lands
on `/circle/accept-invite`, picks their own password, and fills in their
profile.

## 1. Apply the migration

Open the Supabase dashboard → **SQL Editor** → **New query** → paste the
contents of `migrations/20260516143000_circle_profiles.sql` → **Run**.

This creates:

- `public.profiles` — one row per `auth.users` user, with role + invite metadata
- `public.is_admin(uuid)` — security-definer helper used by RLS
- `on_auth_user_created` trigger on `auth.users` — auto-creates a profile row
- RLS policies — members see/edit themselves, admins see/edit all
- Backfill for any existing auth users

## 2. Configure Supabase dashboard

In the Supabase dashboard for the project:

- **Authentication → URL Configuration**:
  - **Site URL**: `https://skulptbrand.com` (your prod origin, no path). This
    is only used when an email is generated _without_ an explicit `redirectTo`
    — e.g. when you invite from the Supabase dashboard's "Invite user" button.
    Our in-app admin panel always passes an explicit `redirectTo`, so it
    bypasses this setting.
  - **Redirect URLs** (allow-list — add all three):
    - `https://skulptbrand.com/circle/accept-invite`
    - `https://www.skulptbrand.com/circle/accept-invite` _(only if you serve
      from the www subdomain too)_
    - `http://localhost:8080/circle/accept-invite` _(local dev — `npm run
      dev` listens on 8080; see `vite.config.ts`)_

  If a `redirectTo` value isn't in the allow-list, Supabase silently falls
  back to Site URL. That's the most common reason invite links land on the
  wrong domain.

- **Authentication → Email Templates → Invite user**:
  - Paste your custom HTML (e.g. from designmodo) into the **Message body**.
  - **Keep the Liquid placeholder `{{ .ConfirmationURL }}`** somewhere — that's
    the one-time magic link Supabase generates. The CTA button in your
    template should be:
    ```html
    <a href="{{ .ConfirmationURL }}">Accept your Circle invite</a>
    ```
  - Other useful variables you can use inside the template:
    - `{{ .Email }}` — invitee's email
    - `{{ .Data.full_name }}` — whatever the admin typed into the invite form
      (our `/api/circle/admin/invite` endpoint sets this in `user_metadata`)
    - `{{ .SiteURL }}` — for logo / footer links
  - Inline all CSS — most email clients strip `<link>` and `<style>` tags.
  - Update the **Subject heading** too. Save changes, then send a test invite
    from the in-app admin panel to verify.

- **Authentication → Providers → Email**:
  - **Enable Email provider** — yes.
  - **Confirm email** — yes (default for invites).
  - **Allow new users to sign up** — **NO**. Circle is invite-only; this flag
    controls the public `signUp()` API. Disabling it is the database-level
    guard that backs up the "we don't expose a signup form" UX.

### Where to send invites from

| Source | Use this for |
|---|---|
| Supabase dashboard → **Invite user** button | One-time only — bootstrapping the first admin (you) |
| In-app admin panel (`/circle` while signed in as admin) | All other invites — always uses the correct `redirectTo` based on origin |

The dashboard's Invite User button does **not** pass `redirectTo`, so the
email link points at Site URL. That's why a freshly-created Supabase project
sends invites to `localhost:3000` (the default Site URL) until you change it.

## 3. Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (and
in `.env.local` for local dev):

| Name | Scope | Value |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | client + server | `https://<project>.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | client + server | publishable / anon key |
| `SUPABASE_SECRET_KEY` | server only | service-role key (Supabase calls this `sb_secret_…`) |
| `ADMIN_EMAILS` | server only | comma-separated lowercase emails that get auto-promoted to admin on first sign-in |
| `SITE_URL` | server only (optional) | overrides the invite redirect origin |

**Do not** expose `SUPABASE_SECRET_KEY` to the frontend. It must only live in
serverless functions under `api/`.

## 4. Bootstrap the first admin

1. Add your email to `ADMIN_EMAILS` in Vercel and `.env.local`.
2. Make sure **Site URL** is set to whichever environment you're bootstrapping
   from (e.g. `http://localhost:8080` for local, `https://skulptbrand.com` for
   prod). This one-time step matters because the dashboard's Invite User
   button uses Site URL — every other invite afterward uses the admin panel,
   which sets `redirectTo` explicitly.
3. From the Supabase dashboard → **Authentication → Users → Invite user**,
   invite yourself.
4. Click the link in your invite email → land on `/circle/accept-invite` →
   set your password and profile.
5. Set **Site URL** back to `https://skulptbrand.com` (prod) so future
   manually-issued invites default to prod.
6. Sign in to `/circle`. On session resume, `/api/circle/profile/sync` sees
   your email in `ADMIN_EMAILS` and flips your `profiles.role` to `admin`.
7. The dashboard now shows the admin panel as a second snap-scroll section.
   You can invite the rest of the Circle from there.

## 5. Endpoints

| Method | Path | Who | Purpose |
| --- | --- | --- | --- |
| POST | `/api/circle/profile/sync` | any signed-in user | Ensures profile row exists; promotes `ADMIN_EMAILS` to admin |
| POST | `/api/circle/admin/invite` | admin | Sends Supabase invite email; body `{ email, fullName? }` |

Both require an `Authorization: Bearer <access_token>` header (the frontend
client adds it automatically via `supabase.auth.getSession()`).
