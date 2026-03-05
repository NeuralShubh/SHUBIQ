import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

const CONTACT_TABLES = ["contact_submissions", "contacts", "messages"] as const

type ContactSubmission = {
  id: string
  name: string
  email: string
  message: string
  source: string
  created_at: string | null
  read: boolean
}

async function resolveContactTable() {
  const supabase = getSupabaseAdmin()
  for (const table of CONTACT_TABLES) {
    const { error } = await supabase.from(table).select("id").limit(1)
    if (!error) return table
  }
  return null
}

function normalizeSubmission(row: Record<string, any>): ContactSubmission {
  const rawRead = row.read ?? row.is_read ?? row.viewed ?? false
  return {
    id: String(row.id ?? ""),
    name: String(row.name ?? ""),
    email: String(row.email ?? ""),
    message: String(row.message ?? ""),
    source: String(row.source ?? "website"),
    created_at: row.created_at ? String(row.created_at) : null,
    read: Boolean(rawRead),
  }
}

export async function GET() {
  try {
    const table = await resolveContactTable()
    if (!table) {
      return NextResponse.json({ ok: false, error: "No contact submissions table found" }, { status: 500 })
    }

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false }).limit(500)

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      table,
      submissions: (data ?? []).map((row) => normalizeSubmission(row as Record<string, any>)),
    })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "unknown error" },
      { status: 500 },
    )
  }
}

export async function PATCH(req: Request) {
  try {
    const body = (await req.json()) as { id?: string; read?: boolean }
    if (!body.id || typeof body.read !== "boolean") {
      return NextResponse.json({ ok: false, error: "Missing id/read payload" }, { status: 400 })
    }

    const table = await resolveContactTable()
    if (!table) {
      return NextResponse.json({ ok: false, error: "No contact submissions table found" }, { status: 500 })
    }

    const supabase = getSupabaseAdmin()

    // Try common "read" column names in order.
    const attempts: Array<Record<string, boolean>> = [
      { read: body.read },
      { is_read: body.read },
      { viewed: body.read },
    ]

    let lastError = "Unable to update read state"
    for (const patch of attempts) {
      const { error } = await supabase.from(table).update(patch).eq("id", body.id)
      if (!error) return NextResponse.json({ ok: true })
      lastError = error.message
    }

    return NextResponse.json({ ok: false, error: lastError }, { status: 500 })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "unknown error" },
      { status: 500 },
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) {
      return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 })
    }

    const table = await resolveContactTable()
    if (!table) {
      return NextResponse.json({ ok: false, error: "No contact submissions table found" }, { status: 500 })
    }

    const supabase = getSupabaseAdmin()
    const { error } = await supabase.from(table).delete().eq("id", id)
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "unknown error" },
      { status: 500 },
    )
  }
}
