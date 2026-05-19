import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Server-side Supabase clients. Never import this file from `src/`.

// `vercel dev` spawns function processes without inheriting .env.local.
// Load it manually as a fallback so local dev works without extra tooling.
function loadLocalEnv() {
  const needed = ['SUPABASE_URL', 'SUPABASE_SECRET_KEY'];
  if (needed.every((k) => process.env[k])) return;
  try {
    const content = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim();
      if (key && !process.env[key]) process.env[key] = val;
    }
  } catch {
    // Not found — expected in production where env vars come from the platform.
  }
}
loadLocalEnv();

let cachedAdminClient: SupabaseClient | null = null;

/**
 * A service-role Supabase client. Bypasses RLS — only use it from serverless
 * functions, and only after you've verified the caller's identity.
 */
export function getAdminClient(): SupabaseClient {
  if (cachedAdminClient) return cachedAdminClient;

  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !secret) {
    throw new Error(
      'Missing SUPABASE_URL / SUPABASE_SECRET_KEY (service-role key) env vars.',
    );
  }

  cachedAdminClient = createClient(url, secret, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  return cachedAdminClient;
}

/**
 * A short-lived client bound to a user's access token. Honors RLS as that
 * user. Useful for verifying who the caller is.
 */
export function getUserClient(accessToken: string): SupabaseClient {
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !anon) {
    throw new Error('Missing SUPABASE_URL / publishable key env vars.');
  }

  return createClient(url, anon, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  });
}
