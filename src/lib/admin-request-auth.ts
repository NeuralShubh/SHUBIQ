import { NextResponse } from "next/server"
import { ADMIN_AUTH_COOKIE, type AdminRole, verifyAdminSessionToken } from "@/lib/admin-auth"

const ROLE_PRIORITY: Record<AdminRole, number> = {
  viewer: 0,
  editor: 1,
  admin: 2,
  owner: 3,
}

export function hasMinimumRole(role: AdminRole, minimum: AdminRole) {
  return ROLE_PRIORITY[role] >= ROLE_PRIORITY[minimum]
}

function getCookieValue(cookieHeader: string, name: string) {
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`))
  return match ? decodeURIComponent(match[1]) : null
}

export async function requireAdminRole(request: Request, minimumRole: AdminRole) {
  const cookieHeader = request.headers.get("cookie") || ""
  const token = getCookieValue(cookieHeader, ADMIN_AUTH_COOKIE)
  const session = await verifyAdminSessionToken(token)

  if (!session) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    }
  }

  if (!hasMinimumRole(session.role, minimumRole)) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    }
  }

  return {
    ok: true as const,
    role: session.role,
  }
}

