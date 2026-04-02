import { NextResponse } from "next/server"
import { requireAdminRole } from "@/lib/admin-request-auth"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

const CONTACT_TABLES = ["contact_submissions", "contacts", "messages"] as const

async function resolveContactTable() {
  const supabase = getSupabaseAdmin()
  for (const table of CONTACT_TABLES) {
    const { error } = await supabase.from(table).select("id").limit(1)
    if (!error) return table
  }
  return null
}

export async function GET(request: Request) {
  const auth = await requireAdminRole(request, "admin")
  if (!auth.ok) return auth.response

  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") || "all"
  const supabase = getSupabaseAdmin()

  try {
    const payload: Record<string, unknown> = {
      exportedAt: new Date().toISOString(),
      type,
    }

    if (type === "leads" || type === "all") {
      const table = await resolveContactTable()
      if (table) {
        const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false }).limit(5000)
        if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
        payload.leadsTable = table
        payload.leads = data ?? []
      } else {
        payload.leadsTable = null
        payload.leads = []
      }
    }

    if (type === "blog" || type === "all") {
      const { data, error } = await supabase.from("blog_posts").select("*").order("updated_at", { ascending: false }).limit(5000)
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
      payload.blogPosts = data ?? []
    }

    if (type === "content" || type === "all") {
      const { data, error } = await supabase.from("site_content").select("*").order("updated_at", { ascending: false }).limit(5000)
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
      payload.managedContent = data ?? []
    }

    return NextResponse.json({ ok: true, ...payload })
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

