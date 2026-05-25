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
          className="object-cover object-center opacity-68"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_72%_58%_at_16%_18%,rgb(var(--gold-rgb)/0.16),transparent_56%),radial-gradient(ellipse_40%_34%_at_86%_22%,rgb(var(--gold-rgb)/0.08),transparent_62%),linear-gradient(90deg,rgba(5,6,9,0.98)_0%,rgba(5,6,9,0.84)_24%,rgba(5,6,9,0.18)_64%,rgba(5,6,9,0.72)_100%),linear-gradient(180deg,rgba(5,6,9,0.22)_0%,rgba(5,6,9,0.86)_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16] hero-grid-overlay" />

      <div className="relative mx-auto min-h-[calc(100svh-6.5rem)] w-full max-w-7xl pb-10 lg:min-h-[calc(100svh-7.25rem)] lg:pb-14">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-6">
          <motion.div className="relative z-20 max-w-[740px]" {...motionProps(0)}>
            <div className="flex items-center gap-3">
              <span className="h-px w-14 bg-gradient-to-r from-[rgb(var(--gold-rgb))] to-transparent" />
              <p className="font-rajdhani text-[10px] uppercase tracking-[0.5em] text-gold/78">
                We are NexGravision
              </p>
            </div>

            <h1 className="mt-6 max-w-[11ch] font-cinzel text-[clamp(60px,9vw,126px)] leading-[0.84] tracking-[0.01em] text-cream">
              <span className="block">SYSTEMS WE</span>
              <span className="block text-gradient-gold">ENGINEER</span>
            </h1>

            <p className="mt-7 max-w-[38rem] text-[16px] leading-[1.82] text-cream/84 sm:text-[17px] lg:text-[19px]">
              A technology studio building digital systems, products, and experiences that feel premium, stay fast, and scale with the
              business.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="#contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/70 bg-gold px-7 py-3.5 font-rajdhani text-[11px] uppercase tracking-[0.32em] text-[rgb(var(--ink-rgb))] shadow-[0_18px_40px_rgb(var(--gold-rgb)/0.16)] transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto sm:min-w-[240px]"
              >
                Start a project
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="#projects"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.24)] bg-[rgb(var(--surface-2-rgb)/0.12)] px-7 py-3.5 font-rajdhani text-[11px] uppercase tracking-[0.32em] text-cream backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto sm:min-w-[240px]"
              >
                Explore our work
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {features.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[rgb(var(--cream-rgb)/0.12)] bg-[rgb(var(--surface-2-rgb)/0.12)] px-3.5 py-2 font-rajdhani text-[10px] uppercase tracking-[0.26em] text-cream/68 backdrop-blur-md"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="relative z-10 lg:min-h-[calc(100svh-10rem)]">
            <motion.div {...motionProps(0.12)} className="relative mt-10 aspect-[0.95/1.18] overflow-hidden lg:hidden">
              <Image
                src="/main-page-hero-section-image.png"
                alt="NexGravision cinematic mountain grid"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,9,0.1)_0%,rgba(5,6,9,0.04)_44%,rgba(5,6,9,0.3)_100%),linear-gradient(180deg,rgba(5,6,9,0.05)_0%,rgba(5,6,9,0.64)_100%)]" />
            </motion.div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <div className="absolute right-[8%] top-[18%] rounded-full border border-[rgb(var(--gold-rgb)/0.18)] bg-[rgba(5,6,9,0.58)] px-4 py-2 font-rajdhani text-[9px] uppercase tracking-[0.34em] text-cream/78 backdrop-blur-md">
            Software engineering
          </div>
          <div className="absolute left-[55%] top-[38%] rounded-full border border-[rgb(var(--gold-rgb)/0.18)] bg-[rgba(5,6,9,0.58)] px-4 py-2 font-rajdhani text-[9px] uppercase tracking-[0.34em] text-cream/78 backdrop-blur-md">
            Product design
          </div>
          <div className="absolute right-[16%] top-[48%] rounded-full border border-[rgb(var(--gold-rgb)/0.18)] bg-[rgba(5,6,9,0.58)] px-4 py-2 font-rajdhani text-[9px] uppercase tracking-[0.34em] text-cream/78 backdrop-blur-md">
            Cloud architecture
          </div>
          <div className="absolute left-[61%] bottom-[24%] rounded-full border border-[rgb(var(--gold-rgb)/0.18)] bg-[rgba(5,6,9,0.58)] px-4 py-2 font-rajdhani text-[9px] uppercase tracking-[0.34em] text-cream/78 backdrop-blur-md">
            AI integration
          </div>
          <div className="absolute right-[26%] bottom-[14%] rounded-full border border-[rgb(var(--gold-rgb)/0.18)] bg-[rgba(5,6,9,0.58)] px-4 py-2 font-rajdhani text-[9px] uppercase tracking-[0.34em] text-cream/78 backdrop-blur-md">
            Scalable systems
          </div>
        </div>
      </div>
    </section>
  )
}
