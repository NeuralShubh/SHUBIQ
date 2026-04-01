"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowDownCircle,
  ArrowRight,
  CheckCircle2,
  Package,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react"

const APK_URL = "https://flow.shubiq.com/downloads/SHUBIQ-Flow.apk"
const BUILD_VERSION = "0.9.0-beta"
const BUILD_DATE = "March 2026"

const RELEASE_NOTES = [
  "New SHUBIQ Labs download hub for smoother beta distribution.",
  "Stability and interaction polish across tasks, habits, and focus.",
  "Improved sync-ready architecture for upcoming Pro rollout.",
]

const INSTALL_STEPS = [
  "Enable Install unknown apps when Android prompts for permission.",
  "This build is a private beta package and may receive rapid updates.",
  "For updates, install the newer APK directly over the current build.",
]

const CONFIDENCE_CHECKS = [
  { label: "Task Engine", status: "Stable" },
  { label: "Habit Loops", status: "Stable" },
  { label: "Focus Sessions", status: "Optimizing" },
  { label: "Sync Layer", status: "In Progress" },
]

const SUPPORT_PROTOCOL = [
  "Bug reports: include device model + Android version + issue video if possible.",
  "Feedback cycle: updates are reviewed weekly and prioritized for next beta push.",
  "Critical issues: mark message subject with [Critical] for same-day triage.",
]

