import type { AdminRole } from "@/lib/admin-auth"

export type AdminSessionInfo = {
  role: AdminRole
  displayName: string
  expiresAt: number
  expiresInSeconds: number
}

export async function fetchAdminSessionInfo(): Promise<AdminSessionInfo> {
  const res = await fetch("/api/admin/session", { cache: "no-store" })
  const json = await res.json()
  if (!res.ok || !json?.ok) throw new Error(json?.error || "Unauthorized")

  const role = String(json.role) as AdminRole
  if (!["owner", "admin", "editor", "viewer"].includes(role)) {
    throw new Error("Invalid role")
  }

  return {
    role,
    displayName: String(json.displayName || "Admin"),
    expiresAt: Number(json.expiresAt || 0),
    expiresInSeconds: Number(json.expiresInSeconds || 0),
  }
}

