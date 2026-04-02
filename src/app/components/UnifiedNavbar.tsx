"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import ThemeToggle from "./ThemeToggle"
import { AnimatePresence, motion } from "framer-motion"

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/shubiq-studio", label: "Studio" },
  { href: "/shubiq-labs", label: "Labs" },
  { href: "/founder", label: "Founder" },
]

export default function UnifiedNavbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] border-b border-[rgb(var(--gold-rgb)/0.18)] bg-[linear-gradient(to_bottom,rgb(var(--surface-2-rgb)/0.94),rgb(var(--surface-1-rgb)/0.86))] backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="group flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <Image
            src="https://cglzadzphyxgiqwwuwle.supabase.co/storage/v1/object/public/Logo/SHUBIQ.png"
            alt="SHUBIQ"
            width={120}
            height={48}
            priority
            className="h-8 w-auto object-contain transition-opacity duration-200 group-hover:opacity-95"
          />
          <span className="font-cinzel text-[21px] tracking-[1px] text-cream/92 transition-colors group-hover:text-[rgb(var(--gold-light-rgb))]">
            SHUBIQ
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-5 lg:gap-7">
          {LINKS.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-rajdhani text-[12px] uppercase tracking-[2.6px] transition-colors ${
                  active ? "text-[rgb(var(--gold-light-rgb))]" : "text-cream/72 hover:text-[rgb(var(--gold-light-rgb))]"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgb(var(--gold-rgb)/0.32)] bg-[rgb(var(--cream-rgb)/0.04)] text-cream/80"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
          <Link
            href="/#contact"
            className="labs-sheen-btn inline-flex items-center rounded-full border border-[rgb(var(--gold-rgb)/0.68)] bg-[rgb(var(--gold-rgb))] px-3 sm:px-4 py-2 font-rajdhani text-[9px] sm:text-[10px] uppercase tracking-[2.1px] sm:tracking-[2.4px] text-[rgb(var(--ink-rgb))] transition-colors hover:bg-[rgb(var(--gold-light-rgb))]"
            onClick={() => setMenuOpen(false)}
          >
            Hire Us
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[rgb(var(--gold-rgb)/0.16)] bg-[rgb(var(--surface-2-rgb)/0.96)] px-4 pb-4 pt-3"
          >
            <nav className="grid grid-cols-2 gap-2">
              {LINKS.map((link) => {
                const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-lg border px-3 py-2 text-center font-rajdhani text-[11px] uppercase tracking-[2px] ${
                      active
                        ? "border-[rgb(var(--gold-rgb)/0.5)] bg-[rgb(var(--gold-rgb)/0.14)] text-[rgb(var(--gold-light-rgb))]"
                        : "border-[rgb(var(--cream-rgb)/0.14)] text-cream/74"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
