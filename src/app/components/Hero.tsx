"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Sparkles } from "lucide-react"

const highlights = [
  "Mobile-first layouts",
  "Premium minimal UI",
  "Fast launch systems",
]

const metrics = [
  { label: "Design", value: "Elegant" },
  { label: "Build", value: "Lean" },
  { label: "Focus", value: "Conversion" },
]

export default function Hero() {
  const prefersReduced = useReducedMotion()

  const motionProps = (delay = 0) =>
    prefersReduced
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: "easeOut" as const },
        }

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden px-4 pb-6 pt-20 sm:px-6 sm:pb-8 sm:pt-24 lg:px-8 lg:pt-[92px]"
    >
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgb(var(--surface-0-rgb)),rgb(var(--ink-rgb)))]" />
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src="/hero-workspace.jpg"
          alt="Premium workspace background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-55"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_18%_20%,rgb(var(--gold-rgb)/0.16),transparent_58%),radial-gradient(ellipse_55%_40%_at_86%_18%,rgb(var(--gold-rgb)/0.08),transparent_62%),linear-gradient(180deg,rgba(8,10,14,0.42)_0%,rgba(8,10,14,0.72)_58%,rgba(8,10,14,0.96)_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.28] hero-grid-overlay" />

      <div className="mx-auto grid min-h-[calc(100svh-6.5rem)] w-full max-w-7xl items-center gap-10 lg:min-h-[calc(100svh-7.25rem)] lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <motion.div className="relative z-10 max-w-2xl" {...motionProps(0)}>
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.16)] bg-[rgb(var(--surface-2-rgb)/0.52)] px-4 py-2 text-[10px] uppercase tracking-[0.36em] text-cream/68 backdrop-blur-md">
            <Sparkles size={13} className="text-gold" />
            NexGravision studio
          </div>

          <div className="mt-6 flex items-center gap-4">
            <Image
              src="/nexgravision-logo.png"
              alt="NexGravision logo"
              width={180}
              height={180}
              priority
              className="h-14 w-auto object-contain sm:h-16 lg:h-20"
            />
            <div className="hidden h-10 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent sm:block" />
            <p className="hidden max-w-[18ch] font-rajdhani text-[10px] uppercase tracking-[0.34em] text-cream/55 sm:block">
              Premium digital presence for modern brands
            </p>
          </div>

          <h1 className="mt-6 max-w-xl font-cinzel text-[clamp(42px,8vw,92px)] leading-[0.9] tracking-[0.01em] text-cream sm:text-[clamp(50px,7vw,92px)] lg:text-[clamp(60px,5.3vw,86px)]">
            Minimal design.
            <span className="block text-gradient-gold">Maximum presence.</span>
          </h1>

          <p className="mt-5 max-w-xl text-[16px] leading-[1.74] text-cream/78 sm:text-[17px] lg:text-[18px]">
            We craft premium websites with a sharp first impression, clean hierarchy, and mobile-first
            performance from the very first screen.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="#projects"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/70 bg-gold px-6 py-3.5 font-rajdhani text-[11px] uppercase tracking-[0.28em] text-[rgb(var(--ink-rgb))] shadow-[0_18px_40px_rgb(var(--gold-rgb)/0.18)] transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto sm:min-w-[190px]"
            >
              Explore work
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="#contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.24)] bg-[rgb(var(--surface-2-rgb)/0.26)] px-6 py-3.5 font-rajdhani text-[11px] uppercase tracking-[0.28em] text-cream backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto sm:min-w-[190px]"
            >
              Start a project
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[rgb(var(--cream-rgb)/0.12)] bg-[rgb(var(--surface-2-rgb)/0.34)] px-3.5 py-2 font-rajdhani text-[10px] uppercase tracking-[0.24em] text-cream/62 backdrop-blur-md"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div className="relative z-10 hidden lg:block" {...motionProps(0.12)}>
          <div className="relative ml-auto w-full max-w-[460px] overflow-hidden rounded-[36px] border border-[rgb(var(--gold-rgb)/0.16)] bg-[rgb(var(--surface-2-rgb)/0.42)] p-4 shadow-[0_30px_90px_rgb(0_0_0/0.34)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(var(--gold-rgb)/0.05),transparent_26%,transparent_72%,rgb(var(--gold-rgb)/0.06))]" />
            <div className="relative overflow-hidden rounded-[28px] border border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--ink-rgb))]">
              <div className="aspect-[5/6] w-full">
                <Image
                  src="/hero-workspace.jpg"
                  alt="Dark premium workspace"
                  fill
                  priority
                  sizes="460px"
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,14,0.08)_0%,rgba(8,10,14,0.24)_46%,rgba(8,10,14,0.9)_100%)]" />

              <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.18)] bg-[rgba(8,10,14,0.44)] px-3 py-2 backdrop-blur-md">
                  <Image
                    src="/nexgravision-logo.png"
                    alt="NexGravision"
                    width={44}
                    height={44}
                    className="h-7 w-7 object-contain"
                  />
                  <span className="font-rajdhani text-[10px] uppercase tracking-[0.28em] text-cream/74">
                    Digital studio
                  </span>
                </div>
                <div className="rounded-full border border-[rgb(var(--gold-rgb)/0.18)] bg-[rgb(var(--surface-2-rgb)/0.58)] px-3 py-2 text-[9px] uppercase tracking-[0.28em] text-gold backdrop-blur-md">
                  One screen
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="rounded-[24px] border border-[rgb(var(--cream-rgb)/0.1)] bg-[rgba(8,10,14,0.42)] p-4 backdrop-blur-md">
                  <p className="font-rajdhani text-[10px] uppercase tracking-[0.34em] text-cream/55">
                    Premium minimal. Built to convert.
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-[16px] border border-[rgb(var(--cream-rgb)/0.1)] bg-[rgb(var(--surface-2-rgb)/0.22)] px-3 py-3 text-center"
                      >
                        <div className="font-cinzel text-[17px] leading-none text-cream">{metric.value}</div>
                        <div className="mt-1 font-rajdhani text-[9px] uppercase tracking-[0.28em] text-cream/55">
                          {metric.label}
                        </div>
                      </div>
                    ))}
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
