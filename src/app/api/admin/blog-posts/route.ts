import { NextResponse } from "next/server"
import { requireAdminRole } from "@/lib/admin-request-auth"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

const TABLE = "blog_posts"

type BlogBody = {
  id?: string
  slug?: string
  title?: string
  excerpt?: string
  category?: string
  date?: string
  author?: string
  readingTime?: number
  tags?: string[]
  content?: unknown[]
}

export async function GET(request: Request) {
  const auth = await requireAdminRole(request, "viewer")
  if (!auth.ok) return auth.response

  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from(TABLE)
      .select("id, slug, title, excerpt, category, date, author, readingTime, tags, content, updated_at")
      .order("updated_at", { ascending: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ items: data ?? [] })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unexpected error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminRole(request, "editor")
  if (!auth.ok) return auth.response

  try {
    const body = (await request.json()) as BlogBody
    const slug = String(body.slug || "").trim()
    const title = String(body.title || "").trim()

    if (!slug || !title) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()
    const payload = {
      slug,
      title,
      excerpt: String(body.excerpt || ""),
      category: String(body.category || "General"),
      date: String(body.date || new Date().toISOString().slice(0, 10)),
      author: String(body.author || "Shubham"),
      readingTime: Number(body.readingTime || 4),
      tags: Array.isArray(body.tags) ? body.tags : [],
      content: Array.isArray(body.content) ? body.content : [],
    }

    const { data, error } = await supabase.from(TABLE).insert(payload).select("id").single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, id: data?.id ?? null })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unexpected error" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const auth = await requireAdminRole(request, "editor")
  if (!auth.ok) return auth.response

  try {
    const body = (await request.json()) as BlogBody
    if (!body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

    const patch = {
      slug: String(body.slug || ""),
      title: String(body.title || ""),
      excerpt: String(body.excerpt || ""),
      category: String(body.category || "General"),
      date: String(body.date || new Date().toISOString().slice(0, 10)),
      author: String(body.author || "Shubham"),
      readingTime: Number(body.readingTime || 4),
      tags: Array.isArray(body.tags) ? body.tags : [],
      content: Array.isArray(body.content) ? body.content : [],
      updated_at: new Date().toISOString(),
    }

    const supabase = getSupabaseAdmin()
    const { error } = await supabase.from(TABLE).update(patch).eq("id", body.id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unexpected error" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const auth = await requireAdminRole(request, "editor")
  if (!auth.ok) return auth.response

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

  try {
    const supabase = getSupabaseAdmin()
    const { error } = await supabase.from(TABLE).delete().eq("id", id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unexpected error" }, { status: 500 })
  }
}
