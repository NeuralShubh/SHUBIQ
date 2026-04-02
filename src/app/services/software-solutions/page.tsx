import type { Metadata } from "next"
import Link from "next/link"

import GoldLine from "../../components/GoldLine"
import ScrollReveal from "../../components/ScrollReveal"
import ProcessTimeline from "../../components/ProcessTimeline"
import FAQ from "../../components/FAQ"
import PricingTeaser from "../../components/PricingTeaser"
import BackLink from "../../components/BackLink"

const deliverables = [
  "Custom dashboards and admin panels",
  "SaaS platforms and internal tools",
  "Secure role-based access control",
  "API integrations and data pipelines",
  "Scalable database architecture",
  "Documentation and team training",
]

const softwareProcess = [
  {
    number: "01",
    title: "Problem Definition",
    description: "We map operational bottlenecks and define what the software needs to solve, not what it could theoretically do.",
  },
  {
    number: "02",
    title: "System Architecture",
    description: "Database design, API structure, access control, and integration points are defined before development begins.",
  },
  {
    number: "03",
    title: "Core Build",
    description: "Focused development of core product logic with clean architecture that supports future changes and scaling.",
  },
  {
    number: "04",
    title: "Integration and Testing",
    description: "Connect to your existing tools, run security audits, and stress-test under realistic conditions.",
  },
  {
    number: "05",
    title: "Deploy and Evolve",
    description: "Production deployment with documentation, training, and a clear plan for iteration as your needs grow.",
  },
]

const softwareFAQ = [
  {
    question: "What kind of software do you build?",
    answer: "Custom dashboards, SaaS platforms, internal tools, CRMs, admin panels, and data-driven applications. If it solves a business problem with software, we build it.",
  },
  {
    question: "How do you handle data security?",
    answer: "Role-based access control, encrypted storage, secure API design, and compliance with standard security practices. We architect security into the system, not bolt it on afterward.",
  },
  {
    question: "Can you integrate with our existing tools?",
    answer: "Yes. We build API integrations with any service that has an API, including CRMs, payment gateways, ERPs, communication tools, and custom databases.",
  },
  {
    question: "What if our requirements change mid-project?",
    answer: "We build with clean architecture to accommodate changes. Sprint-based development means we can adjust priorities every 1 to 2 weeks without derailing the project.",
  },
]

export const metadata: Metadata = {
  title: "Software Solutions",
  description: "Custom software platforms and internal tools engineered for scale, security, and operational clarity.",
}


export default function SoftwareSolutionsServicePage() {
  return (
    <main className="min-h-screen bg-[rgb(var(--ink-rgb))] text-cream">
      <section className="relative pt-[120px] sm:pt-[140px] pb-12 px-5 sm:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto relative">
          <BackLink href="/shubiq-studio#studio-services-anchor" label="Back to Studio" className="mb-6" />
          <ScrollReveal>
            <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-3">Service</div>
            <h1 className="font-cinzel font-black leading-[1.05] text-[clamp(30px,5.6vw,62px)] mb-4">Software Solutions</h1>
            <p className="font-cormorant text-cream/78 leading-[1.7]" style={{ fontSize: "clamp(16px,1.3vw,20px)" }}>
              Custom web apps, dashboards, and internal tools engineered for stability, clarity, and long-term scale.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <GoldLine />

      <section className="py-12 sm:py-14 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="space-y-5 font-cormorant text-cream/80 leading-[1.75] text-[18px]">
            <p>
              We build operational systems that remove friction, connect teams, and create a single source of truth. Every build is designed around your real workflows.
            </p>
            <p>
              From clean architecture to polished UX, we focus on durability, security, and flexibility so your software keeps working as you grow.
            </p>
            <p>
              You receive a structured delivery roadmap, transparent sprint updates, and documentation so your team can operate and scale confidently.
            </p>
            <div className="pt-1">
              <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-2">What You Get</div>
              <ul className="space-y-2 text-[15px] text-cream/70">
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span>Single source of truth across teams</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span>Automations that remove manual steps</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span>Secure roles and audit-ready data</li>
              </ul>
            </div>
          </div>
          <div className="border border-[rgb(var(--cream-rgb)/0.14)] bg-card-soft p-6 rounded-sm">
            <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-4">Deliverables</div>
            <div className="grid grid-cols-1 gap-3">
              {deliverables.map((item, i) => (
                <ScrollReveal key={item} delay={i * 0.04}>
                  <div className="flex items-start gap-3 p-4 rounded-sm border border-[rgb(var(--cream-rgb)/0.16)] bg-[rgb(var(--cream-rgb)/0.02)] hover:border-gold/30 transition-colors">
                    <span className="text-gold mt-1 shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="text-sm text-cream/80 font-cormorant">{item}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-3">How We Work</div>
            <h2 className="font-cinzel text-[clamp(24px,4vw,40px)] text-cream mb-6">Process Timeline</h2>
          </ScrollReveal>
          <ProcessTimeline steps={softwareProcess} />
        </div>
      </section>

      <section className="py-10 sm:py-12 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-3">FAQ</div>
            <h2 className="font-cinzel text-[clamp(24px,4vw,40px)] text-cream mb-6">Frequently Asked Questions</h2>
          </ScrollReveal>
          <FAQ items={softwareFAQ} />
        </div>
      </section>

      <section className="py-10 sm:py-12 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <PricingTeaser startingPrice="₹39,999" note="Custom scope • Detailed proposal within 24hrs" />
        </div>
      </section>

      <section className="py-10 sm:py-12 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-3">
          <Link href="/shubiq-studio" className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-gold/60 px-5 py-3 text-cream hover:text-gold hover:border-gold transition-all duration-300">
            Work With Studio
          </Link>
          <Link href="/shubiq-studio#studio-contact-anchor" className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-[rgb(var(--cream-rgb)/0.25)] px-5 py-3 text-cream/80 hover:text-gold hover:border-gold transition-all duration-300">
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  )
}
