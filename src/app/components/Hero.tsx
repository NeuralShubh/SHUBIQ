"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const features = [
  "Software engineering",
  "Product design",
  "AI integration",
]

export default function Hero() {
  const prefersReduced = useReducedMotion()

  const motionProps = (delay = 0) =>
    prefersReduced
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease: "easeOut" as const },
        }

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-[92px]"
    >
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[linear-gradient(180deg,rgb(var(--surface-0-rgb)),rgb(var(--ink-rgb)))]" />
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src="/main-page-hero-section-image.png"
          alt="NexGravision cinematic hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-75"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_18%_20%,rgb(var(--gold-rgb)/0.12),transparent_52%),radial-gradient(ellipse_45%_36%_at_84%_26%,rgb(var(--gold-rgb)/0.08),transparent_60%),linear-gradient(90deg,rgba(5,6,9,0.98)_0%,rgba(5,6,9,0.72)_34%,rgba(5,6,9,0.18)_72%,rgba(5,6,9,0.58)_100%),linear-gradient(180deg,rgba(5,6,9,0.26)_0%,rgba(5,6,9,0.8)_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18] hero-grid-overlay" />

      <div className="mx-auto grid min-h-[calc(100svh-6.5rem)] w-full max-w-7xl items-end lg:min-h-[calc(100svh-7.25rem)]">
        <div className="grid gap-12 pb-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-10 lg:pb-14">
          <motion.div className="relative z-10 max-w-[740px]" {...motionProps(0)}>
            <div className="flex items-center gap-3">
              <span className="h-px w-14 bg-gradient-to-r from-[rgb(var(--gold-rgb))] to-transparent" />
              <p className="font-rajdhani text-[10px] uppercase tracking-[0.5em] text-gold/78">
                We are NexGravision
              </p>
            </div>

            <h1 className="mt-6 max-w-[12ch] font-cinzel text-[clamp(52px,9vw,118px)] leading-[0.86] tracking-[0.01em] text-cream">
              Systems we
              <span className="block text-gradient-gold">Engineer</span>
            </h1>

            <p className="mt-7 max-w-[34rem] text-[16px] leading-[1.78] text-cream/80 sm:text-[17px] lg:text-[20px]">
              A technology studio building digital systems, products, and experiences that feel premium, stay fast, and scale with the
              business.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="#contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/70 bg-gold px-7 py-3.5 font-rajdhani text-[11px] uppercase tracking-[0.32em] text-[rgb(var(--ink-rgb))] shadow-[0_18px_40px_rgb(var(--gold-rgb)/0.16)] transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto sm:min-w-[210px]"
              >
                Start a project
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="#projects"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.24)] bg-[rgb(var(--surface-2-rgb)/0.18)] px-7 py-3.5 font-rajdhani text-[11px] uppercase tracking-[0.32em] text-cream backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto sm:min-w-[210px]"
              >
                Explore our work
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {features.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[rgb(var(--cream-rgb)/0.12)] bg-[rgb(var(--surface-2-rgb)/0.18)] px-3.5 py-2 font-rajdhani text-[10px] uppercase tracking-[0.26em] text-cream/68 backdrop-blur-md"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div className="relative z-10 lg:pb-2" {...motionProps(0.12)}>
            <div className="relative ml-auto w-full max-w-[640px]">
              <div className="absolute -left-10 top-16 hidden h-px w-28 bg-gradient-to-r from-transparent via-[rgb(var(--gold-rgb)/0.65)] to-transparent lg:block" />
              <div className="absolute right-8 top-8 hidden rounded-full border border-[rgb(var(--gold-rgb)/0.18)] bg-[rgba(5,6,9,0.68)] px-3 py-2 font-rajdhani text-[9px] uppercase tracking-[0.32em] text-gold/78 backdrop-blur-md lg:block">
                Cloud architecture
              </div>
              <div className="absolute right-10 top-32 hidden rounded-full border border-[rgb(var(--gold-rgb)/0.18)] bg-[rgba(5,6,9,0.68)] px-3 py-2 font-rajdhani text-[9px] uppercase tracking-[0.32em] text-gold/78 backdrop-blur-md lg:block">
                Product design
              </div>
              <div className="absolute right-24 bottom-40 hidden rounded-full border border-[rgb(var(--gold-rgb)/0.18)] bg-[rgba(5,6,9,0.68)] px-3 py-2 font-rajdhani text-[9px] uppercase tracking-[0.32em] text-gold/78 backdrop-blur-md lg:block">
                AI integration
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 pb-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[rgb(var(--gold-rgb)/0.34)] to-transparent" />
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <p className="font-rajdhani text-[10px] uppercase tracking-[0.42em] text-gold/72">
              Trusted by founders across the globe
            </p>
            <div className="flex flex-wrap gap-5 text-cream/35">
              {["nextmove", "hexlab", "altitude", "cloudnex", "sendora"].map((item) => (
                <span key={item} className="font-rajdhani text-[12px] uppercase tracking-[0.28em]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
