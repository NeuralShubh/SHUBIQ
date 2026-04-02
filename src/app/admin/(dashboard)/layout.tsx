'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Mail, Settings, LogOut, ArrowUpRight, FileText, Activity, Search, Home } from 'lucide-react'
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

type CommandItem = {
  label: string
  href: string
  group: string
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const [activeRole, setActiveRole] = useState<AdminRole>('viewer')
  const [displayName, setDisplayName] = useState('Admin')
  const [sessionRemaining, setSessionRemaining] = useState<number | null>(null)
  const [commandQuery, setCommandQuery] = useState('')
  const [commandOpen, setCommandOpen] = useState(false)

  const commandRef = useRef<HTMLDivElement>(null)
  const commandInputRef = useRef<HTMLInputElement>(null)

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

  const commandItems = useMemo<CommandItem[]>(() => {
    const navCommands = visibleNavItems.map((item) => ({
      label: item.label,
      href: item.href,
      group: 'Navigation',
    }))

    return [...navCommands, { label: 'Public Home', href: '/', group: 'Quick Actions' }]
  }, [visibleNavItems])

  const filteredCommands = useMemo(() => {
    const q = commandQuery.trim().toLowerCase()
    if (!q) return commandItems.slice(0, 8)
    return commandItems
      .filter((item) => item.label.toLowerCase().includes(q) || item.href.toLowerCase().includes(q) || item.group.toLowerCase().includes(q))
      .slice(0, 8)
  }, [commandItems, commandQuery])

  const roleLabel = activeRole.charAt(0).toUpperCase() + activeRole.slice(1)
  const sessionLabel = useMemo(() => {
    if (typeof sessionRemaining !== 'number') return 'Session'
    const hours = Math.floor(sessionRemaining / 3600)
    const minutes = Math.floor((sessionRemaining % 3600) / 60)
    if (hours > 0) return `${hours}h ${minutes}m left`
    return `${Math.max(0, minutes)}m left`
  }, [sessionRemaining])

  useEffect(() => {
    setCommandOpen(false)
    setCommandQuery('')
  }, [pathname])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen(true)
        commandInputRef.current?.focus()
        commandInputRef.current?.select()
      }
      if (event.key === 'Escape') {
        setCommandOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!commandRef.current) return
      if (!commandRef.current.contains(event.target as Node)) {
        setCommandOpen(false)
      }
    }

    window.addEventListener('mousedown', onClick)
    return () => window.removeEventListener('mousedown', onClick)
  }, [])

  const runCommand = (href: string) => {
    setCommandOpen(false)
    setCommandQuery('')
    if (href === '/') {
      window.open('/', '_blank', 'noopener,noreferrer')
      return
    }
    router.push(href)
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--surface-0-rgb))] text-cream font-inter selection:bg-gold/30">
      <Toaster theme="dark" position="bottom-right" />

      <header className="sticky top-0 z-50 border-b border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-0-rgb))/0.94] backdrop-blur">
        <div className="px-6 py-3 flex flex-wrap items-center gap-3 justify-between border-b border-[rgb(var(--cream-rgb)/0.08)]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-cinzel font-black tracking-widest text-[16px] whitespace-nowrap">SHUBIQ <span className="text-gold">Admin</span></span>
            <span className="rounded-full border border-gold/35 bg-gold/10 px-2 py-0.5 text-[10px] font-rajdhani uppercase tracking-[2px] text-gold">
              {roleLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline-flex text-[11px] tracking-[1.4px] uppercase text-cream/55 border border-[rgb(var(--cream-rgb)/0.16)] rounded-md px-2.5 py-1 font-rajdhani">
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

        <div className="px-6 py-3 flex items-center gap-3">
          <nav className="flex-1 overflow-x-auto custom-scrollbar">
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

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-semibold tracking-wider font-rajdhani uppercase text-cream/70 hover:text-cream transition-colors flex items-center gap-1 bg-[rgb(var(--surface-1-rgb))] px-3 py-1.5 rounded-lg border border-[rgb(var(--cream-rgb)/0.12)] hover:border-gold/40"
          >
            Home <ArrowUpRight size={13} />
          </a>
        </div>

        <div className="px-6 pb-3">
          <div ref={commandRef} className="relative w-full max-w-xl">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40 pointer-events-none" />
            <input
              type="text"
              ref={commandInputRef}
              value={commandQuery}
              onFocus={() => setCommandOpen(true)}
              onChange={(e) => {
                setCommandQuery(e.target.value)
                setCommandOpen(true)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && filteredCommands.length > 0) {
                  e.preventDefault()
                  runCommand(filteredCommands[0].href)
                }
              }}
              placeholder="Search admin pages... (Ctrl/Cmd + K)"
              className="w-full bg-[rgb(var(--surface-1-rgb))] border border-[rgb(var(--cream-rgb)/0.1)] rounded-lg pl-9 pr-4 py-2 text-[13px] text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold/50 transition-colors"
            />
            {commandOpen && (
              <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-[rgb(var(--surface-1-rgb))] border border-[rgb(var(--cream-rgb)/0.12)] rounded-lg overflow-hidden shadow-[0_12px_32px_rgb(0_0_0_/_0.35)]">
                {filteredCommands.length > 0 ? (
                  <div className="max-h-72 overflow-auto custom-scrollbar">
                    {filteredCommands.map((item) => (
                      <button
                        key={`${item.group}-${item.href}`}
                        onClick={() => runCommand(item.href)}
                        className="w-full text-left px-3 py-2.5 hover:bg-[rgb(var(--surface-2-rgb))] transition-colors border-b border-[rgb(var(--cream-rgb)/0.08)] last:border-b-0"
                      >
                        <p className="text-sm text-cream">{item.label}</p>
                        <p className="text-[11px] text-cream/45 uppercase tracking-[1.6px] mt-0.5">{item.group} • {item.href}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-3 py-3 text-xs text-cream/50">No matching admin command found.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-170px)] overflow-y-auto bg-[rgb(var(--surface-0-rgb))] p-6 custom-scrollbar admin-readable">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
