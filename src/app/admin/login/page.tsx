'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      setError('Invalid credentials')
      setLoading(false)
    } else {
      window.location.href = '/admin'
    }
  }
  
  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4 font-inter selection:bg-[#3b82f6]/30">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold tracking-[2px] text-white">SHUBIQ <span className="text-[#3b82f6]">Admin</span></h1>
          <p className="text-sm text-[#71717a] mt-1">Sign in to manage your site</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-[#18181b] border border-[#27272a] rounded-lg px-4 py-3 text-sm text-white placeholder:text-[#71717a] focus:outline-none focus:border-[#3b82f6] transition-colors"
            required
          />
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-[#18181b] border border-[#27272a] rounded-lg px-4 py-3 text-sm text-white placeholder:text-[#71717a] focus:outline-none focus:border-[#3b82f6] transition-colors"
            required
          />
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg py-3 text-sm font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
