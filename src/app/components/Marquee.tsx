"use client"
import { SKILLS } from "../data"
import ScrollReveal from "./ScrollReveal"

export default function Marquee() {
  const items = [...SKILLS, ...SKILLS]

  return (
    <ScrollReveal duration={0.5}>
      <div
        className="cv-auto my-10 sm:my-12 py-6 sm:py-8 overflow-hidden relative border-y border-[rgb(var(--gold-rgb)/0.12)] bg-[linear-gradient(180deg,rgb(var(--surface-2-rgb)_/_0.92),rgb(var(--surface-1-rgb)_/_0.96))]"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgb(var(--gold-rgb) / 0.045) 0%, transparent 70%)" }}
        />

        <div
          className="relative z-[1] flex gap-10 sm:gap-12 whitespace-nowrap w-max animate-marquee-right will-change-transform"
          style={{ animationPlayState: "var(--marquee-play, running)" }}
          onMouseEnter={(e) => (e.currentTarget.style.setProperty("--marquee-play", "paused"))}
          onMouseLeave={(e) => (e.currentTarget.style.setProperty("--marquee-play", "running"))}
        >
          {items.map((skill, i) => (
            <span
              key={`t-${i}`}
              className="font-rajdhani text-[12px] sm:text-[13px] tracking-[4px] sm:tracking-[5px] uppercase text-gold/68 flex items-center gap-10 sm:gap-12"
            >
              {skill}
              <span className="w-1.5 h-1.5 rotate-45 border border-gold/60 bg-gold/10" />
            </span>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}
