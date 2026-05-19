import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as
  | string
  | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // We don't throw to avoid breaking unrelated pages during dev when env is
  // not yet configured. The Circle login flow will surface a user-facing
  // error if these are missing at runtime.
  console.warn(
    "[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY. " +
      "Circle authentication will be disabled until these are set in .env.local."
  );
}

export const supabase = createClient(
  supabaseUrl ?? "https://invalid.local",
  supabaseAnonKey ?? "invalid",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      storageKey: "skulpt-circle-auth",
    },
  }
);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
