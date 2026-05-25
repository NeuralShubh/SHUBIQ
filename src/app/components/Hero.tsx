"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Gauge, Layers3, ShieldCheck, Smartphone, Sparkles } from "lucide-react"
import { projects as featuredProjects } from "../data-projects"

const stats = [
  { value: "30+", label: "premium systems shipped" },
  { value: "100%", label: "mobile-first by design" },
  { value: "AI", label: "ready workflows and automation" },
]

const pillars = [
  { icon: Smartphone, label: "Mobile-first", copy: "Layouts that feel native on small screens and effortless on desktop." },
  { icon: Layers3, label: "Systems", copy: "Editorial interfaces, dashboards, and product surfaces with clear hierarchy." },
  { icon: Gauge, label: "Performance", copy: "Fast loads, clean interactions, and motion used only where it adds value." },
  { icon: ShieldCheck, label: "Trust", copy: "Premium presentation that makes the work feel more established instantly." },
]

const showcase = featuredProjects.slice(0, 3).map((project, index) => ({
  title: project.title,
  subtitle: project.subtitle,
  image: project.videoPoster,
  href: `/projects/${project.slug}`,
  accent: index === 0 ? "Featured launch" : index === 1 ? "Operational clarity" : "Business OS",
}))

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const enter = (delay = 0) =>
    prefersReduced
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease: "easeOut" as const },
        }

  return (
    <section id="home" className="relative overflow-hidden px-4 pb-14 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:px-8 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_65%_45%_at_50%_18%,rgb(var(--gold-rgb)/0.14),transparent_62%),radial-gradient(ellipse_38%_28%_at_10%_12%,rgb(var(--gold-rgb)/0.12),transparent_60%),radial-gradient(ellipse_35%_28%_at_90%_22%,rgb(var(--gold-rgb)/0.09),transparent_58%),linear-gradient(180deg,rgb(var(--surface-0-rgb)),rgb(var(--ink-rgb)))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 hero-grid-overlay opacity-50" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--gold-rgb)/0.12),transparent_68%)] blur-3xl" />

      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 xl:gap-16">
        <motion.div
          className="relative z-10 flex flex-col justify-center"
          {...enter(0)}
        >
          <motion.div
            className="mb-6 inline-flex items-center gap-2 self-start rounded-full border border-[rgb(var(--gold-rgb)/0.22)] bg-[rgb(var(--surface-2-rgb)/0.55)] px-4 py-2 text-[10px] uppercase tracking-[0.42em] text-cream/72 backdrop-blur-md sm:text-[11px]"
            {...enter(0)}
          >
            <Sparkles size={13} className="text-gold" />
            NexGravision studio
          </motion.div>

          <motion.h1
            className="max-w-4xl font-cinzel text-[clamp(44px,10.5vw,112px)] leading-[0.9] tracking-[0.01em] text-cream sm:text-[clamp(56px,9vw,116px)] lg:text-[clamp(64px,6.7vw,106px)]"
            {...enter(0.06)}
          >
            Premium digital systems
            <span className="block text-gradient-gold">built to feel inevitable.</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-[17px] leading-[1.8] text-cream/78 sm:text-[18px] lg:text-[19px]"
            {...enter(0.14)}
          >
            We design and build polished websites, internal tools, and AI-enabled products for ambitious brands
            that need a sharper first impression and a cleaner execution layer.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
            {...enter(0.22)}
          >
            <Link
              href="#projects"
              className="cta-premium inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/70 bg-gold px-6 py-3.5 font-rajdhani text-[11px] uppercase tracking-[0.28em] text-[rgb(var(--ink-rgb))] shadow-[0_18px_40px_rgb(var(--gold-rgb)/0.22)] transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto sm:min-w-[220px]"
            >
              Explore selected work
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="#contact"
              className="cta-ghost inline-flex w-full items-center justify-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.34)] px-6 py-3.5 font-rajdhani text-[11px] uppercase tracking-[0.28em] text-cream transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto sm:min-w-[220px]"
            >
              Start a project
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            className="mt-8 grid gap-3 sm:grid-cols-3"
            {...enter(0.3)}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[20px] border border-[rgb(var(--cream-rgb)/0.12)] bg-[linear-gradient(180deg,rgb(var(--surface-2-rgb)/0.76),rgb(var(--surface-1-rgb)/0.66))] p-4 backdrop-blur-md"
              >
                <div className="font-cinzel text-[28px] leading-none text-gold">{stat.value}</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.28em] text-cream/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative z-10"
          {...enter(0.1)}
        >
          <div className="relative overflow-hidden rounded-[32px] border border-[rgb(var(--gold-rgb)/0.18)] bg-[linear-gradient(180deg,rgb(var(--surface-2-rgb)/0.9),rgb(var(--surface-1-rgb)/0.7))] p-3 shadow-[0_24px_80px_rgb(0_0_0/0.34)] backdrop-blur-xl sm:p-4">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(var(--gold-rgb)/0.16),transparent_32%),radial-gradient(circle_at_80%_12%,rgb(var(--gold-rgb)/0.08),transparent_24%),linear-gradient(135deg,transparent_40%,rgb(var(--gold-rgb)/0.05),transparent_72%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgb(var(--cream-rgb)/0.04)_1px,transparent_1px),linear-gradient(rgb(var(--cream-rgb)/0.04)_1px,transparent_1px)] bg-[size:36px_36px] opacity-30 [mask-image:radial-gradient(circle_at_center,black_40%,transparent_82%)]" />

            <div className="relative grid gap-3 sm:gap-4">
              <motion.div
                className="group relative min-h-[320px] overflow-hidden rounded-[26px] border border-[rgb(var(--cream-rgb)/0.12)] bg-[rgb(var(--ink-rgb))]"
                {...enter(0.08)}
              >
                <Image
                  src={showcase[0].image}
                  alt={showcase[0].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_12%,rgb(var(--ink-rgb)/0.18)_48%,rgb(var(--ink-rgb)/0.88)_100%)]" />
                <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
                  <span className="inline-flex items-center rounded-full border border-[rgb(var(--gold-rgb)/0.2)] bg-[rgb(var(--ink-rgb)/0.44)] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-cream/70 backdrop-blur">
                    {showcase[0].accent}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-[rgb(var(--gold-rgb)/0.22)] bg-[rgb(var(--surface-2-rgb)/0.72)] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-gold">
                    Live project
                    <ArrowUpRight size={12} />
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <div className="max-w-lg">
                    <p className="font-rajdhani text-[10px] uppercase tracking-[0.34em] text-cream/55">Featured build</p>
                    <h2 className="mt-2 font-cinzel text-[clamp(26px,4vw,42px)] leading-[0.95] text-cream">
                      {showcase[0].title}
                    </h2>
                    <p className="mt-3 max-w-xl text-[14px] leading-[1.7] text-cream/72 sm:text-[15px]">
                      {showcase[0].subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="grid gap-3 sm:grid-cols-2">
                {showcase.slice(1).map((item, index) => (
                  <motion.div key={item.title} {...enter(0.16 + index * 0.08)}>
                    <Link
                      href={item.href}
                      className="group relative block min-h-[190px] overflow-hidden rounded-[22px] border border-[rgb(var(--cream-rgb)/0.12)] bg-[rgb(var(--surface-2-rgb)/0.54)]"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 25vw"
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_8%,rgb(var(--ink-rgb)/0.18)_54%,rgb(var(--ink-rgb)/0.92)_100%)]" />
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-80" />
                      <div className="absolute left-4 top-4 inline-flex items-center rounded-full border border-[rgb(var(--gold-rgb)/0.18)] bg-[rgb(var(--ink-rgb)/0.4)] px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-cream/60 backdrop-blur">
                        {item.accent}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="font-rajdhani text-[10px] uppercase tracking-[0.26em] text-cream/55">Selected work</p>
                        <h3 className="mt-1 font-cinzel text-[22px] leading-none text-cream">{item.title}</h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mx-auto mt-8 grid w-full max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4"
        initial={prefersReduced ? false : { opacity: 0, y: 18 }}
        whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {pillars.map((pillar) => {
          const Icon = pillar.icon
          return (
            <div
              key={pillar.label}
              className="rounded-[22px] border border-[rgb(var(--cream-rgb)/0.12)] bg-[rgb(var(--surface-2-rgb)/0.5)] p-4 backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[rgb(var(--gold-rgb)/0.18)] bg-[rgb(var(--gold-rgb)/0.08)] text-gold">
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="font-rajdhani text-[11px] uppercase tracking-[0.28em] text-cream/78">{pillar.label}</h3>
                  <p className="mt-1 text-[13px] leading-[1.6] text-cream/65">{pillar.copy}</p>
                </div>
              </div>
            </div>
          )
        })}
      </motion.div>
    </section>
  )
}