export default function ShubiqFlowDownloadPage() {
  return (
    <main className="labs-premium-bg relative min-h-screen overflow-hidden text-cream">
      <div className="labs-grid-overlay pointer-events-none absolute inset-0" />
      <div className="labs-glow-orb pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full" />

      <section className="relative px-5 pb-14 pt-[120px] sm:px-8 sm:pt-[140px]">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.35)] bg-[rgb(var(--gold-rgb)/0.1)] px-4 py-2"
          >
            <Smartphone size={14} className="text-[rgb(var(--gold-rgb))]" />
            <span className="font-rajdhani text-[11px] uppercase tracking-[3px] text-[rgb(var(--gold-light-rgb))]">
              SHUBIQ Flow Android Beta
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-6 max-w-5xl font-shubiq-heading text-[clamp(38px,6.5vw,84px)] leading-[0.92]"
          >
            Focus. Execute.
            <span className="block text-[rgb(var(--gold-rgb))]">Repeat With Precision.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mt-6 max-w-3xl font-cormorant text-[clamp(17px,2vw,24px)] leading-[1.5] text-cream/78"
          >
            SHUBIQ Flow is a premium execution app unifying tasks, habits, and deep work sessions in one ritual-driven workspace.
            This page gives you direct access to the latest beta build.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href={APK_URL}
              className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.72)] bg-[rgb(var(--gold-rgb))] px-6 py-3 font-rajdhani text-[12px] uppercase tracking-[3px] text-[rgb(var(--ink-rgb))] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <ArrowDownCircle size={16} />
              Download APK
            </a>
            <Link
              href="/shubiq-labs"
              className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--cream-rgb)/0.24)] bg-[rgb(var(--cream-rgb)/0.02)] px-6 py-3 font-rajdhani text-[12px] uppercase tracking-[3px] text-cream/84 transition-colors duration-300 hover:border-[rgb(var(--gold-rgb)/0.5)] hover:text-[rgb(var(--gold-light-rgb))]"
            >
              Back to Labs
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="relative px-5 pb-8 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-3xl border border-[rgb(var(--gold-rgb)/0.34)] bg-[linear-gradient(165deg,rgb(var(--gold-rgb)/0.17),rgb(var(--surface-1-rgb)/0.82)_44%)] p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-rajdhani text-[10px] uppercase tracking-[3px] text-[rgb(var(--gold-light-rgb))]">Current Build</p>
                <h2 className="mt-2 font-cinzel text-[32px] leading-[1] text-cream">Beta Channel</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 font-rajdhani text-[10px] uppercase tracking-[2.4px] text-emerald-300">
                <ShieldCheck size={14} />
                Verified Package
              </span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Platform", value: "Android" },
                { label: "Version", value: BUILD_VERSION },
                { label: "Released", value: BUILD_DATE },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[rgb(var(--cream-rgb)/0.16)] bg-[rgb(var(--surface-2-rgb)/0.58)] px-4 py-3"
                >
                  <p className="font-rajdhani text-[9px] uppercase tracking-[2.5px] text-cream/56">{stat.label}</p>
                  <p className="mt-1 font-cormorant text-[18px] text-cream/90">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 grid gap-2">
              {RELEASE_NOTES.map((note, index) => (
                <motion.div
                  key={note}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex items-start gap-2 rounded-xl border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--cream-rgb)/0.03)] px-3 py-3"
                >
                  <Sparkles size={14} className="mt-0.5 text-[rgb(var(--gold-rgb))]" />
                  <p className="font-cormorant text-[17px] leading-[1.5] text-cream/76">{note}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="rounded-3xl border border-[rgb(var(--cream-rgb)/0.16)] bg-[linear-gradient(165deg,rgb(var(--cream-rgb)/0.08),rgb(var(--surface-1-rgb)/0.72)_48%)] p-6"
          >
            <div className="flex items-center gap-2">
              <Package size={14} className="text-[rgb(var(--gold-rgb))]" />
              <p className="font-rajdhani text-[11px] uppercase tracking-[3px] text-[rgb(var(--gold-light-rgb))]">Install Notes</p>
            </div>

            <ul className="mt-5 space-y-3">
              {INSTALL_STEPS.map((step) => (
                <li key={step} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="mt-1 text-[rgb(var(--gold-rgb))]" />
                  <span className="font-cormorant text-[17px] leading-[1.5] text-cream/76">{step}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--cream-rgb)/0.03)] p-4">
              <p className="font-rajdhani text-[10px] uppercase tracking-[2.6px] text-cream/58">Next Milestone</p>
              <p className="mt-2 font-cormorant text-[18px] leading-[1.45] text-cream/82">
                Public Play Store release after closed-beta validation, payment checks, and onboarding refinement.
              </p>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="relative px-5 pb-20 pt-8 sm:px-8 sm:pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="rounded-[28px] border border-[rgb(var(--cream-rgb)/0.14)] bg-[linear-gradient(180deg,rgb(var(--surface-1-rgb)/0.88),rgb(var(--surface-0-rgb)/0.92))] p-6 sm:p-8"
          >
            <p className="font-rajdhani text-[11px] uppercase tracking-[3px] text-[rgb(var(--gold-light-rgb))]">Release Confidence</p>
            <h3 className="mt-3 font-shubiq-heading text-[clamp(28px,3.8vw,50px)] leading-[0.95]">System Readiness</h3>

            <div className="mt-6 grid gap-3">
              {CONFIDENCE_CHECKS.map((check, index) => {
                const isStable = check.status === "Stable"
                const isOptimizing = check.status === "Optimizing"
                return (
                  <motion.div
                    key={check.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className="flex items-center justify-between rounded-2xl border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--cream-rgb)/0.03)] px-4 py-3"
                  >
                    <p className="font-cormorant text-[20px] text-cream/88">{check.label}</p>
                    <span
                      className={`rounded-full border px-3 py-1 font-rajdhani text-[10px] uppercase tracking-[2.4px] ${
                        isStable
                          ? "border-emerald-400/35 bg-emerald-400/10 text-emerald-300"
                          : isOptimizing
                            ? "border-amber-400/35 bg-amber-400/10 text-amber-300"
                            : "border-[rgb(var(--cream-rgb)/0.25)] bg-[rgb(var(--cream-rgb)/0.06)] text-cream/68"
                      }`}
                    >
                      {check.status}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="rounded-[28px] border border-[rgb(var(--gold-rgb)/0.3)] bg-[linear-gradient(160deg,rgb(var(--gold-rgb)/0.14),rgb(var(--surface-1-rgb)/0.84)_46%)] p-6 sm:p-8"
          >
            <p className="font-rajdhani text-[11px] uppercase tracking-[3px] text-[rgb(var(--gold-light-rgb))]">Support Protocol</p>
            <h3 className="mt-3 font-shubiq-heading text-[clamp(28px,3.8vw,50px)] leading-[0.95]">Beta Communication</h3>
            <ul className="mt-6 space-y-3">
              {SUPPORT_PROTOCOL.map((line, index) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="rounded-2xl border border-[rgb(var(--gold-rgb)/0.24)] bg-[rgb(var(--gold-rgb)/0.08)] p-4 font-cormorant text-[18px] leading-[1.45] text-cream/78"
                >
                  {line}
                </motion.li>
              ))}
            </ul>

            <a
              href="mailto:shubiqofficial@gmail.com?subject=SHUBIQ%20Flow%20Beta%20Feedback"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.62)] px-5 py-2.5 font-rajdhani text-[11px] uppercase tracking-[2.8px] text-[rgb(var(--gold-light-rgb))] transition-colors duration-300 hover:bg-[rgb(var(--gold-rgb)/0.14)]"
            >
              Send Beta Feedback
              <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
