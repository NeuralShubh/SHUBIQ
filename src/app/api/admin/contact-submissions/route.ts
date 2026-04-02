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

type ContactSubmission = {
  id: string
  name: string
  email: string
  phone: string
  business_type: string
  message: string
  source: string
  status: string
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
    phone: String(row.phone ?? ""),
    business_type: String(row.business_type ?? ""),
    message: String(row.message ?? ""),
    source: String(row.source ?? "website"),
    status: normalizeLeadStatus(row.status),
    created_at: row.created_at ? String(row.created_at) : null,
    read: Boolean(rawRead),
  }
}

export async function GET(request: Request) {
  const auth = await requireAdminRole(request, "viewer")
  if (!auth.ok) return auth.response

  try {
    const { searchParams } = new URL(request.url)
    const query = (searchParams.get("q") || "").trim().toLowerCase()
    const statusFilter = (searchParams.get("status") || "all").trim()
    const readFilter = (searchParams.get("read") || "all").trim()
    const page = Math.max(1, Number(searchParams.get("page") || 1))
    const pageSize = Math.min(100, Math.max(10, Number(searchParams.get("pageSize") || 20)))

    const table = await resolveContactTable()
    if (!table) {
      return NextResponse.json({ ok: false, error: "No contact submissions table found" }, { status: 500 })
    }

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false }).limit(5000)

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    const all = (data ?? []).map((row) => normalizeSubmission(row as Record<string, any>))
    const filtered = all.filter((item) => {
      if (statusFilter !== "all") {
        if (statusFilter === "new" && item.status !== "New") return false
        if (statusFilter === "in-progress" && item.status !== "In Progress") return false
        if (statusFilter === "responded" && item.status !== "Responded") return false
        if (statusFilter === "closed" && item.status !== "Closed") return false
      }

      if (readFilter !== "all") {
        if (readFilter === "read" && !item.read) return false
        if (readFilter === "unread" && item.read) return false
      }

      if (!query) return true
      return [item.name, item.email, item.phone, item.message, item.source, item.business_type]
        .map((value) => String(value || "").toLowerCase())
        .some((value) => value.includes(query))
    })

    const total = filtered.length
    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const safePage = Math.min(page, totalPages)
    const start = (safePage - 1) * pageSize
    const submissions = filtered.slice(start, start + pageSize)

    return NextResponse.json({
      ok: true,
      table,
      submissions,
      pagination: {
        page: safePage,
        pageSize,
        total,
        totalPages,
      },
      filters: {
        q: query,
        status: statusFilter,
        read: readFilter,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "unknown error" },
      { status: 500 },
    )
  }
}

export async function PATCH(req: Request) {
  const auth = await requireAdminRole(req, "editor")
  if (!auth.ok) return auth.response

  try {
    const body = (await req.json()) as { id?: string; ids?: string[]; read?: boolean; status?: string }
    const ids = Array.isArray(body.ids) ? body.ids.filter((id): id is string => typeof id === "string" && id.trim().length > 0) : []
    if (body.id && !ids.includes(body.id)) ids.push(body.id)
    if (ids.length === 0) {
      return NextResponse.json({ ok: false, error: "Missing id payload" }, { status: 400 })
    }
    const wantsRead = typeof body.read === "boolean"
    const wantsStatus = typeof body.status === "string" && body.status.trim().length > 0
    if (!wantsRead && !wantsStatus) {
      return NextResponse.json({ ok: false, error: "Provide read or status to update" }, { status: 400 })
    }

    const table = await resolveContactTable()
    if (!table) {
      return NextResponse.json({ ok: false, error: "No contact submissions table found" }, { status: 500 })
    }

    const supabase = getSupabaseAdmin()

    if (wantsStatus) {
      const normalized = normalizeLeadStatus(body.status)
      const { error } = await supabase.from(table).update({ status: normalized }).in("id", ids)
      if (!error) return NextResponse.json({ ok: true })
    }

    if (!wantsRead) {
      return NextResponse.json({ ok: false, error: "Unable to update status column on this table" }, { status: 500 })
    }

    // Try common "read" column names in order.
    const attempts: Array<Record<string, boolean>> = [{ read: body.read as boolean }, { is_read: body.read as boolean }, { viewed: body.read as boolean }]

    let lastError = "Unable to update read state"
    for (const patch of attempts) {
      const { error } = await supabase.from(table).update(patch).in("id", ids)
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
  const auth = await requireAdminRole(req, "admin")
  if (!auth.ok) return auth.response

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    const idsParam = searchParams.get("ids")
    const ids = idsParam
      ? idsParam
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean)
      : []
    if (id) ids.push(id)

    if (ids.length === 0) {
      return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 })
    }

    const table = await resolveContactTable()
    if (!table) {
      return NextResponse.json({ ok: false, error: "No contact submissions table found" }, { status: 500 })
    }

    const supabase = getSupabaseAdmin()
    const { error } = await supabase.from(table).delete().in("id", ids)
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "unknown error" },
      { status: 500 },
    )
  }
}
