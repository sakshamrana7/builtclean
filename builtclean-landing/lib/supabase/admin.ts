import { createClient } from "@supabase/supabase-js";

// Lazy singleton — deferred until first use so module evaluation at build time doesn't fail
let _admin: ReturnType<typeof createClient> | null = null;

function getAdmin() {
  if (!_admin) {
    _admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );
  }
  return _admin;
}

export const supabaseAdmin = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    return getAdmin()[prop as keyof ReturnType<typeof createClient>];
  },
});
