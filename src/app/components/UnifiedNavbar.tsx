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
  { href: "/blog", label: "Blog" },
  { href: "/founder", label: "Founder" },
]

export default function UnifiedNavbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] border-b border-[rgb(var(--gold-rgb)/0.18)] bg-[linear-gradient(to_bottom,rgb(var(--surface-2-rgb)/0.94),rgb(var(--surface-1-rgb)/0.86))] backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="group flex items-center" onClick={() => setMenuOpen(false)}>
          <Image
            src="/logo/logo.png"
            alt="NexGravision"
            width={55}
            height={55}
            priority
            className="h-12 w-12 object-contain transition-transform duration-200 group-hover:scale-[1.03]"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {LINKS.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-[12px] font-medium tracking-wide transition-colors ${
                  active ? "text-[rgb(var(--gold-light-rgb))]" : "text-cream/72 hover:text-[rgb(var(--gold-light-rgb))]"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--gold-rgb)/0.42)] bg-[linear-gradient(145deg,rgb(var(--surface-2-rgb)/0.95),rgb(var(--surface-1-rgb)/0.9))] text-cream/85 shadow-[0_0_0_1px_rgb(var(--gold-rgb)/0.08)_inset]"
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
            className="labs-sheen-btn hidden lg:inline-flex items-center rounded-full border border-[rgb(var(--gold-rgb)/0.68)] bg-[rgb(var(--gold-rgb))] px-5 sm:px-6 py-2.5 font-sans text-[12px] sm:text-[13px] font-semibold tracking-wide text-[rgb(var(--ink-rgb))] transition-colors hover:bg-[rgb(var(--gold-light-rgb))]"
            onClick={() => setMenuOpen(false)}
          >
            Start Project
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
            className="lg:hidden border-t border-[rgb(var(--gold-rgb)/0.16)] bg-[rgb(var(--surface-2-rgb)/0.96)] px-4 pb-4 pt-3"
          >
            <nav className="grid grid-cols-2 gap-2">
              {LINKS.map((link) => {
                const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-lg border px-3 py-2 text-center font-sans text-[11px] font-medium tracking-wide ${
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
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-[rgb(var(--gold-rgb)/0.68)] bg-[rgb(var(--gold-rgb))] px-4 py-2.5 font-sans text-[12px] font-semibold tracking-wide text-[rgb(var(--ink-rgb))]"
            >
              Start Project
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

