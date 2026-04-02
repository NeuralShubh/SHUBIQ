'use server'
import { cookies } from 'next/headers'
import {
  ADMIN_AUTH_COOKIE,
  ADMIN_ROLE_COOKIE,
  createAdminSessionToken,
  getExpiryTimestamp,
  resolveRoleFromPassword,
} from '@/lib/admin-auth'

export async function loginWithPassword(prevState: any, formData: FormData) {
  const password = String(formData.get('password') || '')
  const matched = resolveRoleFromPassword(password)

  if (matched) {
    const cookieStore = await cookies()
    const expiresAt = getExpiryTimestamp(30)
    const token = await createAdminSessionToken(matched.role, matched.displayName, expiresAt)

    cookieStore.set(ADMIN_AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    cookieStore.set(ADMIN_ROLE_COOKIE, matched.role, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })

    return { success: true, role: matched.role }
  } else {
    return { error: 'Invalid password' }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_AUTH_COOKIE)
  cookieStore.delete(ADMIN_ROLE_COOKIE)
}
