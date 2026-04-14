import { createClient } from "@supabase/supabase-js";

/*
 * Run the following SQL in your Supabase SQL editor to create the waitlist table:
 *
 * create table waitlist (
 *   id uuid default gen_random_uuid() primary key,
 *   email text unique not null,
 *   source text default 'landing_page',
 *   created_at timestamp with time zone default now()
 * );
 *
 * -- Enable Row Level Security
 * alter table waitlist enable row level security;
 *
 * -- Only the service role can read/write (server-side only)
 * create policy "Service role only" on waitlist
 *   using (auth.role() = 'service_role');
 */

// Public client — lazy singleton, safe to use client-side (limited permissions via RLS)
let _supabase: ReturnType<typeof createClient> | null = null;
export function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return _supabase;
}

// Admin client — server-side only, bypasses RLS
export function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
