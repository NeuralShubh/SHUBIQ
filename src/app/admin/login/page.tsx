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
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4 font-inter selection:bg-[#3b82f6]/30">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold tracking-[2px] text-white">SHUBIQ <span className="text-[#3b82f6]">Admin</span></h1>
          <p className="text-sm text-[#71717a] mt-1">Enter your password to access the panel</p>
        </div>
        
        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg">
              {state.error}
            </div>
          )}
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-[#18181b] border border-[#27272a] rounded-lg px-4 py-3 text-sm text-white placeholder:text-[#71717a] focus:outline-none focus:border-[#3b82f6] transition-colors"
            required
          />
          
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg py-3 text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isPending ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
