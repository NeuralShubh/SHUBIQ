"use client"
import Link from "next/link"
import { Github, Instagram, Linkedin, Twitter, type LucideIcon } from "lucide-react"
import { SOCIAL_LINKS } from "../data"

export default function Footer() {
  const year = new Date().getFullYear()
  const iconMap: Record<string, LucideIcon> = {
    "GitHub": Github,
    "Twitter / X": Twitter,
    "LinkedIn": Linkedin,
    "Instagram": Instagram,
  }

  return (
    <footer className="relative border-t border-gold/10 py-10 sm:py-12 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgb(var(--gold-rgb)/0.04),transparent_45%)]" />

      <div className="max-w-7xl mx-auto relative grid gap-6 md:grid-cols-3 md:items-center">
        <div className="flex flex-col items-center md:items-start gap-3 sm:gap-4">
          <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4">
          <span className="font-cinzel font-black tracking-[6.5px] text-gold text-sm footer-brand-glow">SHUBIQ</span>
          <span className="text-cream/55 text-sm">&middot;</span>
          <span className="font-rajdhani text-[11px] sm:text-[12px] tracking-[3.3px] uppercase text-cream/78">Intelligence That Wins</span>
        </div>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-[10px] sm:text-[11px] font-rajdhani tracking-[2.5px] uppercase text-cream/60">
            {[
              { label: "Studio", href: "/shubiq-studio" },
              { label: "Labs", href: "/shubiq-labs" },
              { label: "Founder", href: "/founder" },
              { label: "Blog", href: "/blog" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-gold transition-colors duration-200">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center font-rajdhani text-[11px] sm:text-[12px] tracking-[3px] uppercase text-cream/68">
          &copy; {year} SHUBIQ. All rights reserved.
        </div>

        <div className="flex items-center justify-center md:justify-end gap-3 sm:gap-4">
          {SOCIAL_LINKS.map((social) => {
            const Icon = iconMap[social.label]
            if (!Icon) return null

            return (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                title={social.label}
                className="group relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg text-cream/74 hover:text-gold hover:bg-[rgb(var(--surface-2-rgb)/0.6)] transition-all duration-250"
              >
                <Icon size={19} />
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm border border-gold/30 bg-[rgb(var(--surface-2-rgb)/0.96)] px-2 py-1 font-rajdhani text-[9px] tracking-[1.8px] uppercase text-gold/90 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                  {social.label}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
