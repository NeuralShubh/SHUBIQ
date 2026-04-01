"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import ThemeToggle from "./ThemeToggle"

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/shubiq-studio", label: "Studio" },
  { href: "/shubiq-labs", label: "Labs" },
  { href: "/founder", label: "Founder" },
]

export default function UnifiedNavbar() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] border-b border-[rgb(var(--gold-rgb)/0.18)] bg-[linear-gradient(to_bottom,rgb(var(--surface-2-rgb)/0.94),rgb(var(--surface-1-rgb)/0.86))] backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="group flex items-center gap-2">
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
          <Link
            href="/#contact"
            className="labs-sheen-btn inline-flex items-center rounded-full border border-[rgb(var(--gold-rgb)/0.68)] bg-[rgb(var(--gold-rgb))] px-4 py-2 font-rajdhani text-[10px] uppercase tracking-[2.4px] text-[rgb(var(--ink-rgb))] transition-colors hover:bg-[rgb(var(--gold-light-rgb))]"
          >
            Hire Us
          </Link>
        </div>
      </div>
    </header>
  )
}
