'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  Wrench,
  FlaskConical,
  Mail,
  ClipboardList,
  CreditCard,
  User,
  Palette,
  BarChart3,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  ArrowUpRight,
  LogOut,
} from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { logout } from '../login/actions'

const navItems = [
  {
    group: null,
    items: [{ label: 'Dashboard', href: '/admin', icon: LayoutDashboard }],
  },
  {
    group: 'Content',
    items: [
      { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
      { label: 'Blog', href: '/admin/blog', icon: FileText },
      { label: 'Services', href: '/admin/services', icon: Wrench },
      { label: 'Labs Products', href: '/admin/labs', icon: FlaskConical },
    ],
  },
  {
    group: 'Business',
    items: [
      { label: 'Inquiries', href: '/admin/inquiries', icon: Mail },
      { label: 'Studio Briefs', href: '/admin/studio-briefs', icon: ClipboardList },
      { label: 'Pricing', href: '/admin/pricing', icon: CreditCard },
    ],
  },
  {
    group: 'Site',
    items: [
      { label: 'Founder', href: '/admin/founder', icon: User },
      { label: 'Themes', href: '/admin/themes', icon: Palette },
      { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
      { label: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)


  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--surface-0-rgb))] text-cream flex font-inter selection:bg-gold/30">
      <Toaster theme="dark" position="bottom-right" />
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? 'w-16' : 'w-64'
        } border-r border-[rgb(var(--cream-rgb)/0.08)] flex flex-col transition-all duration-300 shrink-0 z-50 bg-[rgb(var(--surface-0-rgb))] relative`}
      >
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-[rgb(var(--cream-rgb)/0.08)] shrink-0 overflow-hidden">
          {!collapsed && <span className="font-cinzel font-black tracking-widest text-[16px] whitespace-nowrap">SHUBIQ <span className="text-gold">Admin</span></span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-1.5 rounded-md hover:bg-[rgb(var(--surface-1-rgb))] transition-colors shrink-0 outline-none text-cream/70 hover:text-cream"
          >
            {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 custom-scrollbar">
          {navItems.map((section, si) => (
            <div key={si} className="mb-6">
              {section.group && !collapsed && (
                <p className="px-3 mb-2 text-[10px] uppercase tracking-[0.15em] text-cream/50 font-semibold whitespace-nowrap font-rajdhani">
                  {section.group}
                </p>
              )}
              {section.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/admin' && pathname.startsWith(item.href))
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] tracking-wide transition-all mb-0.5 whitespace-nowrap group relative
                      ${
                        isActive
                          ? 'bg-[rgb(var(--surface-2-rgb))] text-cream font-medium shadow-[0_0_0_1px_rgb(var(--gold-rgb)/0.15)_inset]'
                          : 'text-cream/70 hover:text-cream hover:bg-[rgb(var(--surface-1-rgb))]'
                      }`}
                  >
                    <Icon size={16} className={`shrink-0 ${isActive ? 'text-gold' : 'group-hover:text-cream/90'}`} />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Bottom: user + logout */}
        <div className="border-t border-[rgb(var(--cream-rgb)/0.08)] p-3 shrink-0">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-2 py-2 rounded-lg hover:bg-[rgb(var(--surface-1-rgb))] text-sm text-cream/70 hover:text-cream transition-colors overflow-hidden">
            <div className="w-7 h-7 rounded-sm bg-gold/10 text-gold border border-gold/20 flex items-center justify-center text-xs font-bold shrink-0">
              S
            </div>
            {!collapsed && <span className="flex-1 text-left whitespace-nowrap font-medium">Shubham</span>}
            {!collapsed && <LogOut size={14} className="opacity-50 hover:opacity-100" />}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-0-rgb))]/80 backdrop-blur flex items-center px-6 gap-4 shrink-0 z-40 sticky top-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search projects, posts, inquiries..."
              className="w-full bg-[rgb(var(--surface-1-rgb))] border border-[rgb(var(--cream-rgb)/0.1)] rounded-lg px-4 py-1.5 text-[13px] text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>

          {/* Right side: quick actions */}
          <div className="flex items-center gap-4 ml-auto">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-semibold tracking-wider font-rajdhani uppercase text-cream/70 hover:text-cream transition-colors flex items-center gap-1 bg-[rgb(var(--surface-1-rgb))] px-3 py-1.5 rounded-lg border border-[rgb(var(--cream-rgb)/0.12)] hover:border-gold/40 hover:shadow-[0_0_12px_rgb(var(--gold-rgb)/0.1)]"
            >
              View Site <ArrowUpRight size={13} />
            </a>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-[rgb(var(--surface-0-rgb))] p-6 custom-scrollbar admin-readable">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
