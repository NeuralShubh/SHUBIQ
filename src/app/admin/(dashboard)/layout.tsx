'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Settings, LogOut, FileText, Activity, Home, Menu, X } from 'lucide-react'
import { Toaster } from 'sonner'
import { logout } from '../login/actions'
import type { AdminRole } from '@/lib/admin-auth'
import { fetchAdminSessionInfo } from '@/lib/admin-session-client'
import { adminLoginRedirectPath } from '@/lib/admin-api-client'

type NavItem = {
  label: string
  href: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  roles: AdminRole[]
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/admin', icon: Home, roles: ['owner', 'admin', 'editor', 'viewer'] as AdminRole[] },
  { label: 'Activity', href: '/admin/activity', icon: Activity, roles: ['owner', 'admin', 'editor', 'viewer'] as AdminRole[] },
  { label: 'Content', href: '/admin/content', icon: FileText, roles: ['owner', 'admin', 'editor'] as AdminRole[] },
  { label: 'Settings', href: '/admin/settings', icon: Settings, roles: ['owner', 'admin'] as AdminRole[] },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const [activeRole, setActiveRole] = useState<AdminRole>('viewer')
  const [displayName, setDisplayName] = useState('Admin')
  const [sessionRemaining, setSessionRemaining] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    let alive = true

    const syncSession = async () => {
      try {
        const session = await fetchAdminSessionInfo()
        if (!alive) return
        setActiveRole(session.role)
        setDisplayName(session.displayName)
        setSessionRemaining(session.expiresInSeconds)
      } catch {
        if (!alive) return
        router.push(adminLoginRedirectPath(pathname || '/admin'))
      }
    }

    void syncSession()
    const interval = window.setInterval(() => {
      setSessionRemaining((prev) => (typeof prev === 'number' ? Math.max(0, prev - 1) : prev))
    }, 1000)

    return () => {
      alive = false
      window.clearInterval(interval)
    }
  }, [pathname, router])

  const handleLogout = async () => {
    await logout()
    router.push('/admin/login')
    router.refresh()
  }

  const visibleNavItems = useMemo(() => {
    const seen = new Set<string>()
    return navItems.filter((item) => {
      if (!item.roles.includes(activeRole)) return false
      if (seen.has(item.href)) return false
      seen.add(item.href)
      return true
    })
  }, [activeRole])

  const roleLabel = activeRole.charAt(0).toUpperCase() + activeRole.slice(1)
  const sessionLabel = useMemo(() => {
    if (typeof sessionRemaining !== 'number') return 'Session'
    const hours = Math.floor(sessionRemaining / 3600)
    const minutes = Math.floor((sessionRemaining % 3600) / 60)
    if (hours > 0) return `${hours}h ${minutes}m left`
    return `${Math.max(0, minutes)}m left`
  }, [sessionRemaining])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <div className="min-h-screen bg-[rgb(var(--surface-0-rgb))] text-cream font-inter selection:bg-gold/30">
      <Toaster theme="dark" position="bottom-right" />

      <header className="sticky top-0 z-50 border-b border-[rgb(var(--cream-rgb)/0.08)] bg-[linear-gradient(180deg,rgb(var(--surface-1-rgb)/0.96),rgb(var(--surface-0-rgb)/0.94))] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1480px] items-center gap-6 px-7 py-4 xl:px-10">
          <div className="flex min-w-[210px] items-center gap-3">
            <span className="font-cinzel font-black tracking-[2px] text-[19px] whitespace-nowrap">SHUBIQ <span className="text-gold">Admin</span></span>
            <span className="rounded-full border border-gold/35 bg-gold/10 px-2.5 py-1 text-[10px] font-rajdhani uppercase tracking-[2.2px] text-gold">
              {roleLabel}
            </span>
          </div>

          <nav className="hidden md:flex flex-1 overflow-x-auto custom-scrollbar">
            <div className="inline-flex min-w-max items-center gap-2.5 rounded-xl border border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-1-rgb)/0.35)] px-2 py-1.5">
              {visibleNavItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
                const Icon = item.icon
                return (
                  <Link
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    className={`inline-flex items-center gap-2.5 rounded-lg border px-4 py-2 text-[12px] tracking-[2px] uppercase font-rajdhani font-semibold transition-all ${
                      isActive
                        ? 'bg-[linear-gradient(180deg,rgb(var(--surface-2-rgb)/0.95),rgb(var(--surface-1-rgb)/0.92))] text-cream border-gold/50 shadow-[0_0_0_1px_rgb(var(--gold-rgb)/0.18)_inset,0_0_26px_rgb(var(--gold-rgb)/0.14)]'
                        : 'bg-[rgb(var(--surface-1-rgb)/0.7)] text-cream/70 border-[rgb(var(--cream-rgb)/0.12)] hover:text-cream hover:border-gold/45'
                    }`}
                  >
                    <Icon size={14} className={isActive ? 'text-gold' : 'text-cream/70'} />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <span className="hidden md:inline-flex whitespace-nowrap rounded-lg border border-[rgb(var(--cream-rgb)/0.16)] bg-[rgb(var(--surface-1-rgb)/0.7)] px-3 py-2 text-[11px] tracking-[1.8px] uppercase text-cream/55 font-rajdhani">
              {sessionLabel}
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2.5 rounded-lg border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--surface-1-rgb)/0.72)] px-3.5 py-2 text-[12px] font-semibold tracking-[1.8px] font-rajdhani uppercase text-cream/70 hover:text-cream transition-all hover:border-gold/45"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-sm border border-gold/20 bg-gold/10 text-[10px] font-bold text-gold">
                {displayName.slice(0, 1).toUpperCase()}
              </span>
              Logout
              <LogOut size={12} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="ml-auto md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[rgb(var(--cream-rgb)/0.16)] bg-[rgb(var(--surface-1-rgb)/0.72)] text-cream/80 hover:text-cream hover:border-gold/40 transition-colors"
            aria-label="Toggle admin menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[rgb(var(--cream-rgb)/0.08)] px-4 pb-4 pt-3 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {visibleNavItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
                const Icon = item.icon
                return (
                  <Link
                    key={`mobile-${item.label}-${item.href}`}
                    href={item.href}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-[11px] tracking-[1.8px] uppercase font-rajdhani font-semibold transition-all ${
                      isActive
                        ? 'bg-[linear-gradient(180deg,rgb(var(--surface-2-rgb)/0.95),rgb(var(--surface-1-rgb)/0.92))] text-cream border-gold/50'
                        : 'bg-[rgb(var(--surface-1-rgb)/0.7)] text-cream/72 border-[rgb(var(--cream-rgb)/0.12)]'
                    }`}
                  >
                    <Icon size={13} className={isActive ? 'text-gold' : 'text-cream/70'} />
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center justify-between rounded-lg border border-[rgb(var(--cream-rgb)/0.12)] bg-[rgb(var(--surface-1-rgb)/0.7)] px-3 py-2">
              <span className="text-[11px] tracking-[1.8px] uppercase text-cream/55 font-rajdhani">{sessionLabel}</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-md border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--surface-1-rgb)/0.7)] px-3 py-1.5 text-[11px] font-semibold tracking-[1.6px] font-rajdhani uppercase text-cream/72"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-sm border border-gold/20 bg-gold/10 text-[9px] font-bold text-gold">
                  {displayName.slice(0, 1).toUpperCase()}
                </span>
                Logout
                <LogOut size={11} />
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="min-h-[calc(100vh-88px)] overflow-y-auto bg-[rgb(var(--surface-0-rgb))] p-6 custom-scrollbar admin-readable">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
