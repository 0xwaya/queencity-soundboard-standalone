import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client — never use in client components.
// Prefers SUPABASE_URL / SUPABASE_ANON_KEY (not NEXT_PUBLIC_ prefixed) so
// these credentials are never bundled for the browser.
// Falls back to NEXT_PUBLIC_ equivalents to ease the migration.

type SupabaseCredentialPair = {
  url: string;
  anonKey: string;
};

function getSupabaseCredentialPairs(): SupabaseCredentialPair[] {
  const pairs: SupabaseCredentialPair[] = [];

  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    pairs.push({
      url: process.env.SUPABASE_URL,
      anonKey: process.env.SUPABASE_ANON_KEY,
    });
  }

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    const publicPair = {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    };

    const alreadyIncluded = pairs.some(
      (pair) =>
        pair.url === publicPair.url && pair.anonKey === publicPair.anonKey,
    );

    if (!alreadyIncluded) {
      pairs.push(publicPair);
    }
  }

  return pairs;
}

export function hasServerSupabaseConfig(): boolean {
  return getSupabaseCredentialPairs().length > 0;
}

export function getServerSupabaseClients() {
  if (!hasServerSupabaseConfig()) {
    throw new Error(
      "Missing Supabase server env vars (SUPABASE_URL / SUPABASE_ANON_KEY)",
    );
  }

  return getSupabaseCredentialPairs().map(({ url, anonKey }) =>
    createClient(url, anonKey, {
      auth: { persistSession: false },
    }),
  );
}

export function getServerSupabaseClient() {
  return getServerSupabaseClients()[0];
}
