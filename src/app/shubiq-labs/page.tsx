"use client"
import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles, Smartphone, Globe, MonitorSmartphone, ArrowUpRight } from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import GoldLine from "../components/GoldLine"

const PRODUCTS = [
  {
    id: "shubiq-flow",
    name: "SHUBIQ Flow",
    subtitle: "Tasks, Habits & Focus",
    status: "Live Beta",
    category: "Mobile App",
    desc: "A premium productivity system that fuses tasks, habits, and deep focus into one ritual-driven workflow.",
    highlights: ["Tasks + Habits + Focus", "XP + Analytics", "Dark premium UX"],
    cta: "Explore Product",
    href: "/shubiq-labs/shubiq-flow",
  },
  {
    id: "future-suite",
    name: "SHUBIQ Pulse",
    subtitle: "Performance OS (Coming Soon)",
    status: "Concept",
    category: "System",
    desc: "Unified personal performance stack for planning, execution, and retrospectives across your life systems.",
    highlights: ["Life OS", "Deep Analytics", "Automation"],
    cta: "Planned",
    href: "#",
    disabled: true,
  },
  {
    id: "future-web",
    name: "SHUBIQ Atlas",
    subtitle: "Knowledge System (Coming Soon)",
    status: "In Dev",
    category: "Web App",
    desc: "A knowledge and research workspace designed to connect ideas into actionable outcomes.",
    highlights: ["Research Vault", "Linked Notes", "AI Layer"],
    cta: "Planned",
    href: "#",
    disabled: true,
  },
]

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-1 h-1 rounded-full bg-gold/80" />
      <div className="font-rajdhani text-[12px] tracking-[5px] text-gold/80 uppercase">{label}</div>
      <span className="w-14 h-px bg-gradient-to-r from-gold/40 to-transparent" />
    </div>
  )
}

export default function ShubiqLabsPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      try {
        const { gsap } = await import("gsap")
        gsap.fromTo(heroRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
        gsap.fromTo(
          gridRef.current?.children ?? [],
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.1 },
        )
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
        <section className="relative pt-[110px] sm:pt-[130px] pb-14 px-5 sm:px-8 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 40% 30%, rgb(var(--gold-rgb) / 0.08) 0%, transparent 58%), radial-gradient(ellipse at 70% 10%, rgb(var(--gold-light-rgb) / 0.06) 0%, transparent 50%)",
            }}
          />
          <div className="max-w-6xl mx-auto relative">
            <div ref={heroRef} className="opacity-0">
              <div className="inline-flex items-center gap-2 border border-gold/20 bg-gold/[0.04] px-3.5 py-2 mb-6">
                <Sparkles size={14} className="text-gold" />
                <span className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/80">
                  SHUBIQ Labs - Product Division
                </span>
              </div>
              <h1 className="font-cinzel font-black leading-[1.02] text-[clamp(32px,6.2vw,68px)] mb-4">
                The SHUBIQ
                <span className="text-gold"> Product Stack</span>
              </h1>
              <p className="font-cormorant text-cream/75 leading-[1.7] max-w-[640px]" style={{ fontSize: "clamp(16px,1.4vw,20px)" }}>
                A focused ecosystem of apps, web platforms, and performance tools engineered under SHUBIQ. Each product is
                built for clarity, speed, and long-term execution power.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/shubiq-labs/shubiq-flow"
                  className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-gold/70 bg-gold text-ink px-5 py-3 hover:bg-gold-light transition-all duration-300"
                >
                  View Live Beta
                  <ArrowRight size={14} />
                </Link>
                <a
                  href="mailto:shubiqofficial@gmail.com?subject=SHUBIQ%20Labs%20Early%20Access"
                  className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-[rgb(var(--cream-rgb)/0.25)] px-5 py-3 text-cream/80 hover:text-gold hover:border-gold transition-all duration-300"
                >
                  Request Early Access
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <GoldLine />

        <section className="py-14 sm:py-16 px-5 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <SectionLabel label="Products" />
            <div ref={gridRef} className="grid md:grid-cols-2 gap-6">
              {PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  className="relative border border-[rgb(var(--cream-rgb)/0.14)] bg-card-soft rounded-sm p-6 sm:p-7 overflow-hidden"
                  style={{
                    boxShadow: "0 24px 48px rgb(0 0 0 / 0.24), 0 0 0 1px rgb(var(--cream-rgb) / 0.06) inset",
                  }}
                >
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(160deg, rgb(var(--gold-rgb)/0.06), transparent 45%)" }} />
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 border border-gold/30 bg-gold/[0.1] flex items-center justify-center">
                        {product.category === "Mobile App" ? <Smartphone size={18} className="text-gold" /> : product.category === "Web App" ? <Globe size={18} className="text-gold" /> : <MonitorSmartphone size={18} className="text-gold" />}
                      </div>
                      <div>
                        <div className="font-rajdhani text-[10px] tracking-[2.8px] uppercase text-gold/70">{product.category}</div>
                        <div className="font-rajdhani text-[11px] tracking-[2px] uppercase text-cream/55">{product.status}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-cinzel text-[20px] text-cream/90">{product.name}</div>
                      <div className="font-rajdhani text-[11px] tracking-[2px] uppercase text-gold/70">{product.subtitle}</div>
                    </div>
                  </div>
                  <p className="font-cormorant text-cream/75 leading-[1.6] mb-5">{product.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.highlights.map((h) => (
                      <span key={h} className="px-3 py-1 text-[10px] tracking-[2px] uppercase font-rajdhani border border-gold/25 text-gold/75">
                        {h}
                      </span>
                    ))}
                  </div>
                  {product.disabled ? (
                    <button
                      className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-[rgb(var(--cream-rgb)/0.2)] px-5 py-3 text-cream/60 cursor-not-allowed"
                      disabled
                    >
                      {product.cta}
                    </button>
                  ) : (
                    <Link
                      href={product.href}
                      className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-gold/60 px-5 py-3 text-cream hover:text-gold hover:border-gold transition-all duration-300"
                    >
                      {product.cta}
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
