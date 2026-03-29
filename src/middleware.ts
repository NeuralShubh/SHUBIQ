import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // If accessing any admin route (except /admin/login)
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    // Check for our simple auth cookie
    const authCookie = request.cookies.get('shubiq_admin_auth')?.value
    
    if (authCookie !== 'authenticated') {
      // Not authenticated, redirect to login
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
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
