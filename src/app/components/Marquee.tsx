"use client"
import { SKILLS } from "../data"

export default function Marquee() {
  const items = [...SKILLS, ...SKILLS]

  return (
    <div className="my-10 sm:my-12 py-6 sm:py-8 overflow-hidden relative border-y border-[rgb(var(--gold-rgb)/0.12)] bg-[linear-gradient(180deg,rgb(var(--surface-2-rgb)_/_0.92),rgb(var(--surface-1-rgb)_/_0.96))]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgb(var(--gold-rgb) / 0.045) 0%, transparent 70%)" }}
      />
      <div
        className="absolute left-0 top-0 bottom-0 w-14 sm:w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, rgb(var(--surface-2-rgb)), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-14 sm:w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, rgb(var(--surface-2-rgb)), transparent)" }}
      />

      <div className="relative z-[1] flex gap-10 sm:gap-12 whitespace-nowrap w-max animate-marquee-right will-change-transform">
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
  )
}
