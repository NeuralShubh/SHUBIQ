import { NextResponse } from "next/server"
import { ADMIN_AUTH_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth"

function getCookieValue(cookieHeader: string, name: string) {
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`))
  return match ? decodeURIComponent(match[1]) : null
}

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") || ""
  const token = getCookieValue(cookieHeader, ADMIN_AUTH_COOKIE)
  const session = await verifyAdminSessionToken(token)

  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  const expiresInSeconds = Math.max(0, Math.floor((session.expiresAt - Date.now()) / 1000))
  return NextResponse.json({
    ok: true,
    role: session.role,
    displayName: session.displayName || "Admin",
    expiresAt: session.expiresAt,
    expiresInSeconds,
  })
}

