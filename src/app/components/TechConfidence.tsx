"use client"

import ScrollReveal from "./ScrollReveal"
import StaggerContainer, { StaggerItem } from "./StaggerContainer"

const TECH_STACK = [
  { name: "Next.js", mark: "N" },
  { name: "TypeScript", mark: "TS" },
  { name: "React", mark: "R" },
  { name: "Tailwind CSS", mark: "TW" },
  { name: "Supabase", mark: "SB" },
  { name: "Python", mark: "PY" },
  { name: "Node.js", mark: "ND" },
  { name: "Vercel", mark: "VC" },
]

export default function TechConfidence() {
  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 20%, rgb(var(--gold-rgb) / 0.06) 0%, transparent 65%)" }} />
      <div className="max-w-6xl mx-auto relative">
        <ScrollReveal>
          <div className="mb-10 sm:mb-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-1 h-1 rounded-full bg-gold/80" />
              <div className="font-rajdhani text-[12px] tracking-[4px] uppercase text-gold/80">Engineering Standards</div>
              <span className="w-14 h-px bg-gradient-to-r from-gold/40 to-transparent" />
            </div>
            <h2 className="font-cinzel text-[clamp(30px,5vw,54px)] text-cream leading-[1.08]">Built With Premium Tools</h2>
            <p className="mt-3 font-cormorant text-[18px] sm:text-[20px] text-cream/70 max-w-2xl leading-[1.6]">
              Every SHUBIQ system is built on production-grade foundations with performance, security, and clarity in mind.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TECH_STACK.map((tech) => (
            <StaggerItem key={tech.name}>
              <div className="group h-full rounded-sm border border-[rgb(var(--cream-rgb)/0.16)] bg-[rgb(var(--surface-2-rgb)/0.6)] px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_18px_36px_rgb(0_0_0_/_0.28)]">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[rgb(var(--cream-rgb)/0.2)] bg-[rgb(var(--cream-rgb)/0.04)] font-rajdhani text-[16px] tracking-[2px] text-cream/70 transition-all duration-300 group-hover:text-gold-light group-hover:border-gold/40">
                  {tech.mark}
                </div>
                <div className="font-rajdhani text-[12px] tracking-[3px] uppercase text-cream/70 group-hover:text-gold-light transition-colors">
                  {tech.name}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
