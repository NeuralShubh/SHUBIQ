import { NextResponse, type NextRequest } from 'next/server'
import { ADMIN_AUTH_COOKIE, verifyAdminSessionToken } from '@/lib/admin-auth'

export async function middleware(request: NextRequest) {
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin')
  const isAdminLogin = request.nextUrl.pathname.startsWith('/admin/login')
  const isAdminApi = request.nextUrl.pathname.startsWith('/api/admin')

  if (isAdminPage || isAdminApi) {
    const sessionToken = request.cookies.get(ADMIN_AUTH_COOKIE)?.value
    const session = await verifyAdminSessionToken(sessionToken)

    if (!session) {
      if (isAdminApi) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      if (!isAdminLogin) {
        const url = request.nextUrl.clone()
        url.pathname = '/admin/login'
        url.searchParams.set('next', request.nextUrl.pathname)
        return NextResponse.redirect(url)
      }
    } else if (isAdminLogin) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
