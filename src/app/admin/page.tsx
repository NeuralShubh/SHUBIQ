"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Check against env var — NEXT_PUBLIC_ADMIN_PASSWORD
    const correctPw = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "shubiq_admin_2024"
    if (password === correctPw) {
      sessionStorage.setItem("shubiq_admin", "true")
      router.push("/admin/dashboard")
    } else {
      setError("Invalid credentials. Access denied.")
    }
    setLoading(false)
  }

  return (
    <div className="admin-readable min-h-screen bg-ink flex items-center justify-center px-6">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgb(var(--gold-rgb) / 0.03) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--gold-rgb) / 0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="font-cinzel font-black text-4xl tracking-[8px] text-gradient-gold mb-2">SHUBIQ</div>
          <div className="font-rajdhani text-[11px] tracking-[5px] uppercase text-gold/62">Admin Panel</div>
        </div>

        <div className="border border-gold/25 bg-[#0a0a0a] p-8">
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <h1 className="font-cinzel text-xl text-cream mb-8 font-bold">Access Control</h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="font-rajdhani text-[10px] tracking-[4px] uppercase text-gold/62 block mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#080808] border border-transparent text-cream font-cormorant text-[18px] px-4 py-3 focus:outline-none focus:border-gold/65 transition-colors duration-300 placeholder:text-cream/46"
                required
              />
            </div>

            {error && (
              <div className="border border-red-500/30 bg-red-500/5 p-3">
                <p className="font-rajdhani text-[10px] tracking-[2px] uppercase text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full font-rajdhani text-[12px] tracking-[3px] uppercase bg-gold text-ink py-3.5 font-semibold transition-all duration-300 hover:bg-gold-light disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Enter Admin"}
            </button>
          </form>

          <p className="font-cormorant text-cream/62 text-base mt-6 text-center">
            Unauthorized access is prohibited
          </p>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="font-rajdhani text-[10px] tracking-[3px] uppercase text-cream/55 hover:text-gold/65 transition-colors duration-300">
            ← Back to Site
          </a>
        </div>
      </div>
    </div>
  )
}
