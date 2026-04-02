export type AdminRole = "owner" | "admin" | "editor" | "viewer"

export const ADMIN_AUTH_COOKIE = "shubiq_admin_session"
export const ADMIN_ROLE_COOKIE = "shubiq_admin_role"
const TOKEN_VERSION = "v1"
const DEFAULT_SESSION_DAYS = 30

const VALID_ROLES: AdminRole[] = ["owner", "admin", "editor", "viewer"]

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "shubiq-admin-session-secret"
}

function toHex(bytes: Uint8Array) {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

async function sha256Hex(input: string) {
  const data = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return toHex(new Uint8Array(digest))
}

function isValidRole(role: string): role is AdminRole {
  return VALID_ROLES.includes(role as AdminRole)
}

export function getExpiryTimestamp(days = DEFAULT_SESSION_DAYS) {
  return Date.now() + days * 24 * 60 * 60 * 1000
}

export async function createAdminSessionToken(role: AdminRole, displayName = "Shubham", expiresAt = getExpiryTimestamp()) {
  const safeName = encodeURIComponent(displayName)
  const payload = `${TOKEN_VERSION}.${role}.${expiresAt}.${safeName}`
  const signature = await sha256Hex(`${payload}.${getSecret()}`)
  return `${payload}.${signature}`
}

export async function verifyAdminSessionToken(token: string | undefined | null) {
  if (!token) return null

  const parts = token.split(".")
  if (parts.length !== 5) return null

  const [version, roleRaw, expiresRaw, safeName, signature] = parts
  if (version !== TOKEN_VERSION || !isValidRole(roleRaw)) return null

  const expiresAt = Number(expiresRaw)
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return null

  const payload = `${version}.${roleRaw}.${expiresRaw}.${safeName}`
  const expectedSig = await sha256Hex(`${payload}.${getSecret()}`)
  if (signature !== expectedSig) return null

  return {
    role: roleRaw,
    expiresAt,
    displayName: decodeURIComponent(safeName),
  }
}

export function resolveRoleFromPassword(password: string) {
  const singlePassword = process.env.ADMIN_PASSWORD
  if (singlePassword && password === singlePassword) {
    return { role: "owner" as AdminRole, displayName: "Owner" }
  }

  const rolePasswords: Array<{ role: AdminRole; value?: string }> = [
    { role: "owner", value: process.env.ADMIN_OWNER_PASSWORD },
    { role: "admin", value: process.env.ADMIN_ADMIN_PASSWORD },
    { role: "editor", value: process.env.ADMIN_EDITOR_PASSWORD },
    { role: "viewer", value: process.env.ADMIN_VIEWER_PASSWORD },
  ]

  const match = rolePasswords.find((item) => item.value && password === item.value)
  if (!match) return null

  const namesByRole: Record<AdminRole, string> = {
    owner: "Owner",
    admin: "Admin",
    editor: "Editor",
    viewer: "Viewer",
  }

  return { role: match.role, displayName: namesByRole[match.role] }
}
