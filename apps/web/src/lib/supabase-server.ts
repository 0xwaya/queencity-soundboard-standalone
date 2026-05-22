import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client — never use in client components.
// Prefers SUPABASE_URL / SUPABASE_ANON_KEY (not NEXT_PUBLIC_ prefixed) so
// these credentials are never bundled for the browser.
// Falls back to NEXT_PUBLIC_ equivalents to ease the migration.

const supabaseUrl =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function hasServerSupabaseConfig(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getServerSupabaseClient() {
  if (!hasServerSupabaseConfig()) {
    throw new Error(
      "Missing Supabase server env vars (SUPABASE_URL / SUPABASE_ANON_KEY)",
    );
  }

  return createClient(supabaseUrl!, supabaseAnonKey!, {
    auth: { persistSession: false },
  });
}
