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
import { createClient } from '@/lib/supabase/client'

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

  // Wait for the hydration before rendering complex layout
  // Or handle carefully but for Admin UI this is okay.
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/admin/login'
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex font-inter selection:bg-[#3b82f6]/30">
      <Toaster theme="dark" position="bottom-right" />
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? 'w-16' : 'w-64'
        } border-r border-[#27272a] flex flex-col transition-all duration-300 shrink-0 z-50 bg-[#09090b] relative`}
      >
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-[#27272a] shrink-0 overflow-hidden">
          {!collapsed && <span className="font-bold text-sm tracking-widest whitespace-nowrap">SHUBIQ <span className="text-[#3b82f6]">Admin</span></span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-1.5 rounded-md hover:bg-[#27272a] transition-colors shrink-0 outline-none"
          >
            {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 custom-scrollbar">
          {navItems.map((section, si) => (
            <div key={si} className="mb-6">
              {section.group && !collapsed && (
                <p className="px-3 mb-2 text-[10px] uppercase tracking-[0.15em] text-[#71717a] font-medium whitespace-nowrap">
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
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all mb-0.5 whitespace-nowrap group relative
                      ${
                        isActive
                          ? 'bg-[#27272a] text-white font-medium'
                          : 'text-[#a1a1aa] hover:text-white hover:bg-[#18181b]'
                      }`}
                  >
                    <Icon size={16} className={`shrink-0 ${isActive ? 'text-[#3b82f6]' : 'group-hover:text-white'}`} />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Bottom: user + logout */}
        <div className="border-t border-[#27272a] p-3 shrink-0">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-2 py-2 rounded-lg hover:bg-[#18181b] text-sm text-[#a1a1aa] transition-colors overflow-hidden">
            <div className="w-7 h-7 rounded-sm bg-[#3b82f6]/20 text-[#3b82f6] border border-[#3b82f6]/30 flex items-center justify-center text-xs font-bold shrink-0">
              S
            </div>
            {!collapsed && <span className="flex-1 text-left whitespace-nowrap">Shubham</span>}
            {!collapsed && <LogOut size={14} className="opacity-50 hover:opacity-100" />}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-[#27272a] bg-[#09090b]/80 backdrop-blur flex items-center px-6 gap-4 shrink-0 z-40 sticky top-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search projects, posts, inquiries..."
              className="w-full bg-[#18181b] border border-[#27272a] rounded-lg px-4 py-1.5 text-sm text-white placeholder:text-[#71717a] focus:outline-none focus:border-[#3b82f6] transition-colors"
            />
          </div>

          {/* Right side: quick actions */}
          <div className="flex items-center gap-4 ml-auto">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[#71717a] hover:text-white transition-colors flex items-center gap-1 bg-[#18181b] px-3 py-1.5 rounded-lg border border-[#27272a] hover:border-[#3b82f6]/50"
            >
              View Site <ArrowUpRight size={12} />
            </a>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-[#09090b] p-6 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
