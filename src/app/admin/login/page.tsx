'use client'

import { useActionState } from 'react'
import { loginWithPassword } from './actions'

const initialState: any = {}

export default function AdminLogin() {
  const [state, formAction, isPending] = useActionState(loginWithPassword, initialState)
  
  if (state?.success) {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin'
    }
  }
  
  return (
    <div className="relative min-h-screen bg-[rgb(var(--ink-rgb))] flex items-center justify-center px-4 font-inter selection:bg-gold/30">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgb(var(--gold-rgb)/0.08),transparent_45%),radial-gradient(circle_at_80%_80%,rgb(var(--gold-rgb)/0.06),transparent_40%)]" />
      <div className="w-full max-w-sm rounded-2xl border border-[rgb(var(--cream-rgb)/0.14)] bg-[linear-gradient(165deg,rgb(var(--surface-1-rgb)/0.86),rgb(var(--surface-0-rgb)/0.94))] p-6 sm:p-7 shadow-[0_25px_80px_rgb(0_0_0_/_0.35)]">
        <div className="text-center mb-8">
          <h1 className="text-xl font-black tracking-[2px] text-cream font-cinzel">SHUBIQ <span className="text-gold">Admin</span></h1>
          <p className="text-sm text-cream/60 mt-1">Secure access portal</p>
        </div>
        
        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-sm px-4 py-3 rounded-lg">
              {state.error}
            </div>
          )}
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-[rgb(var(--surface-1-rgb))] border border-[rgb(var(--cream-rgb)/0.16)] rounded-lg px-4 py-3 text-sm text-cream placeholder:text-cream/45 focus:outline-none focus:border-gold/60 transition-colors"
            required
          />
          
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gold hover:bg-gold-light text-ink rounded-lg py-3 text-sm font-semibold tracking-[0.08em] uppercase font-rajdhani transition-colors disabled:opacity-50"
          >
            {isPending ? 'Authenticating...' : 'Access Admin'}
          </button>
        </form>

        <p className="mt-4 text-center text-[11px] text-cream/45 tracking-[0.08em] uppercase font-rajdhani">
          Role-based secure session
        </p>
      </div>
    </div>
  )
}
