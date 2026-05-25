"use client"

import { useMemo } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  Command,
  Gauge,
  Globe,
  ShieldCheck,
  MonitorSmartphone,
  Sparkles,
  Smartphone,
  Timer,
} from "lucide-react"
import CinematicMediaFrame from "../components/CinematicMediaFrame"
import { LAB_PRODUCTS } from "../data-labs"
import LabsNavbar from "./LabsNavbar"

function ProductIcon({ category }: { category: string }) {
  if (category === "Mobile App") return <Smartphone size={18} className="text-[rgb(var(--gold-rgb))]" />
  if (category === "Web App") return <Globe size={18} className="text-[rgb(var(--gold-rgb))]" />
  return <MonitorSmartphone size={18} className="text-[rgb(var(--gold-rgb))]" />
}

function StatusBadge({ status }: { status: string }) {
  if (status === "Live Beta") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 font-rajdhani text-[10px] uppercase tracking-[2.4px] text-emerald-300">
        <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
        Live Beta
      </span>
    )
  }

  if (status === "In Dev") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 font-rajdhani text-[10px] uppercase tracking-[2.4px] text-amber-300">
        <span className="h-2 w-2 rounded-full bg-amber-300" />
        In Dev
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--cream-rgb)/0.16)] bg-[rgb(var(--cream-rgb)/0.04)] px-3 py-1 font-rajdhani text-[10px] uppercase tracking-[2.4px] text-cream/60">
      <span className="h-2 w-2 rounded-full bg-[rgb(var(--cream-rgb)/0.32)]" />
      Planned
    </span>
  )
}

