"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { LayoutGrid, Brain, TrendingUp, Target } from "lucide-react"
import ScrollReveal from "../components/ScrollReveal"
import StaggerContainer, { StaggerItem } from "../components/StaggerContainer"
import SectionDivider from "../components/SectionDivider"
import BackLink from "../components/BackLink"
import SectionLabel from "../components/SectionLabel"

const focusAreas = [
  { label: "Digital product architecture", icon: LayoutGrid },
  { label: "AI-integrated workflows", icon: Brain },
  { label: "Conversion-focused web systems", icon: TrendingUp },
  { label: "Ritual-first productivity tools", icon: Target },
]

// TODO: Verify these dates with Shubham and adjust as needed.
const founderTimeline = [
  {
    year: "2023",
    title: "Engineering Foundation",
    description: "Deep-dived into web development, mastering React, Next.js, and modern frontend architecture.",
  },
  {
    year: "2024",
    title: "First Production Projects",
    description: "Built and launched multiple web platforms. Established engineering standards that became SHUBIQ's foundation.",
  },
  {
    year: "2025",
    title: "SHUBIQ Brand Established",
    description: "Founded SHUBIQ Studio and SHUBIQ Labs to deliver premium client systems and owned products.",
  },
  {
    year: "2026",
    title: "Product Ecosystem Growth",
    description: "SHUBIQ Flow enters beta. Atlas and Pulse in development. Studio scales execution systems across brands.",
  },
]

const quickFacts = [
  { label: "Brand", value: "SHUBIQ" },
  { label: "Role", value: "Founder & Product Lead" },
  { label: "Focus", value: "Execution systems, AI workflows, premium UX" },
  { label: "Location", value: "India" },
  { label: "Stack", value: "Next.js, TypeScript, React Native, AI" },
]

const socialLinks = [
  {
    label: "X / Twitter",
    url: "https://x.com/NeuralShubh",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4 4l7.5 8.5L4 20h3.5l5-5.5L17.5 20H20l-7.8-8.8L20 4h-3.5l-4.5 5L7.5 4H4z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/neuralshubh/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.7-1.2 2.4-2.5 5-2.5 5.3 0 6.3 3.5 6.3 8v8.3h-5V16c0-1.9 0-4.3-2.6-4.3-2.6 0-3 2-3 4.2v8.1h-5V8z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    url: "https://github.com/NeuralShubh",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.5 0-.25-.01-.9-.01-1.77-2.78.62-3.37-1.36-3.37-1.36-.46-1.17-1.12-1.48-1.12-1.48-.92-.64.07-.63.07-.63 1.02.07 1.56 1.07 1.56 1.07.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.13-4.56-5.04 0-1.11.38-2.02 1-2.73-.1-.26-.43-1.32.1-2.75 0 0 .82-.27 2.7 1.04.78-.22 1.62-.33 2.46-.33.84 0 1.68.11 2.46.33 1.88-1.31 2.7-1.04 2.7-1.04.53 1.43.2 2.49.1 2.75.62.71 1 1.62 1 2.73 0 3.92-2.34 4.78-4.57 5.03.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .28.18.61.69.5A10.2 10.2 0 0022 12.2C22 6.58 17.52 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/shubham.bnb/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3.5A5.5 5.5 0 1017.5 13 5.51 5.51 0 0012 7.5zm0 2A3.5 3.5 0 1115.5 13 3.5 3.5 0 0112 9.5zm5.75-3a1 1 0 100 2 1 1 0 000-2z" />
      </svg>
    ),
  },
]

function SectionHeading({ label, title, description }: { label: string; title: string; description?: string }) {
  return (
    <ScrollReveal>
      <div className="mb-10 md:mb-12 text-center">
        <SectionLabel label={label} centered />
        <h2 className="mt-4 font-shubiq-heading font-normal text-cream" style={{ fontSize: "clamp(30px, 5.5vw, 62px)", lineHeight: 0.92 }}>
          {title}
        </h2>
        {description ? <p className="text-cream/70 font-cormorant mt-3 max-w-3xl mx-auto">{description}</p> : null}
      </div>
    </ScrollReveal>
  )
}

