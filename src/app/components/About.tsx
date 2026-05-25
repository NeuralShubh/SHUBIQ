"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Sparkles } from "lucide-react"
import SectionLabel from "./SectionLabel"

const pillars = [
  {
    title: "Precision Engineering",
    text: "High-performance web systems shaped for speed, clarity, and dependable scale.",
  },
  {
    title: "Premium UX",
    text: "Interfaces designed to feel calm, credible, and conversion-aware on every screen.",
  },
  {
    title: "AI-Ready Architecture",
    text: "Product foundations that support automation, intelligence, and future expansion.",
  },
]

export default function About() {
  const prefersReduced = useReducedMotion()

  const motionProps = (delay = 0) =>
    prefersReduced
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: "easeOut" as const },
        }

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgb(var(--surface-0-rgb)),rgb(var(--ink-rgb)))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_45%_at_12%_18%,rgb(var(--gold-rgb)/0.08),transparent_60%),radial-gradient(ellipse_50%_38%_at_86%_12%,rgb(var(--gold-rgb)/0.06),transparent_60%),linear-gradient(180deg,rgba(8,10,14,0.16)_0%,rgba(8,10,14,0.42)_60%,rgba(8,10,14,0.94)_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18] studio-grid-overlay" />

      <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <motion.div className="relative z-10 max-w-2xl" {...motionProps(0)}>
          <SectionLabel label="About" />

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.16)] bg-[rgb(var(--surface-2-rgb)/0.48)] px-4 py-2 text-[10px] uppercase tracking-[0.34em] text-cream/65 backdrop-blur-md">
            <Sparkles size={13} className="text-gold" />
            NexGravision brand story
          </div>

          <h2 className="mt-6 max-w-xl font-cinzel text-[clamp(42px,8vw,92px)] leading-[0.9] tracking-[0.01em] text-cream sm:text-[clamp(52px,7vw,96px)] lg:text-[clamp(58px,5.2vw,86px)]">
            Built for trust.
            <span className="block text-gradient-gold">Designed to move.</span>
          </h2>

          <p className="mt-5 max-w-xl text-[16px] leading-[1.78] text-cream/78 sm:text-[17px] lg:text-[18px]">
            NexGravision is a premium digital studio creating sharp websites, polished product systems, and
            intelligent experiences for founders who want a stronger first impression.
          </p>

          <p className="mt-4 max-w-xl text-[15px] leading-[1.74] text-cream/68 sm:text-[16px] lg:text-[17px]">
            We blend strategy, design, and engineering into a single operating system so the result feels
            premium, stays fast, and scales without losing clarity.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="/founder"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/70 bg-gold px-6 py-3.5 font-rajdhani text-[11px] uppercase tracking-[0.28em] text-[rgb(var(--ink-rgb))] shadow-[0_18px_40px_rgb(var(--gold-rgb)/0.16)] transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto sm:min-w-[190px]"
            >
              Meet the Founder
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="#contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.24)] bg-[rgb(var(--surface-2-rgb)/0.3)] px-6 py-3.5 font-rajdhani text-[11px] uppercase tracking-[0.28em] text-cream backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto sm:min-w-[190px]"
            >
              Start a Project
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                {...motionProps(0.08 + index * 0.06)}
                className="rounded-[22px] border border-[rgb(var(--cream-rgb)/0.1)] bg-[rgb(var(--surface-2-rgb)/0.24)] p-4 backdrop-blur-md"
              >
                <p className="font-cinzel text-[18px] leading-[1.08] text-cream">{pillar.title}</p>
                <p className="mt-2 text-[15px] leading-[1.6] text-cream/66">{pillar.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="relative z-10" {...motionProps(0.12)}>
          <div className="rounded-[32px] border border-[rgb(var(--gold-rgb)/0.12)] bg-[rgba(8,10,14,0.34)] p-4 shadow-[0_24px_80px_rgb(0_0_0/0.24)] backdrop-blur-xl">
            <div className="rounded-[26px] border border-[rgb(var(--cream-rgb)/0.08)] bg-[linear-gradient(180deg,rgb(var(--surface-2-rgb)/0.42),rgb(var(--surface-1-rgb)/0.26))] p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.14)] bg-[rgb(var(--surface-2-rgb)/0.34)] px-3 py-2">
                  <Sparkles size={13} className="text-gold" />
                  <span className="font-rajdhani text-[10px] uppercase tracking-[0.3em] text-cream/65">
                    Design philosophy
                  </span>
                </div>
                <span className="font-rajdhani text-[9px] uppercase tracking-[0.34em] text-gold/70">
                  Minimal premium
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                {[
                  ["Expert-led", "Design decisions stay small, confident, and deliberate."],
                  ["Quiet luxury", "Space, contrast, and typography do the heavy lifting."],
                  ["Trust first", "The page should feel like a practiced studio, not a template."],
                ].map(([title, text], index) => (
                  <motion.div
                    key={title}
                    {...motionProps(0.18 + index * 0.05)}
                    className="rounded-[20px] border border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-2-rgb)/0.2)] p-4"
                  >
                    <p className="font-cinzel text-[18px] leading-[1.08] text-cream">{title}</p>
                    <p className="mt-2 text-[15px] leading-[1.6] text-cream/66">{text}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2">
                {[
                  ["Strategy", "Clear"],
                  ["Motion", "Subtle"],
                  ["Finish", "Premium"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[16px] border border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-2-rgb)/0.18)] px-3 py-3 text-center">
                    <div className="font-cinzel text-[18px] leading-none text-cream">{value}</div>
                    <div className="mt-1 font-rajdhani text-[9px] uppercase tracking-[0.28em] text-cream/55">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
