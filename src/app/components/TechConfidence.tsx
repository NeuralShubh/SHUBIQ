"use client"

import ScrollReveal from "./ScrollReveal"
import StaggerContainer, { StaggerItem } from "./StaggerContainer"
import SectionLabel from "./SectionLabel"

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
          <div className="mb-10 sm:mb-12 text-center">
            <SectionLabel label="Engineering Standards" centered />
            <div className="mt-4 flex flex-col items-center gap-4">
              <h2 className="font-shubiq-heading font-normal leading-[0.92]" style={{ fontSize: "clamp(30px, 5.5vw, 62px)" }}>
                <span className="text-cream/90">Built With </span>
                <span className="text-gold">Premium Tools</span>
              </h2>
            </div>
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
