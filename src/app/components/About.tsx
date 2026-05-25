"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import SectionLabel from "./SectionLabel"

const values = [
  {
    title: "Clarity",
    text: "We simplify the message before we scale the interface.",
  },
  {
    title: "Precision",
    text: "Layouts are measured, restrained, and tuned to feel intentional.",
  },
  {
    title: "Momentum",
    text: "The system should move the business forward without visual noise.",
  },
]

const process = [
  {
    step: "01",
    title: "Frame the problem",
    text: "We define the outcome, audience, and visual restraint before any build begins.",
  },
  {
    step: "02",
    title: "Design the hierarchy",
    text: "We shape the page like a magazine spread, with a strong rhythm and one clear idea.",
  },
  {
    step: "03",
    title: "Ship with discipline",
    text: "The final result stays minimal, fast, and credible across every screen size.",
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
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_45%_at_8%_16%,rgb(var(--gold-rgb)/0.08),transparent_60%),radial-gradient(ellipse_50%_40%_at_88%_14%,rgb(var(--gold-rgb)/0.05),transparent_62%),linear-gradient(180deg,rgba(8,10,14,0.12)_0%,rgba(8,10,14,0.42)_50%,rgba(8,10,14,0.94)_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16] hero-grid-overlay" />

      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <motion.div className="relative z-10 max-w-2xl" {...motionProps(0)}>
          <SectionLabel label="About" />

          <p className="mt-6 max-w-xl font-rajdhani text-[10px] uppercase tracking-[0.48em] text-gold/72">
            Premium studio / quiet confidence / no unnecessary noise
          </p>

          <h2 className="mt-6 max-w-xl font-cinzel text-[clamp(44px,8vw,96px)] leading-[0.88] tracking-[0.01em] text-cream sm:text-[clamp(54px,7vw,100px)] lg:text-[clamp(58px,5.2vw,88px)]">
            We build with
            <span className="block text-gradient-gold">restraint.</span>
          </h2>

          <p className="mt-6 max-w-xl text-[16px] leading-[1.8] text-cream/78 sm:text-[17px] lg:text-[18px]">
            NexGravision is a digital studio for founders who want their brand to feel composed, credible, and
            quietly expensive. We prefer sharp decisions over decorative complexity.
          </p>

          <p className="mt-4 max-w-xl text-[15px] leading-[1.8] text-cream/66 sm:text-[16px] lg:text-[17px]">
            The work is deliberately minimal: fewer elements, stronger type, tighter spacing, and a cleaner narrative
            that lets the product speak for itself.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="/founder"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/70 bg-gold px-6 py-3.5 font-rajdhani text-[11px] uppercase tracking-[0.3em] text-[rgb(var(--ink-rgb))] shadow-[0_18px_40px_rgb(var(--gold-rgb)/0.16)] transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto sm:min-w-[190px]"
            >
              Meet the Founder
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="#contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.24)] bg-[rgb(var(--surface-2-rgb)/0.22)] px-6 py-3.5 font-rajdhani text-[11px] uppercase tracking-[0.3em] text-cream backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto sm:min-w-[190px]"
            >
              Start a Project
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {values.map((item, index) => (
              <motion.div
                key={item.title}
                {...motionProps(0.08 + index * 0.06)}
                className="rounded-[20px] border border-[rgb(var(--cream-rgb)/0.1)] bg-[rgb(var(--surface-2-rgb)/0.18)] p-4"
              >
                <p className="font-cinzel text-[18px] leading-none text-cream">{item.title}</p>
                <p className="mt-2 text-[15px] leading-[1.6] text-cream/66">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="relative z-10" {...motionProps(0.12)}>
          <div className="rounded-[34px] border border-[rgb(var(--gold-rgb)/0.12)] bg-[rgba(8,10,14,0.3)] p-4 shadow-[0_24px_80px_rgb(0_0_0/0.22)] backdrop-blur-xl">
            <div className="rounded-[28px] border border-[rgb(var(--cream-rgb)/0.08)] bg-[linear-gradient(180deg,rgb(var(--surface-2-rgb)/0.26),rgb(var(--surface-1-rgb)/0.14))] p-6 sm:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-rajdhani text-[10px] uppercase tracking-[0.42em] text-gold/72">Working style</p>
                  <h3 className="mt-3 font-cinzel text-[clamp(28px,4vw,52px)] leading-[0.94] text-cream">
                    Minimal by
                    <span className="block text-gradient-gold">Design</span>
                  </h3>
                </div>
                <div className="hidden rounded-full border border-[rgb(var(--gold-rgb)/0.16)] px-3 py-2 font-rajdhani text-[9px] uppercase tracking-[0.32em] text-gold/70 sm:block">
                  Editorial system
                </div>
              </div>

              <div className="mt-7 grid gap-3">
                {process.map((item, index) => (
                  <motion.div
                    key={item.step}
                    {...motionProps(0.15 + index * 0.06)}
                    className="grid gap-3 rounded-[22px] border border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-2-rgb)/0.16)] p-4 sm:grid-cols-[90px_1fr]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-rajdhani text-[10px] uppercase tracking-[0.34em] text-gold/72">
                        {item.step}
                      </span>
                      <div className="h-px flex-1 bg-[linear-gradient(90deg,rgb(var(--gold-rgb)/0.5),transparent)]" />
                    </div>
                    <div>
                      <p className="font-cinzel text-[20px] leading-[1.05] text-cream">{item.title}</p>
                      <p className="mt-2 max-w-[42rem] text-[15px] leading-[1.7] text-cream/68">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[20px] border border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-2-rgb)/0.18)] p-4">
                  <p className="font-rajdhani text-[10px] uppercase tracking-[0.34em] text-cream/55">Focus</p>
                  <p className="mt-2 font-cinzel text-[26px] leading-none text-cream">Clarity</p>
                </div>
                <div className="rounded-[20px] border border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-2-rgb)/0.18)] p-4">
                  <p className="font-rajdhani text-[10px] uppercase tracking-[0.34em] text-cream/55">Delivery</p>
                  <p className="mt-2 font-cinzel text-[26px] leading-none text-cream">Discipline</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
