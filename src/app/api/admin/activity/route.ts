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
  const auth = await requireAdminRole(request, "viewer")
  if (!auth.ok) return auth.response

  try {
    const supabase = getSupabaseAdmin()
    const contactTable = await resolveContactTable()
    if (!contactTable) return NextResponse.json({ ok: false, error: "No contact table found" }, { status: 500 })

    const [{ data: leads, error: leadError }, { data: posts, error: postError }, { data: content, error: contentError }] = await Promise.all([
      supabase.from(contactTable).select("id, name, email, status, source, created_at").order("created_at", { ascending: false }).limit(30),
      supabase.from("blog_posts").select("id, title, slug, updated_at").order("updated_at", { ascending: false }).limit(20),
      supabase.from("site_content").select("key, updated_at").order("updated_at", { ascending: false }).limit(20),
    ])

    if (leadError) return NextResponse.json({ ok: false, error: leadError.message }, { status: 500 })
    if (postError) return NextResponse.json({ ok: false, error: postError.message }, { status: 500 })
    if (contentError) return NextResponse.json({ ok: false, error: contentError.message }, { status: 500 })

    const items = [
      ...(leads ?? []).map((lead) => ({
        id: `lead-${lead.id}`,
        type: "lead" as const,
        title: lead.name ? `Lead: ${lead.name}` : "New lead submission",
        description: `${lead.email || "No email"} • ${lead.status || "New"} • ${lead.source || "website"}`,
        at: lead.created_at,
      })),
      ...(posts ?? []).map((post) => ({
        id: `blog-${post.id}`,
        type: "blog" as const,
        title: `Blog updated: ${post.title || post.slug || "Untitled"}`,
        description: post.slug ? `/blog/${post.slug}` : "No slug",
        at: post.updated_at,
      })),
      ...(content ?? []).map((entry) => ({
        id: `content-${entry.key}`,
        type: "content" as const,
        title: `Content updated: ${entry.key}`,
        description: "Managed content record changed",
        at: entry.updated_at,
      })),
    ]
      .filter((item) => Boolean(item.at))
      .sort((a, b) => new Date(b.at || 0).getTime() - new Date(a.at || 0).getTime())
      .slice(0, 60)

    return NextResponse.json({
      ok: true,
      checkedAt: new Date().toISOString(),
      items,
    })
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