function LabsHeroPremium() {
  const prefersReduced = !!useReducedMotion()

  const motionProps = (delay = 0) =>
    prefersReduced
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: "easeOut" as const },
        }

  return (
    <section className="relative isolate min-h-[calc(100svh-6.5rem)] overflow-hidden px-5 pb-10 pt-[7.2rem] sm:px-6 sm:pb-12 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgb(var(--surface-0-rgb)),rgb(var(--ink-rgb)))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_42%_at_14%_16%,rgb(var(--gold-rgb)/0.08),transparent_60%),radial-gradient(ellipse_48%_36%_at_88%_14%,rgb(var(--gold-rgb)/0.06),transparent_62%),linear-gradient(180deg,rgba(8,10,14,0.16)_0%,rgba(8,10,14,0.42)_58%,rgba(8,10,14,0.96)_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16] studio-grid-overlay" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
        <motion.div className="relative z-10 max-w-2xl" {...motionProps(0)}>
          <motion.div
            {...motionProps(0.02)}
            className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.16)] bg-[rgb(var(--surface-2-rgb)/0.44)] px-4 py-2 text-[10px] uppercase tracking-[0.34em] text-cream/65 backdrop-blur-md"
          >
            <Sparkles size={13} className="text-gold" />
            NexGravision Labs
          </motion.div>

          <h1 className="mt-6 max-w-xl font-cinzel text-[clamp(44px,8vw,92px)] leading-[0.9] tracking-[0.01em] text-cream sm:text-[clamp(54px,7vw,96px)] lg:text-[clamp(58px,5.1vw,88px)]">
            Product systems for
            <span className="block text-gradient-gold">elite execution.</span>
          </h1>

          <p className="mt-5 max-w-xl text-[16px] leading-[1.78] text-cream/78 sm:text-[17px] lg:text-[18px]">
            NexGravision Labs builds focused products for people who want cleaner workflows, stronger habits, and a more premium way to ship.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="/shubiq-labs/shubiq-flow"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/70 bg-gold px-6 py-3.5 font-rajdhani text-[11px] uppercase tracking-[0.28em] text-[rgb(var(--ink-rgb))] shadow-[0_18px_40px_rgb(var(--gold-rgb)/0.16)] transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto sm:min-w-[190px]"
            >
              Explore Flow Beta
              <ArrowRight size={14} />
            </Link>
            <a
              href="mailto:nexgravision@gmail.com?subject=NexGravision%20Labs%20Early%20Access"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.24)] bg-[rgb(var(--surface-2-rgb)/0.3)] px-6 py-3.5 font-rajdhani text-[11px] uppercase tracking-[0.28em] text-cream backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto sm:min-w-[190px]"
            >
              Join Early Access
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Products", "3 focused systems in the lab."],
              ["Stage", "Beta-first development."],
              ["Direction", "Ritual-driven UX."],
            ].map(([title, text], index) => (
              <motion.div
                key={title}
                {...motionProps(0.1 + index * 0.06)}
                className="rounded-[20px] border border-[rgb(var(--cream-rgb)/0.1)] bg-[rgb(var(--surface-2-rgb)/0.22)] p-4 backdrop-blur-md"
              >
                <p className="font-rajdhani text-[10px] uppercase tracking-[0.28em] text-gold/78">{title}</p>
                <p className="mt-2 text-[15px] leading-[1.55] text-cream/68">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="relative z-10" {...motionProps(0.12)}>
          <CinematicMediaFrame
            imageSrc="/labs-visual.svg"
            alt="Dark technical product composition for the Labs division"
            badge="Labs command"
            eyebrow="Product division"
            caption="Launch board"
            metrics={[
              { label: "Beta", value: "Live" },
              { label: "Mode", value: "Focus" },
              { label: "Scale", value: "Ready" },
            ]}
            objectPosition="center left"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default function LabsPageClient() {
  const orderedProducts = useMemo(() => {
    const flow = LAB_PRODUCTS.find((product) => product.id === "shubiq-flow")
    const atlas = LAB_PRODUCTS.find((product) => product.id === "future-web")
    const pulse = LAB_PRODUCTS.find((product) => product.id === "future-suite")
    return [flow, atlas, pulse].filter(Boolean)
  }, [])

  const milestones = [
    {
      quarter: "Q3 2025",
      title: "Flow Foundation",
      description: "Product model, UX architecture, and execution system designed.",
      state: "Completed",
    },
    {
      quarter: "Q4 2025",
      title: "Core Engine Built",
      description: "Tasks, habits, and focus layers shipped into internal test builds.",
      state: "Completed",
    },
    {
      quarter: "Q1 2026",
      title: "Private Beta Live",
      description: "Android beta released with onboarding, telemetry, and release pipeline.",
      state: "Current",
    },
    {
      quarter: "Q2 2026",
      title: "Public Launch Window",
      description: "Play Store launch, premium sync layer, and polished onboarding release.",
      state: "Next",
    },
  ]

  const pillars = [
    {
      title: "Ritual-First UX",
      description: "Interfaces are shaped around repeatable execution rituals, not one-time interactions.",
    },
    {
      title: "Compounding Clarity",
      description: "Every feature should reduce cognitive drag and make daily decisions cleaner and faster.",
    },
    {
      title: "Performance Instrumentation",
      description: "Core workflows are measurable so users can improve consistency, not just stay busy.",
    },
  ]

  const accessTracks = [
    {
      name: "Early Testers",
      detail: "Get private beta builds, report UX friction, and influence product direction directly.",
    },
    {
      name: "Power Users",
      detail: "Validate advanced flows, analytics, and automation loops before public release.",
    },
    {
      name: "Launch Cohort",
      detail: "Receive first-wave production access once Play Store readiness and stability are cleared.",
    },
  ]

  const signalBoard = [
    { label: "Beta Throughput", value: "Weekly Drops", note: "New iterations shipped every week during private testing." },
    { label: "Design Standard", value: "Premium-First", note: "All interaction surfaces are tuned for speed and clarity." },
    { label: "Execution Goal", value: "Compounding", note: "Each release must increase focus quality over previous builds." },
  ]

  const commandDeck = [
    {
      title: "Execution Control",
      detail: "Every active build has clearly defined rituals and measurable daily loops.",
      icon: Command,
    },
    {
      title: "Performance Index",
      detail: "Release decisions are tied to speed, clarity, and completion quality signals.",
      icon: Gauge,
    },
    {
      title: "Stability Policy",
      detail: "Public rollout is gated by reliability checks and sustained beta confidence.",
      icon: ShieldCheck,
    },
  ]

  const launchGuardrails = [
    { label: "Rollout Window", value: "Staged Release" },
    { label: "Feedback SLA", value: "< 72 Hours" },
    { label: "Build Cycle", value: "Weekly Iteration" },
    { label: "Hotfix Target", value: "Same Day" },
  ]

  const matrixRows = [
    { category: "Stage", flow: "Live Beta", atlas: "In Dev", pulse: "Planned" },
    { category: "Core Mode", flow: "Tasks + Habits + Focus", atlas: "Knowledge Graph", pulse: "Life Performance OS" },
    { category: "Platform", flow: "Android", atlas: "Web App", pulse: "Cross Platform" },
    { category: "Release Path", flow: "Play Store", atlas: "Private Alpha", pulse: "Concept Validation" },
  ]

  return (
    <main className="labs-premium-bg labs-dock-spacer relative min-h-screen overflow-hidden text-cream">
      <LabsNavbar />
      <LabsHeroPremium />

      <section className="relative px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.6 }}
            className="mb-9"
          >
            <p className="font-rajdhani text-[11px] uppercase tracking-[3px] text-[rgb(var(--gold-light-rgb))]">Product Stack</p>
            <h2 className="mt-3 font-shubiq-heading text-[clamp(34px,5.2vw,68px)] leading-[0.95] text-cream">Built With Intent</h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {orderedProducts.map((product, index) => {
              if (!product) return null

              const isLive = product.status === "Live Beta"
              return (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className={`group relative overflow-hidden rounded-3xl border p-6 sm:p-7 ${
                    isLive
                      ? "border-[rgb(var(--gold-rgb)/0.4)] bg-[linear-gradient(160deg,rgb(var(--gold-rgb)/0.18),rgb(var(--surface-1-rgb)/0.78)_44%)]"
                      : "border-[rgb(var(--cream-rgb)/0.16)] bg-[linear-gradient(160deg,rgb(var(--cream-rgb)/0.08),rgb(var(--surface-1-rgb)/0.72)_48%)]"
                  }`}
                  whileHover={{ y: -6, transition: { duration: 0.24 } }}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_8%,rgb(var(--gold-rgb)/0.22),transparent_42%)] opacity-70" />
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-6 flex items-start justify-between gap-3">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[rgb(var(--gold-rgb)/0.34)] bg-[rgb(var(--gold-rgb)/0.1)]">
                        <ProductIcon category={product.category} />
                      </div>
                      <StatusBadge status={product.status} />
                    </div>

                    <div className="mb-4">
                      <p className="font-rajdhani text-[10px] uppercase tracking-[2.8px] text-cream/58">{product.category}</p>
                      <h3 className="mt-2 font-cinzel text-[30px] leading-[1.02] text-cream">{product.name}</h3>
                      <p className="mt-2 font-cormorant text-[17px] text-[rgb(var(--gold-light-rgb))]">{product.subtitle}</p>
                    </div>

                    <p className="font-cormorant text-[18px] leading-[1.55] text-cream/76">{product.desc}</p>

                    <div className="my-6 flex flex-wrap gap-2">
                      {product.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="rounded-full border border-[rgb(var(--cream-rgb)/0.2)] bg-[rgb(var(--cream-rgb)/0.05)] px-3 py-1 font-rajdhani text-[10px] uppercase tracking-[2.4px] text-cream/74"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto">
                      {product.disabled ? (
                        <button
                          disabled
                          className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--cream-rgb)/0.2)] px-5 py-2.5 font-rajdhani text-[11px] uppercase tracking-[2.8px] text-cream/55"
                        >
                          {product.cta}
                        </button>
                      ) : (
                        <Link
                          href={product.href}
                          className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.58)] px-5 py-2.5 font-rajdhani text-[11px] uppercase tracking-[2.8px] text-[rgb(var(--gold-light-rgb))] transition-colors duration-300 hover:bg-[rgb(var(--gold-rgb)/0.12)]"
                        >
                          {product.cta}
                          <ArrowRight size={14} />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-20 pt-10 sm:px-8 sm:pb-24">
        <div className="mx-auto mb-10 grid max-w-6xl gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="rounded-[28px] border border-[rgb(var(--cream-rgb)/0.14)] bg-[linear-gradient(180deg,rgb(var(--surface-1-rgb)/0.88),rgb(var(--surface-0-rgb)/0.92))] p-6 sm:p-8"
          >
            <p className="font-rajdhani text-[11px] uppercase tracking-[3px] text-[rgb(var(--gold-light-rgb))]">Operating Pillars</p>
            <h3 className="mt-3 font-shubiq-heading text-[clamp(30px,4vw,52px)] leading-[0.94]">How We Build</h3>
            <div className="mt-6 grid gap-3">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                  className="rounded-2xl border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--cream-rgb)/0.03)] p-4"
                >
                  <p className="font-cinzel text-[21px] text-cream">{pillar.title}</p>
                  <p className="mt-2 font-cormorant text-[17px] leading-[1.45] text-cream/75">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="rounded-[28px] border border-[rgb(var(--gold-rgb)/0.28)] bg-[linear-gradient(160deg,rgb(var(--gold-rgb)/0.16),rgb(var(--surface-1-rgb)/0.84)_46%)] p-6 sm:p-8"
          >
            <p className="font-rajdhani text-[11px] uppercase tracking-[3px] text-[rgb(var(--gold-light-rgb))]">Access Tracks</p>
            <h3 className="mt-3 font-shubiq-heading text-[clamp(30px,4vw,52px)] leading-[0.94]">Join The Rollout</h3>
            <div className="mt-6 space-y-3">
              {accessTracks.map((track, index) => (
                <motion.div
                  key={track.name}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                  className="rounded-2xl border border-[rgb(var(--gold-rgb)/0.25)] bg-[rgb(var(--gold-rgb)/0.08)] p-4"
                >
                  <p className="font-cinzel text-[21px] text-cream">{track.name}</p>
                  <p className="mt-2 font-cormorant text-[17px] leading-[1.45] text-cream/76">{track.detail}</p>
                </motion.div>
              ))}
            </div>
            <a
              href="mailto:nexgravision@gmail.com?subject=NexGravision%20Labs%20Track%20Request"
              className="labs-sheen-btn mt-6 inline-flex items-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.62)] px-5 py-2.5 font-rajdhani text-[11px] uppercase tracking-[2.8px] text-[rgb(var(--gold-light-rgb))] transition-colors duration-300 hover:bg-[rgb(var(--gold-rgb)/0.14)]"
            >
              Request Track Access
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>

        <div className="mx-auto mb-10 max-w-6xl rounded-[30px] border border-[rgb(var(--gold-rgb)/0.28)] bg-[linear-gradient(165deg,rgb(var(--gold-rgb)/0.16),rgb(var(--surface-1-rgb)/0.86)_42%)] p-6 sm:p-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ duration: 0.55 }}
          >
            <p className="font-rajdhani text-[11px] uppercase tracking-[3px] text-[rgb(var(--gold-light-rgb))]">Signal Board</p>
            <h3 className="mt-3 font-shubiq-heading text-[clamp(30px,4.1vw,54px)] leading-[0.95]">Execution Signals We Track</h3>
          </motion.div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {signalBoard.map((signal, index) => (
              <motion.div
                key={signal.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-2xl border border-[rgb(var(--gold-rgb)/0.25)] bg-[rgb(var(--gold-rgb)/0.08)] p-4"
              >
                <p className="font-rajdhani text-[10px] uppercase tracking-[2.6px] text-cream/64">{signal.label}</p>
                <p className="mt-2 font-cinzel text-[24px] leading-[1.05] text-cream">{signal.value}</p>
                <p className="mt-2 font-cormorant text-[17px] leading-[1.45] text-cream/77">{signal.note}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mx-auto mb-10 grid max-w-6xl gap-6 lg:grid-cols-[1.12fr_0.88fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ duration: 0.55 }}
            className="rounded-[30px] border border-[rgb(var(--cream-rgb)/0.14)] bg-[linear-gradient(180deg,rgb(var(--surface-1-rgb)/0.9),rgb(var(--surface-0-rgb)/0.93))] p-6 sm:p-8"
          >
            <p className="font-rajdhani text-[11px] uppercase tracking-[3px] text-[rgb(var(--gold-light-rgb))]">Command Deck</p>
            <h3 className="mt-3 font-shubiq-heading text-[clamp(30px,4.2vw,54px)] leading-[0.95]">Operational Clarity</h3>
            <div className="mt-6 grid gap-3">
              {commandDeck.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="rounded-2xl border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--cream-rgb)/0.03)] p-4"
                >
                  <div className="flex items-center gap-2">
                    <item.icon size={15} className="text-[rgb(var(--gold-rgb))]" />
                    <p className="font-cinzel text-[22px] text-cream">{item.title}</p>
                  </div>
                  <p className="mt-2 font-cormorant text-[17px] leading-[1.45] text-cream/76">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="rounded-[30px] border border-[rgb(var(--gold-rgb)/0.3)] bg-[linear-gradient(165deg,rgb(var(--gold-rgb)/0.18),rgb(var(--surface-1-rgb)/0.84)_44%)] p-6 sm:p-8"
          >
            <p className="font-rajdhani text-[11px] uppercase tracking-[3px] text-[rgb(var(--gold-light-rgb))]">Launch Guardrails</p>
            <h3 className="mt-3 font-shubiq-heading text-[clamp(30px,4.2vw,54px)] leading-[0.95]">Reliability Protocol</h3>
            <div className="mt-6 grid gap-3">
              {launchGuardrails.map((guard, index) => (
                <motion.div
                  key={guard.label}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="flex items-center justify-between rounded-2xl border border-[rgb(var(--gold-rgb)/0.25)] bg-[rgb(var(--gold-rgb)/0.08)] px-4 py-3"
                >
                  <p className="font-rajdhani text-[10px] uppercase tracking-[2.5px] text-cream/68">{guard.label}</p>
                  <p className="font-cinzel text-[20px] text-cream">{guard.value}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-[rgb(var(--gold-rgb)/0.26)] bg-[rgb(var(--gold-rgb)/0.1)] p-4">
              <div className="flex items-center gap-2">
                <Timer size={14} className="text-[rgb(var(--gold-rgb))]" />
                <p className="font-rajdhani text-[10px] uppercase tracking-[2.6px] text-cream/70">Live Ops Note</p>
              </div>
              <p className="mt-2 font-cormorant text-[17px] leading-[1.45] text-cream/78">
                Private channels are reviewed continuously. High-impact issues are prioritized into immediate fixes.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mx-auto mb-10 max-w-6xl rounded-[30px] border border-[rgb(var(--cream-rgb)/0.14)] bg-[linear-gradient(180deg,rgb(var(--surface-1-rgb)/0.9),rgb(var(--surface-0-rgb)/0.94))] p-6 sm:p-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ duration: 0.55 }}
          >
            <p className="font-rajdhani text-[11px] uppercase tracking-[3px] text-[rgb(var(--gold-light-rgb))]">Comparison Matrix</p>
            <h3 className="mt-3 font-shubiq-heading text-[clamp(30px,4.2vw,54px)] leading-[0.95]">Choose Your Track</h3>
          </motion.div>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-[rgb(var(--cream-rgb)/0.14)]">
            <table className="min-w-full border-collapse">
              <thead className="bg-[rgb(var(--cream-rgb)/0.04)]">
                <tr>
                  {["Category", "NexGravision Flow", "NexGravision Atlas", "NexGravision Pulse"].map((head) => (
                    <th
                      key={head}
                      className="border-b border-[rgb(var(--cream-rgb)/0.14)] px-4 py-3 text-left font-rajdhani text-[10px] uppercase tracking-[2.6px] text-cream/66"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrixRows.map((row) => (
                  <tr key={row.category} className="odd:bg-[rgb(var(--cream-rgb)/0.015)]">
                    <td className="border-b border-[rgb(var(--cream-rgb)/0.12)] px-4 py-3 font-cinzel text-[19px] text-cream/90">{row.category}</td>
                    <td className="border-b border-[rgb(var(--cream-rgb)/0.12)] px-4 py-3 font-cormorant text-[18px] text-cream/78">{row.flow}</td>
                    <td className="border-b border-[rgb(var(--cream-rgb)/0.12)] px-4 py-3 font-cormorant text-[18px] text-cream/78">{row.atlas}</td>
                    <td className="border-b border-[rgb(var(--cream-rgb)/0.12)] px-4 py-3 font-cormorant text-[18px] text-cream/78">{row.pulse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mx-auto max-w-6xl rounded-[30px] border border-[rgb(var(--cream-rgb)/0.14)] bg-[linear-gradient(180deg,rgb(var(--surface-1-rgb)/0.9),rgb(var(--surface-0-rgb)/0.94))] p-7 sm:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <p className="font-rajdhani text-[11px] uppercase tracking-[3px] text-[rgb(var(--gold-light-rgb))]">Roadmap</p>
            <h2 className="mt-3 font-shubiq-heading text-[clamp(32px,5vw,62px)] leading-[0.95]">Launch Sequence</h2>
          </motion.div>

          <div className="grid gap-4">
            {milestones.map((phase, index) => {
              const isCurrent = phase.state === "Current"
              return (
                <motion.div
                  key={phase.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`rounded-2xl border p-5 sm:p-6 ${
                    isCurrent
                      ? "border-[rgb(var(--gold-rgb)/0.42)] bg-[rgb(var(--gold-rgb)/0.11)]"
                      : "border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--cream-rgb)/0.03)]"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-rajdhani text-[10px] uppercase tracking-[2.8px] text-cream/62">{phase.quarter}</p>
                      <h3 className="mt-1 font-cinzel text-[25px] leading-[1.05] text-cream">{phase.title}</h3>
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 font-rajdhani text-[10px] uppercase tracking-[2.4px] ${
                        isCurrent
                          ? "border-[rgb(var(--gold-rgb)/0.55)] text-[rgb(var(--gold-light-rgb))]"
                          : "border-[rgb(var(--cream-rgb)/0.22)] text-cream/66"
                      }`}
                    >
                      {phase.state}
                    </span>
                  </div>
                  <p className="mt-3 max-w-3xl font-cormorant text-[18px] leading-[1.5] text-cream/74">{phase.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-[30px] border border-[rgb(var(--gold-rgb)/0.36)] bg-[linear-gradient(165deg,rgb(var(--gold-rgb)/0.2),rgb(var(--surface-1-rgb)/0.84)_42%)] p-7 sm:p-10"
        >
          <p className="font-rajdhani text-[11px] uppercase tracking-[3px] text-[rgb(var(--gold-light-rgb))]">Phase Access</p>
          <h3 className="mt-3 max-w-3xl font-shubiq-heading text-[clamp(32px,4.7vw,62px)] leading-[0.94]">
            Want Direct Access To The Next NexGravision Labs Build?
          </h3>
          <p className="mt-4 max-w-3xl font-cormorant text-[20px] leading-[1.45] text-cream/80">
            Join the private rollout and help shape features before public launch. Feedback loops are direct and implementation is fast.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="mailto:nexgravision@gmail.com?subject=NexGravision%20Labs%20Priority%20Access"
              className="labs-sheen-btn inline-flex items-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.72)] bg-[rgb(var(--gold-rgb))] px-6 py-3 font-rajdhani text-[12px] uppercase tracking-[3px] text-[rgb(var(--ink-rgb))] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Request Priority Access
              <ArrowUpRight size={14} />
            </a>
            <Link
              href="/shubiq-labs/shubiq-flow"
              className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--cream-rgb)/0.28)] px-6 py-3 font-rajdhani text-[12px] uppercase tracking-[3px] text-cream/84 transition-colors duration-300 hover:border-[rgb(var(--gold-rgb)/0.5)] hover:text-[rgb(var(--gold-light-rgb))]"
            >
              View Live Beta
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </section>

      <div className="labs-mobile-dock md:hidden">
        <div className="labs-mobile-dock-inner">
          <a
            href="mailto:nexgravision@gmail.com?subject=NexGravision%20Labs%20Priority%20Access"
            className="labs-mobile-dock-btn labs-mobile-dock-btn-muted"
          >
            Join Beta
          </a>
          <Link href="/shubiq-labs/shubiq-flow" className="labs-mobile-dock-btn labs-mobile-dock-btn-primary">
            Flow Beta
          </Link>
        </div>
      </div>
    </main>
  )
}