export default function FounderPageClient() {
  const prefersReduced = useReducedMotion()
  const { scrollY } = useScroll()
  const photoY = useTransform(scrollY, [0, 500], [0, prefersReduced ? 0 : -30])
  const currentYear = "2026"

  return (
    <main className="min-h-screen bg-[rgb(var(--ink-rgb))] text-cream">
      <section className="relative pt-[80px] sm:pt-[104px] pb-12 px-5 sm:px-8 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 35% 18%, rgb(var(--gold-rgb) / 0.1) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgb(var(--gold-light-rgb) / 0.08) 0%, transparent 55%)",
          }}
        />
        <div className="max-w-5xl mx-auto relative grid lg:grid-cols-[0.9fr_1.1fr] gap-x-10 gap-y-2 sm:gap-y-3 items-center">
          <div className="lg:col-span-2">
            <BackLink href="/" label="Back to Home" className="mb-2" />
          </div>
          <ScrollReveal direction="right">
            <motion.div
              style={{ y: photoY }}
              initial={prefersReduced ? {} : { opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="border border-[rgb(var(--cream-rgb)/0.16)] bg-[rgb(var(--surface-2-rgb)/0.65)] p-4 sm:p-5 rounded-sm shadow-[0_20px_40px_rgb(0_0_0_/_0.35)]"
            >
              <div className="aspect-[3/4] w-full overflow-hidden border border-gold/20">
                <Image
                  src="https://res.cloudinary.com/dl1jueuj3/image/upload/v1772213832/Image_ky1fkg.png"
                  alt="Shubham - Founder of SHUBIQ"
                  width={900}
                  height={1200}
                  className="w-full h-full object-cover object-center"
                  priority
                />
              </div>
              <div className="mt-4 text-center">
                <div className="font-cinzel text-[20px] text-gold">Shubham</div>
                <div className="font-rajdhani text-[10px] tracking-[3px] uppercase text-cream/60">Founder | SHUBIQ</div>
              </div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.1}>
            <div>
              <div className="inline-flex items-center gap-2 border border-gold/20 bg-gold/[0.04] px-3.5 py-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/80" />
                <span className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/80">Founder</span>
              </div>
              <motion.h1
                initial={prefersReduced ? {} : { opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="font-cinzel font-black leading-[1.02] text-[clamp(32px,6vw,68px)] mb-4"
              >
                Shubham
                <span className="text-gold"> - Founder of SHUBIQ</span>
              </motion.h1>
              <motion.p
                initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-cormorant text-cream/78 leading-[1.7] max-w-[680px]"
                style={{ fontSize: "clamp(16px,1.4vw,20px)" }}
              >
                Shubham leads SHUBIQ Studio and SHUBIQ Labs, building high-performance digital platforms and productivity systems that help teams execute with clarity and speed.
              </motion.p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/shubiq-studio"
                  className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-gold/70 bg-gold text-ink px-5 py-3 hover:bg-gold-light transition-all duration-300"
                >
                  Explore Studio
                </Link>
                <Link
                  href="/shubiq-labs"
                  className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-[rgb(var(--cream-rgb)/0.25)] px-5 py-3 text-cream/80 hover:text-gold hover:border-gold transition-all duration-300"
                >
                  Explore Labs
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      <section className="py-14 sm:py-16 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Focus"
            title="Execution-First Product Leadership"
            description="Building durable systems for execution across studio client work and labs-owned products."
          />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {focusAreas.map((area) => {
              const Icon = area.icon
              return (
                <StaggerItem key={area.label}>
                  <div className="p-4 rounded-xl border border-[rgb(var(--cream-rgb)/0.14)] hover:border-gold/40 transition-all duration-300 group bg-[rgb(var(--surface-2-rgb)/0.55)]">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-ink transition-all">
                        <Icon size={16} />
                      </span>
                      <span className="font-medium text-sm text-cream/90">{area.label}</span>
                    </div>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      <section className="py-14 sm:py-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Journey"
            title="Founder Timeline"
            description="A condensed view of the SHUBIQ origin story and product ecosystem growth."
          />

          <div className="hidden md:flex items-start justify-between relative">
            <div className="absolute top-4 left-0 right-0 h-[2px] bg-[rgb(var(--cream-rgb)/0.15)]" />
            {founderTimeline.map((item, index) => (
              <ScrollReveal key={item.year} delay={index * 0.12}>
                <div className="relative text-center max-w-[210px]">
                  <div
                    className={`w-8 h-8 rounded-full border-2 mx-auto mb-4 flex items-center justify-center ${
                      item.year === currentYear
                        ? "border-gold bg-gold/10"
                        : "border-[rgb(var(--cream-rgb)/0.2)] bg-[rgb(var(--surface-2-rgb)/0.6)]"
                    }`}
                  >
                    {parseInt(item.year) < parseInt(currentYear) && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-gold">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                    {item.year === currentYear && <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />}
                  </div>
                  <span className="text-xs font-semibold text-gold mb-1 block">{item.year}</span>
                  <h3 className="font-semibold text-sm mb-1 text-cream/90">{item.title}</h3>
                  <p className="text-cream/70 text-xs leading-relaxed font-cormorant">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="md:hidden">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-[rgb(var(--cream-rgb)/0.15)]" />
              <div className="space-y-8">
                {founderTimeline.map((item, index) => (
                  <ScrollReveal key={`${item.year}-mobile`} delay={index * 0.08}>
                    <div className="flex gap-5 items-start">
                      <div className="relative z-10 shrink-0">
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                            item.year === currentYear
                              ? "border-gold bg-gold/10"
                              : "border-[rgb(var(--cream-rgb)/0.2)] bg-[rgb(var(--surface-2-rgb)/0.6)]"
                          }`}
                        >
                          {parseInt(item.year) < parseInt(currentYear) && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-gold">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                          {item.year === currentYear && <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gold mb-1 block">{item.year}</span>
                        <h3 className="font-semibold text-sm mb-1 text-cream/90">{item.title}</h3>
                        <p className="text-cream/70 text-sm leading-relaxed font-cormorant">{item.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="py-14 sm:py-16 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Quick Facts" title="Founder Snapshot" description="Key context on the SHUBIQ leadership." />
          <ScrollReveal>
            <div className="rounded-2xl border border-[rgb(var(--cream-rgb)/0.16)] overflow-hidden">
              <div className="px-6 py-4 border-b border-[rgb(var(--cream-rgb)/0.12)] bg-[rgb(var(--surface-2-rgb)/0.6)]">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-cream/60">Quick Facts</h3>
              </div>
              <div className="divide-y divide-[rgb(var(--cream-rgb)/0.12)]">
                {quickFacts.map((fact) => (
                  <div key={fact.label} className="flex items-center justify-between px-6 py-4 hover:bg-[rgb(var(--surface-2-rgb)/0.5)] transition-colors">
                    <span className="text-cream/60 text-sm">{fact.label}</span>
                    <span className="font-medium text-sm text-cream/90">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      <section className="py-14 sm:py-16 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Connect" title="Founder Links" description="Follow along across platforms." />
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {socialLinks.map((link) => (
              <StaggerItem key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-2xl border border-[rgb(var(--cream-rgb)/0.16)] bg-[rgb(var(--surface-2-rgb)/0.55)] px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_24px_50px_rgb(0_0_0_/_0.35),0_0_0_1px_rgb(var(--gold-rgb)_/_0.2)_inset]"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 20%, rgb(var(--gold-rgb) / 0.16), transparent 60%), linear-gradient(140deg, rgb(var(--gold-rgb) / 0.08), transparent 45%, transparent 75%, rgb(var(--gold-rgb) / 0.06))",
                    }}
                  />
                  <div className="relative z-10 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--cream-rgb)/0.2)] bg-[rgb(var(--cream-rgb)/0.04)] text-cream/70 group-hover:text-gold group-hover:border-gold/50 transition-colors">
                      {link.icon}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-semibold tracking-[0.18em] uppercase text-cream/90">{link.label}</span>
                      <span className="text-[11px] tracking-[0.22em] uppercase text-cream/50">View profile</span>
                    </div>
                  </div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="absolute right-4 top-4 text-cream/45 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      <section className="pb-20 sm:pb-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-3 justify-center">
          <Link
            href="/shubiq-studio"
            className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-gold/70 bg-gold text-ink px-5 py-3 hover:bg-gold-light transition-all duration-300"
          >
            Explore Studio
          </Link>
          <Link
            href="/shubiq-labs"
            className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-[rgb(var(--cream-rgb)/0.25)] px-5 py-3 text-cream/80 hover:text-gold hover:border-gold transition-all duration-300"
          >
            Explore Labs
          </Link>
        </div>
      </section>
    </main>
  )
}
