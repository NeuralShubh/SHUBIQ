export class AdminApiError extends Error {
  status: number
  unauthorized: boolean
  payload: unknown

  constructor(message: string, status: number, payload: unknown) {
    super(message)
    this.status = status
    this.unauthorized = status === 401
    this.payload = payload
  }
}

export async function adminFetchJson<T = any>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    cache: "no-store",
    ...init,
  })

  let json: any = null
  try {
    json = await res.json()
  } catch {
    json = null
  }

  if (!res.ok) {
    const message = json?.error || json?.message || `Request failed (${res.status})`
    throw new AdminApiError(message, res.status, json)
  }

  return json as T
}

export function adminLoginRedirectPath(pathname: string, search = "") {
  const next = `${pathname}${search || ""}`
  return `/admin/login?next=${encodeURIComponent(next)}`
}

