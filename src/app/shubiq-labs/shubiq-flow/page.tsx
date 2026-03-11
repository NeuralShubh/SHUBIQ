"use client"
import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowDownCircle, ArrowRight, ShieldCheck, Sparkles, Smartphone, Package } from "lucide-react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import GoldLine from "../../components/GoldLine"

const APK_URL = "https://flow.shubiq.com/downloads/SHUBIQ-Flow.apk"
const BUILD_VERSION = "0.9.0-beta"
const BUILD_DATE = "March 2026"
const RELEASE_NOTES = [
  "New SHUBIQ Labs download hub for beta distribution.",
  "Stability pass across tasks, habits, and focus flows.",
  "Improved sync-ready architecture (Pro-only).",
]

export default function ShubiqFlowDownloadPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      try {
        const { gsap } = await import("gsap")
        gsap.fromTo(heroRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
        gsap.fromTo(cardRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.15 })
      } catch {
        // no-op
      }
    }
    init()
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[rgb(var(--ink-rgb))] text-cream">
        <section className="relative pt-[110px] sm:pt-[130px] pb-12 px-5 sm:px-8 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 42% 18%, rgb(var(--gold-rgb) / 0.1) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgb(var(--gold-light-rgb) / 0.08) 0%, transparent 60%)",
            }}
          />
          <div className="max-w-5xl mx-auto relative">
            <div ref={heroRef} className="opacity-0">
              <div className="inline-flex items-center gap-2 border border-gold/20 bg-gold/[0.04] px-3.5 py-2 mb-6">
                <Smartphone size={14} className="text-gold" />
                <span className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/80">
                  SHUBIQ Flow - Android Beta
                </span>
              </div>
              <h1 className="font-cinzel font-black leading-[1.02] text-[clamp(32px,6vw,62px)] mb-3">
                SHUBIQ Flow
                <span className="text-gold"> — Tasks, Habits & Focus</span>
              </h1>
              <p className="font-cormorant text-cream/75 leading-[1.7] max-w-[680px]" style={{ fontSize: "clamp(16px,1.4vw,20px)" }}>
                A premium dark-mode productivity app engineered for execution. Track tasks, build habits, and go deep with focus sessions —
                all in one unified system.
              </p>
            </div>
          </div>
        </section>

        <GoldLine />

        <section className="py-12 sm:py-14 px-5 sm:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
            <div
              ref={cardRef}
              className="relative border border-[rgb(var(--cream-rgb)/0.16)] bg-card-soft p-6 sm:p-8 rounded-sm overflow-hidden"
              style={{ boxShadow: "0 28px 52px rgb(0 0 0 / 0.25), 0 0 0 1px rgb(var(--cream-rgb)/0.06) inset" }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(150deg, rgb(var(--gold-rgb)/0.08), transparent 45%)" }} />
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="font-rajdhani text-[10px] tracking-[3px] uppercase text-gold/70">Current Release</div>
                  <div className="font-cinzel text-[22px] text-cream/90">Beta Build</div>
                </div>
                <div className="flex items-center gap-2 text-gold/80 text-[11px] font-rajdhani tracking-[2px] uppercase">
                  <ShieldCheck size={16} />
                  Verified
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mb-6">
                {[
                  { label: "Platform", value: "Android" },
                  { label: "Build", value: BUILD_VERSION },
                  { label: "Release", value: BUILD_DATE },
                ].map((item) => (
                  <div key={item.label} className="border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--surface-2-rgb)/0.5)] p-3">
                    <div className="font-rajdhani text-[9px] tracking-[2.4px] uppercase text-cream/50">{item.label}</div>
                    <div className="font-cormorant text-[16px] text-cream/85">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {["Tasks", "Habits", "Focus", "Analytics", "Dark UI"].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-[10px] tracking-[2px] uppercase font-rajdhani border border-gold/25 text-gold/75">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={APK_URL}
                  className="inline-flex items-center justify-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-gold/70 bg-gold text-ink px-6 py-3 hover:bg-gold-light transition-all duration-300"
                >
                  <ArrowDownCircle size={16} />
                  Download APK
                </a>
                <Link
                  href="/shubiq-labs"
                  className="inline-flex items-center justify-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-[rgb(var(--cream-rgb)/0.25)] px-6 py-3 text-cream/80 hover:text-gold hover:border-gold transition-all duration-300"
                >
                  Back to Labs
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--surface-2-rgb)/0.55)] p-6 rounded-sm">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-gold" />
                <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/75">Install Notes</div>
              </div>
              <ul className="font-cormorant text-cream/72 leading-[1.6] space-y-3 text-[15px]">
                <li>Enable “Install unknown apps” when prompted.</li>
                <li>This is a beta build for private testing only.</li>
                <li>Updates require manual download until Play Store launch.</li>
              </ul>
              <div className="mt-6 border-t border-[rgb(var(--cream-rgb)/0.12)] pt-4">
                <div className="font-rajdhani text-[10px] tracking-[2.5px] uppercase text-cream/50 mb-2">Roadmap</div>
                <div className="font-cormorant text-cream/75 text-[14px] leading-[1.55]">
                  Play Store launch after closed beta, payments testing, and stability validation.
                </div>
              </div>
            </div>
          </div>
        </section>

        <GoldLine />

        <section className="py-12 sm:py-14 px-5 sm:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1.05fr_0.95fr] gap-6">
            <div className="border border-[rgb(var(--cream-rgb)/0.14)] bg-card-soft p-6 sm:p-7 rounded-sm">
              <div className="flex items-center gap-2 mb-4">
                <Package size={14} className="text-gold" />
                <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/75">Release Notes</div>
              </div>
              <ul className="space-y-3 font-cormorant text-cream/78 text-[15px] leading-[1.6]">
                {RELEASE_NOTES.map((note) => (
                  <li key={note} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-gold/70" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--surface-2-rgb)/0.55)] p-6 sm:p-7 rounded-sm">
              <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/75 mb-4">System Requirements</div>
              <ul className="space-y-3 font-cormorant text-cream/75 text-[15px] leading-[1.6]">
                <li>Android 9+ recommended for best performance.</li>
                <li>Allow notifications for reminders and focus sessions.</li>
                <li>Keep battery optimizations disabled for reliable alarms.</li>
              </ul>
              <div className="mt-5 border-t border-[rgb(var(--cream-rgb)/0.12)] pt-4">
                <div className="font-rajdhani text-[10px] tracking-[2.5px] uppercase text-cream/55 mb-2">Update Method</div>
                <div className="font-cormorant text-cream/75 text-[14px] leading-[1.55]">
                  Download the latest APK and install over the existing build.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
