import { supabase } from "@/lib/supabase";

export type CircleRole = "member" | "admin";

export interface CircleProfile {
  id: string;
  email: string;
  full_name: string | null;
  location: string | null;
  linkedin_url: string | null;
  title_company: string | null;
  role: CircleRole;
  accepted_at: string | null;
  invited_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CircleSyncResponse {
  profile: Pick<CircleProfile, "id" | "email" | "full_name" | "role" | "accepted_at">;
}

// Hard ceiling so a stuck function never leaves the UI hanging.
const DEFAULT_TIMEOUT_MS = 12_000;

async function authedFetch<T>(
  path: string,
  init: RequestInit = {},
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<T> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error("Not signed in.");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(path, {
      ...init,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(init.headers ?? {}),
      },
    });

    const payload = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (!res.ok) {
      const message =
        typeof payload.error === "string" ? payload.error : `Request failed (${res.status})`;
      throw new Error(message);
    }
    return payload as T;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Ensures the current user has a profile row, auto-promotes ADMIN_EMAILS, and
 * returns the canonical profile + role.
 */
export function syncProfile(): Promise<CircleSyncResponse> {
  return authedFetch<CircleSyncResponse>("/api/circle/profile/sync", { method: "POST" });
}

/**
 * Admin-only: send a Supabase invite email to `email`. The invitee gets a
 * one-time link that lands them on /circle/accept-invite.
 */
export function inviteCircleMember(input: {
  email: string;
  fullName?: string;
}): Promise<{ ok: true; user: { id: string; email: string | null } | null }> {
  return authedFetch("/api/circle/admin/invite", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

/**
 * Lists all profiles. Visible only to admins via RLS — non-admins will get
 * just their own row.
 */
export async function listProfiles(): Promise<CircleProfile[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, email, full_name, location, linkedin_url, title_company, role, accepted_at, invited_at, created_at, updated_at",
    )
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as CircleProfile[];
}
