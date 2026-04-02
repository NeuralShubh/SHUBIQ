import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import { requireAdminRole } from "@/lib/admin-request-auth"

const DEFAULT_PATHS = ["/", "/blog", "/projects", "/shubiq-studio", "/shubiq-labs", "/founder"]

export async function POST(request: Request) {
  const auth = await requireAdminRole(request, "admin")
  if (!auth.ok) return auth.response

  try {
    const body = (await request.json().catch(() => ({}))) as { paths?: unknown }
    const requestedPaths = Array.isArray(body.paths) ? body.paths.filter((path): path is string => typeof path === "string") : []
    const paths = requestedPaths.length > 0 ? requestedPaths : DEFAULT_PATHS

    for (const path of paths) {
      revalidatePath(path)
    }

    return NextResponse.json({ ok: true, paths, revalidatedAt: new Date().toISOString() })
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
