import { createClient } from "@supabase/supabase-js";
import type { Database } from "@beatles-story/shared-types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function createSupabaseClient() {
  if (!supabaseUrl || !publishableKey) {
    throw new Error("Supabase public environment variables are not configured.");
  }

  return createClient<Database>(
    supabaseUrl,
    publishableKey,
  );
}

export function createSupabaseAdminClient() {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase admin environment variables are not configured.");
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function hasSupabasePublicConfig() {
  return Boolean(supabaseUrl && publishableKey);
}

export function hasSupabaseAdminConfig() {
  return Boolean(supabaseUrl && serviceRoleKey);
}
