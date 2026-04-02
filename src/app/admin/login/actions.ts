'use server'
import { cookies } from 'next/headers'
import {
  ADMIN_AUTH_COOKIE,
  ADMIN_LOGIN_LOCK_COOKIE,
  ADMIN_ROLE_COOKIE,
  createAdminSessionToken,
  getExpiryTimestamp,
  normalizeSessionDays,
  resolveRoleFromPassword,
} from '@/lib/admin-auth'

type LoginLockState = {
  count: number
  firstFailedAt: number
  lockUntil: number | null
}

const LOCK_WINDOW_MS = 15 * 60 * 1000
const BASE_LOCK_MINUTES = 5

function sanitizeNextPath(value: string | null) {
  if (!value) return '/admin'
  if (!value.startsWith('/admin')) return '/admin'
  if (value.startsWith('//')) return '/admin'
  return value
}

function readLockState(raw: string | undefined): LoginLockState {
  if (!raw) return { count: 0, firstFailedAt: Date.now(), lockUntil: null }
  try {
    const parsed = JSON.parse(raw) as Partial<LoginLockState>
    return {
      count: Number(parsed.count || 0),
      firstFailedAt: Number(parsed.firstFailedAt || Date.now()),
      lockUntil: parsed.lockUntil ? Number(parsed.lockUntil) : null,
    }
  } catch {
    return { count: 0, firstFailedAt: Date.now(), lockUntil: null }
  }
}

function serializeLockState(state: LoginLockState) {
  return JSON.stringify(state)
}

function lockDurationMinutes(count: number) {
  if (count < 5) return 0
  const escalator = Math.min(4, count - 5)
  return BASE_LOCK_MINUTES * (escalator + 1)
}

export async function loginWithPassword(prevState: any, formData: FormData) {
  const password = String(formData.get('password') || '')
  const nextPath = sanitizeNextPath(String(formData.get('next') || '/admin'))
  const sessionDays = normalizeSessionDays(formData.get('sessionDays'))
  const cookieStore = await cookies()
  const now = Date.now()
  const lockState = readLockState(cookieStore.get(ADMIN_LOGIN_LOCK_COOKIE)?.value)

  if (lockState.lockUntil && now < lockState.lockUntil) {
    const remainingMinutes = Math.max(1, Math.ceil((lockState.lockUntil - now) / 60000))
    return { error: `Too many failed attempts. Try again in ${remainingMinutes} minute(s).`, lockUntil: lockState.lockUntil }
  }

  const matched = resolveRoleFromPassword(password)

  if (matched) {
    const expiresAt = getExpiryTimestamp(sessionDays)
    const token = await createAdminSessionToken(matched.role, matched.displayName, expiresAt)

    cookieStore.set(ADMIN_AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * sessionDays,
      path: '/',
    })

    cookieStore.set(ADMIN_ROLE_COOKIE, matched.role, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * sessionDays,
      path: '/',
    })

    cookieStore.set(ADMIN_LOGIN_LOCK_COOKIE, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/admin',
    })
    return { success: true, role: matched.role, redirectTo: nextPath }
  } else {
    const isNewWindow = now - lockState.firstFailedAt > LOCK_WINDOW_MS
    const nextCount = isNewWindow ? 1 : lockState.count + 1
    const firstFailedAt = isNewWindow ? now : lockState.firstFailedAt
    const lockMinutes = lockDurationMinutes(nextCount)
    const lockUntil = lockMinutes > 0 ? now + lockMinutes * 60 * 1000 : null

    cookieStore.set(ADMIN_LOGIN_LOCK_COOKIE, serializeLockState({ count: nextCount, firstFailedAt, lockUntil }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60,
      path: '/admin',
    })

    if (lockUntil) {
      return { error: `Too many failed attempts. Try again in ${lockMinutes} minute(s).`, lockUntil }
    }
    const triesLeft = Math.max(0, 5 - nextCount)
    return { error: triesLeft > 0 ? `Invalid password. ${triesLeft} attempt(s) left before lock.` : 'Invalid password' }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_AUTH_COOKIE)
  cookieStore.delete(ADMIN_ROLE_COOKIE)
  cookieStore.set(ADMIN_LOGIN_LOCK_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/admin',
  })
}
