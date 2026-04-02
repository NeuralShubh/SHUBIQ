import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { getBlogPosts, normalizeBlogPost } from "@/app/blog/blogData"

const TABLE = "blog_posts"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")?.trim()
  const staticPosts = getBlogPosts()

  try {
    const supabase = getSupabaseAdmin()
    const query = supabase
      .from(TABLE)
      .select("slug, title, excerpt, category, date, author, readingTime, tags, content, updated_at")
      .order("updated_at", { ascending: false })

    const { data, error } = slug ? await query.eq("slug", slug) : await query
    if (error) throw new Error(error.message)

    const dbPosts = (data ?? [])
      .map((item) => normalizeBlogPost(item))
      .filter((item): item is NonNullable<typeof item> => !!item)

    if (slug) {
      const matched = dbPosts[0] ?? staticPosts.find((post) => post.slug === slug)
      if (!matched) return NextResponse.json({ error: "Not found" }, { status: 404 })
      return NextResponse.json({ item: matched })
    }

    const bySlug = new Map<string, (typeof dbPosts)[number]>()
    for (const post of staticPosts) bySlug.set(post.slug, post)
    for (const post of dbPosts) bySlug.set(post.slug, post)

    return NextResponse.json({ items: Array.from(bySlug.values()) })
  } catch {
    if (slug) {
      const matched = staticPosts.find((post) => post.slug === slug)
      if (!matched) return NextResponse.json({ error: "Not found" }, { status: 404 })
      return NextResponse.json({ item: matched })
    }

    return NextResponse.json({ items: staticPosts })
  }
}

