"use client"
import { Github, Instagram, Linkedin, Twitter } from "lucide-react"
import { SOCIAL_LINKS } from "../data"

export default function Footer() {
  const year = new Date().getFullYear()
  const iconMap: Record<string, (props: { size?: number }) => JSX.Element> = {
    "GitHub": Github,
    "Twitter / X": Twitter,
    "LinkedIn": Linkedin,
    "Instagram": Instagram,
  }

  return (
    <footer className="relative border-t border-gold/10 py-10 sm:py-12 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgb(var(--gold-rgb)/0.04),transparent_45%)]" />

      <div className="max-w-7xl mx-auto relative grid gap-5 md:grid-cols-3 md:items-center">
        <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4">
          <span className="font-cinzel font-black tracking-[6.5px] text-gold text-sm footer-brand-glow">SHUBIQ</span>
          <span className="text-cream/55 text-sm">&middot;</span>
          <span className="font-rajdhani text-[11px] sm:text-[12px] tracking-[3.3px] uppercase text-cream/78">Intelligence That Wins</span>
        </div>

        <div className="text-center font-rajdhani text-[11px] sm:text-[12px] tracking-[3px] uppercase text-cream/68">
          &copy; {year} Shubham. All rights reserved.
        </div>

        <div className="flex items-center justify-center md:justify-end gap-3 sm:gap-3.5">
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
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border border-gold/24 bg-[rgb(var(--surface-2-rgb)/0.45)] text-cream/76 hover:text-gold hover:border-gold/48 hover:bg-[rgb(var(--surface-2-rgb)/0.75)] hover:shadow-[0_0_18px_rgb(var(--gold-rgb)/0.16)] transition-all duration-250"
              >
                <Icon size={17} />
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
