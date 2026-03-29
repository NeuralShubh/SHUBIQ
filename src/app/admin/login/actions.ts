'use server'
import { cookies } from 'next/headers'

export async function loginWithPassword(prevState: any, formData: FormData) {
  const password = formData.get('password')
  const correctPassword = process.env.ADMIN_PASSWORD || 'shubiq2026' // Please set ADMIN_PASSWORD in your .env.local
  
  if (password === correctPassword) {
    const cookieStore = await cookies();
    cookieStore.set('shubiq_admin_auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
    return { success: true }
  } else {
    return { error: 'Invalid password' }
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('shubiq_admin_auth')
}
