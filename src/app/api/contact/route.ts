import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

const CONTACT_TABLES = ["contact_submissions", "contacts", "messages"] as const

type ContactPayload = {
  name: string
  email: string
  message: string
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<ContactPayload>

    const name = body.name?.trim() ?? ""
    const email = body.email?.trim() ?? ""
    const message = body.message?.trim() ?? ""

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email address" }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()
    const payload = { name, email, message, source: "shubiq" }
    const writeErrors: string[] = []

    for (const table of CONTACT_TABLES) {
      const { error } = await supabase.from(table).insert(payload)
      if (!error) return NextResponse.json({ ok: true })
      writeErrors.push(`${table}: ${error.message}`)
    }

    return NextResponse.json(
      { ok: false, error: "Unable to store contact submission", details: writeErrors },
      { status: 500 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: "Unexpected server error",
        details: error instanceof Error ? error.message : "unknown",
      },
      { status: 500 },
    )
  }
}
