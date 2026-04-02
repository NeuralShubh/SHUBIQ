import { NextResponse } from "next/server"
import { requireAdminRole } from "@/lib/admin-request-auth"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

const CONTACT_TABLES = ["contact_submissions", "contacts", "messages"] as const

function normalizeLeadStatus(input: unknown): "New" | "In Progress" | "Responded" | "Closed" {
  const value = String(input ?? "")
    .trim()
    .toLowerCase()
    .replace(/[_\s-]+/g, " ")

  if (!value) return "New"
  if (value === "new") return "New"
  if (value === "in progress" || value === "inprogress" || value === "progress") return "In Progress"
  if (value === "responded" || value === "response" || value === "replied") return "Responded"
  if (value === "closed" || value === "done" || value === "completed") return "Closed"
  return "New"
}

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
    if (!contactTable) {
      return NextResponse.json({ ok: false, error: "No contact table found" }, { status: 500 })
    }

    const [{ data: contactRows, error: contactError }, { data: blogRows, error: blogError }, { data: contentRows, error: contentError }] =
      await Promise.all([
        supabase.from(contactTable).select("id, status, source, created_at, read, is_read, viewed").order("created_at", { ascending: false }).limit(300),
        supabase.from("blog_posts").select("id, title, slug, updated_at").order("updated_at", { ascending: false }).limit(5),
        supabase.from("site_content").select("key, updated_at").order("updated_at", { ascending: false }).limit(5),
      ])

    if (contactError) return NextResponse.json({ ok: false, error: contactError.message }, { status: 500 })
    if (blogError) return NextResponse.json({ ok: false, error: blogError.message }, { status: 500 })
    if (contentError) return NextResponse.json({ ok: false, error: contentError.message }, { status: 500 })

    const contacts = contactRows ?? []
    const todayIso = new Date().toISOString().slice(0, 10)
    const isUnread = (item: Record<string, unknown>) => !(item.read ?? item.is_read ?? item.viewed ?? false)

    const byStatus = contacts.reduce<Record<string, number>>((acc, item) => {
      const key = normalizeLeadStatus((item as Record<string, unknown>).status)
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})

    const sourceTop = contacts.reduce<Record<string, number>>((acc, item) => {
      const key = String(item.source ?? "website")
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})

    const topSources = Object.entries(sourceTop)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([source, count]) => ({ source, count }))

    const todayCount = contacts.filter((item) => String(item.created_at ?? "").slice(0, 10) === todayIso).length
    const unreadCount = contacts.filter((item) => isUnread(item as Record<string, unknown>)).length

    return NextResponse.json({
      ok: true,
      checkedAt: new Date().toISOString(),
      totals: {
        leads: contacts.length,
        unread: unreadCount,
        newToday: todayCount,
        blogPosts: (blogRows ?? []).length,
      },
      leadStatus: {
        new: byStatus.New || 0,
        inProgress: byStatus["In Progress"] || 0,
        responded: byStatus.Responded || 0,
        closed: byStatus.Closed || 0,
      },
      topSources,
      recentBlog: (blogRows ?? []).map((row) => ({
        id: row.id,
        title: row.title,
        slug: row.slug,
        updatedAt: row.updated_at,
      })),
      recentContent: (contentRows ?? []).map((row) => ({
        key: row.key,
        updatedAt: row.updated_at,
      })),
    })
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
