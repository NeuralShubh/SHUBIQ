'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Mail, Settings, LogOut, FileText, Activity, Home } from 'lucide-react'
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
  { label: 'Inbox', href: '/admin', icon: Mail, roles: ['owner', 'admin', 'editor', 'viewer'] as AdminRole[] },
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

  return (
    <div className="min-h-screen bg-[rgb(var(--surface-0-rgb))] text-cream font-inter selection:bg-gold/30">
      <Toaster theme="dark" position="bottom-right" />

      <header className="sticky top-0 z-50 border-b border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-0-rgb))/0.94] backdrop-blur">
        <div className="px-6 py-3 flex items-center gap-4 justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-cinzel font-black tracking-widest text-[16px] whitespace-nowrap">SHUBIQ <span className="text-gold">Admin</span></span>
            <span className="rounded-full border border-gold/35 bg-gold/10 px-2 py-0.5 text-[10px] font-rajdhani uppercase tracking-[2px] text-gold">
              {roleLabel}
            </span>
          </div>

          <nav className="flex-1 overflow-x-auto custom-scrollbar px-1">
            <div className="inline-flex items-center gap-2 min-w-max">
              {visibleNavItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
                const Icon = item.icon
                return (
                  <Link
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] tracking-[1.6px] uppercase font-rajdhani border transition-colors ${
                      isActive
                        ? 'bg-[rgb(var(--surface-2-rgb))] text-cream border-gold/45 shadow-[0_0_0_1px_rgb(var(--gold-rgb)/0.15)_inset]'
                        : 'bg-[rgb(var(--surface-1-rgb))] text-cream/70 border-[rgb(var(--cream-rgb)/0.14)] hover:text-cream hover:border-gold/40'
                    }`}
                  >
                    <Icon size={13} className={isActive ? 'text-gold' : ''} />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline-flex text-[11px] tracking-[1.4px] uppercase text-cream/55 border border-[rgb(var(--cream-rgb)/0.16)] rounded-md px-2.5 py-1 font-rajdhani whitespace-nowrap">
              {sessionLabel}
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider font-rajdhani uppercase text-cream/70 hover:text-cream transition-colors bg-[rgb(var(--surface-1-rgb))] px-3 py-1.5 rounded-lg border border-[rgb(var(--cream-rgb)/0.12)] hover:border-gold/40"
            >
              <span className="w-5 h-5 rounded-sm bg-gold/10 text-gold border border-gold/20 flex items-center justify-center text-[10px] font-bold">
                {displayName.slice(0, 1).toUpperCase()}
              </span>
              Logout
              <LogOut size={12} />
            </button>
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-74px)] overflow-y-auto bg-[rgb(var(--surface-0-rgb))] p-6 custom-scrollbar admin-readable">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
