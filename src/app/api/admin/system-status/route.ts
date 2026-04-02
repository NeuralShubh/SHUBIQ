import { NextResponse } from "next/server"
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

async function countRows(table: string) {
  const supabase = getSupabaseAdmin()
  const { count, error } = await supabase.from(table).select("*", { head: true, count: "exact" })
  if (error) return null
  return typeof count === "number" ? count : null
}

export async function GET() {
  const hasSinglePassword = Boolean(process.env.ADMIN_PASSWORD)
  const rolePasswords = {
    owner: Boolean(process.env.ADMIN_OWNER_PASSWORD),
    admin: Boolean(process.env.ADMIN_ADMIN_PASSWORD),
    editor: Boolean(process.env.ADMIN_EDITOR_PASSWORD),
    viewer: Boolean(process.env.ADMIN_VIEWER_PASSWORD),
  }

  try {
    const contactTable = await resolveContactTable()
    const contactCount = contactTable ? await countRows(contactTable) : null
    const blogCount = await countRows("blog_posts")
    const contentCount = await countRows("site_content")

    return NextResponse.json({
      ok: true,
      checkedAt: new Date().toISOString(),
      environment: {
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://shubiq.com",
        hasAdminSessionSecret: Boolean(process.env.ADMIN_SESSION_SECRET),
        hasSinglePassword,
        authMode: hasSinglePassword ? "single-password" : "role-based",
        rolesConfigured: rolePasswords,
      },
      database: {
        connected: contactTable !== null || blogCount !== null || contentCount !== null,
        activeContactTable: contactTable,
        counts: {
          contacts: contactCount,
          blogPosts: blogCount,
          managedContent: contentCount,
        },
      },
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

