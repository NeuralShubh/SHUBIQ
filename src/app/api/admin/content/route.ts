import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

const TABLE = "site_content"
const SUPPORTED_KEYS = new Set(["studio_content", "home_content", "labs_content"])

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get("key")

  if (!key || !SUPPORTED_KEYS.has(key)) {
    return NextResponse.json({ error: "Invalid or missing content key" }, { status: 400 })
  }

  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase.from(TABLE).select("content, updated_at").eq("key", key).maybeSingle()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ key, content: data?.content ?? null, updatedAt: data?.updated_at ?? null })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unexpected error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const key = String(body?.key || "")
    const content = body?.content

    if (!key || !SUPPORTED_KEYS.has(key)) {
      return NextResponse.json({ error: "Invalid content key" }, { status: 400 })
    }
    if (!content || typeof content !== "object") {
      return NextResponse.json({ error: "Invalid content payload" }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()
    const payload = { key, content, updated_at: new Date().toISOString() }
    const { data, error } = await supabase.from(TABLE).upsert(payload, { onConflict: "key" }).select("updated_at").single()

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
          hint: "Ensure table `site_content (key text primary key, content jsonb, updated_at timestamptz)` exists in Supabase.",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true, updatedAt: data?.updated_at ?? null })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unexpected error" }, { status: 500 })
  }
}
