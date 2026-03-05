import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

const CONTACT_TABLES = ["contact_submissions", "contacts", "messages"] as const

type SubmissionPatch = {
  id: string
  read?: boolean
}

async function resolveContactTable() {
  const supabase = getSupabaseAdmin()

  for (const table of CONTACT_TABLES) {
    const { error } = await supabase.from(table).select("id").limit(1)
    if (!error) return table
  }

  throw new Error("No contact table available")
}

export async function GET() {
  try {
    const table = await resolveContactTable()
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false }).limit(500)

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      submissions: data ?? [],
      table,
    })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unable to fetch submissions" },
      { status: 500 },
    )
  }
}

export async function PATCH(req: Request) {
  try {
    const body = (await req.json()) as Partial<SubmissionPatch>
    if (!body.id) {
      return NextResponse.json({ ok: false, error: "Missing submission id" }, { status: 400 })
    }

    const table = await resolveContactTable()
    const supabase = getSupabaseAdmin()
    const patch: Record<string, unknown> = {}

    if (typeof body.read === "boolean") patch.read = body.read

    if (!Object.keys(patch).length) {
      return NextResponse.json({ ok: false, error: "No patch fields provided" }, { status: 400 })
    }

    const { error } = await supabase.from(table).update(patch).eq("id", body.id)
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unable to update submission" },
      { status: 500 },
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) {
      return NextResponse.json({ ok: false, error: "Missing submission id" }, { status: 400 })
    }

    const table = await resolveContactTable()
    const supabase = getSupabaseAdmin()
    const { error } = await supabase.from(table).delete().eq("id", id)

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unable to delete submission" },
      { status: 500 },
    )
  }
}
