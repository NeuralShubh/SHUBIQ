"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/shubiq-studio", label: "Studio" },
  { href: "/shubiq-labs", label: "Labs" },
]

export default function LabsNavbar() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-[85] border-b border-[rgb(var(--gold-rgb)/0.18)] bg-[linear-gradient(to_bottom,rgb(var(--surface-2-rgb)/0.92),rgb(var(--surface-1-rgb)/0.84))] backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="font-cinzel text-[22px] tracking-[1px] text-cream/92 hover:text-[rgb(var(--gold-light-rgb))] transition-colors">
          SHUBIQ
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {LINKS.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-rajdhani text-[11px] uppercase tracking-[2.4px] transition-colors ${
                  active ? "text-[rgb(var(--gold-light-rgb))]" : "text-cream/72 hover:text-[rgb(var(--gold-light-rgb))]"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <a
          href="mailto:shubiqofficial@gmail.com?subject=SHUBIQ%20Labs%20Access"
          className="labs-sheen-btn inline-flex items-center rounded-full border border-[rgb(var(--gold-rgb)/0.6)] px-4 py-2 font-rajdhani text-[10px] uppercase tracking-[2.4px] text-[rgb(var(--gold-light-rgb))] hover:bg-[rgb(var(--gold-rgb)/0.14)] transition-colors"
        >
          Request Access
        </a>
      </div>
    </header>
  )
}
