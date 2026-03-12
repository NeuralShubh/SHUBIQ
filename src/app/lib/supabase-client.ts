export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const SUPABASE_ENABLED = !!supabaseUrl && !!supabaseAnonKey

let clientPromise: Promise<any> | null = null

export async function getSupabaseClient() {
  if (!SUPABASE_ENABLED) return null
  if (!clientPromise) {
    clientPromise = import("@supabase/supabase-js").then(({ createClient }) =>
      createClient(supabaseUrl, supabaseAnonKey),
    )
  }
  return clientPromise
}
