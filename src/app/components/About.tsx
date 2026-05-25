"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import SectionLabel from "./SectionLabel"

const principles = [
  {
    label: "Clarity",
    text: "We reduce the noise until the brand message feels obvious and elegant.",
  },
  {
    label: "Precision",
    text: "Every spacing decision, line weight, and motion cue has a reason behind it.",
  },
  {
    label: "Momentum",
    text: "The page should feel calm, expensive, and built to move the business forward.",
  },
]

const process = [
  [
    "01",
    "Frame the problem",
    "We define the outcome, audience, and boundaries before any visual decisions begin.",
  ],
  [
    "02",
    "Shape the hierarchy",
    "We build the page like a strong magazine spread with one clear focal point.",
  ],
  [
    "03",
    "Ship with discipline",
    "The final result stays fast, credible, and consistent across every screen.",
  ],
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
    <section id="about" className="relative isolate overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgb(var(--surface-0-rgb)),rgb(var(--ink-rgb)))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_62%_44%_at_8%_16%,rgb(var(--gold-rgb)/0.07),transparent_60%),radial-gradient(ellipse_48%_40%_at_88%_14%,rgb(var(--gold-rgb)/0.045),transparent_62%),linear-gradient(180deg,rgba(8,10,14,0.1)_0%,rgba(8,10,14,0.5)_55%,rgba(8,10,14,0.92)_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.1] hero-grid-overlay" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          className="relative z-10 grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12"
          {...motionProps(0)}
        >
          <div className="max-w-2xl">
            <SectionLabel label="About" />

            <p className="mt-6 font-rajdhani text-[10px] uppercase tracking-[0.48em] text-gold/72">
              Quiet confidence / built for founders / less noise, more signal
            </p>

            <h2 className="mt-6 max-w-xl font-cinzel text-[clamp(42px,7.8vw,92px)] leading-[0.88] tracking-[0.01em] text-cream sm:text-[clamp(50px,7vw,96px)] lg:text-[clamp(58px,5vw,88px)]">
              We design with
              <span className="block text-gradient-gold">restraint.</span>
            </h2>

            <p className="mt-6 max-w-xl text-[16px] leading-[1.85] text-cream/78 sm:text-[17px] lg:text-[18px]">
              NexGravision is a digital studio for teams that want their brand, product, and website to feel composed,
              credible, and quietly premium. We make the whole system feel intentional before we make it feel loud.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/founder"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/70 bg-gold px-6 py-3.5 font-rajdhani text-[11px] uppercase tracking-[0.3em] text-[rgb(var(--ink-rgb))] shadow-[0_18px_40px_rgb(var(--gold-rgb)/0.16)] transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto sm:min-w-[190px]"
              >
                Meet the Founder
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="#contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.24)] bg-[rgb(var(--surface-2-rgb)/0.18)] px-6 py-3.5 font-rajdhani text-[11px] uppercase tracking-[0.3em] text-cream backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto sm:min-w-[190px]"
              >
                Start a Project
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {principles.map((item, index) => (
                <motion.div
                  key={item.label}
                  {...motionProps(0.08 + index * 0.06)}
                  className="rounded-[20px] border border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-2-rgb)/0.16)] p-4 backdrop-blur-md"
                >
                  <p className="font-cinzel text-[18px] leading-none text-cream">{item.label}</p>
                  <p className="mt-2 text-[15px] leading-[1.65] text-cream/66">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[30px] border border-[rgb(var(--gold-rgb)/0.14)] bg-[rgba(8,10,14,0.36)] p-4 shadow-[0_24px_80px_rgb(0_0_0/0.22)] backdrop-blur-xl">
              <div className="rounded-[26px] border border-[rgb(var(--cream-rgb)/0.08)] bg-[linear-gradient(180deg,rgb(var(--surface-2-rgb)/0.24),rgb(var(--surface-1-rgb)/0.12))] p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-rajdhani text-[10px] uppercase tracking-[0.42em] text-gold/72">Working style</p>
                    <h3 className="mt-3 font-cinzel text-[clamp(28px,4vw,50px)] leading-[0.94] text-cream">
                      Minimal by
                      <span className="block text-gradient-gold">Design</span>
                    </h3>
                  </div>
                  <div className="hidden rounded-full border border-[rgb(var(--gold-rgb)/0.16)] px-3 py-2 font-rajdhani text-[9px] uppercase tracking-[0.32em] text-gold/70 sm:block">
                    Editorial system
                  </div>
                </div>

                <div className="mt-7 space-y-3">
                  {process.map(([step, title, text], index) => (
                    <motion.div
                      key={step}
                      {...motionProps(0.12 + index * 0.06)}
                      className="grid gap-3 rounded-[22px] border border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-2-rgb)/0.16)] p-4 sm:grid-cols-[90px_1fr]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-rajdhani text-[10px] uppercase tracking-[0.34em] text-gold/72">{step}</span>
                        <div className="h-px flex-1 bg-[linear-gradient(90deg,rgb(var(--gold-rgb)/0.5),transparent)]" />
                      </div>
                      <div>
                        <p className="font-cinzel text-[20px] leading-[1.05] text-cream">{title}</p>
                        <p className="mt-2 max-w-[42rem] text-[15px] leading-[1.75] text-cream/68">{text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[20px] border border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-2-rgb)/0.16)] p-4">
                    <p className="font-rajdhani text-[10px] uppercase tracking-[0.34em] text-cream/55">Focus</p>
                    <p className="mt-2 font-cinzel text-[26px] leading-none text-cream">Clarity</p>
                  </div>
                  <div className="rounded-[20px] border border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-2-rgb)/0.16)] p-4">
                    <p className="font-rajdhani text-[10px] uppercase tracking-[0.34em] text-cream/55">Delivery</p>
                    <p className="mt-2 font-cinzel text-[26px] leading-none text-cream">Discipline</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
