import type { Metadata } from "next"
import Link from "next/link"

import GoldLine from "../../components/GoldLine"
import ScrollReveal from "../../components/ScrollReveal"
import ProcessTimeline from "../../components/ProcessTimeline"
import FAQ from "../../components/FAQ"
import PricingTeaser from "../../components/PricingTeaser"

const deliverables = [
  "Marketing sites and landing systems",
  "Web apps and admin dashboards",
  "Performance optimization and audits",
  "Analytics and conversion tuning",
  "SEO-ready technical foundations",
  "Responsive, accessible UI build",
]

const webDevProcess = [
  {
    number: "01",
    title: "Discovery and Strategy",
    description: "We study your market, audience, and goals to define a technical strategy that drives results, not just features.",
  },
  {
    number: "02",
    title: "Architecture and Design",
    description: "Component systems, page structures, and performance budgets are planned before a single line of code is written.",
  },
  {
    number: "03",
    title: "Build and Iterate",
    description: "Development in focused sprints with weekly demos. You see progress, give feedback, and we adjust in real time.",
  },
  {
    number: "04",
    title: "Test and Optimize",
    description: "Performance audits, cross-browser testing, SEO verification, and conversion optimization before launch.",
  },
  {
    number: "05",
    title: "Launch and Support",
    description: "Deployed to production with monitoring, analytics, and ongoing support to ensure long-term stability.",
  },
]

const webDevFAQ = [
  {
    question: "How long does a typical website project take?",
    answer: "Most projects take 2 to 6 weeks depending on scope. A focused landing page can be ready in 5 to 7 days, while a full web app takes 4 to 8 weeks. We provide a detailed timeline after the discovery call.",
  },
  {
    question: "What technologies do you use?",
    answer: "Our primary stack is Next.js, React, TypeScript, and Tailwind CSS with Supabase or custom backends. We choose tools based on your specific needs, not personal preference.",
  },
  {
    question: "Do you handle hosting and deployment?",
    answer: "Yes. We deploy to Vercel, AWS, or your preferred platform with CI/CD pipelines, monitoring, and automated backups configured from day one.",
  },
  {
    question: "What does ongoing support include?",
    answer: "Post-launch support includes bug fixes, performance monitoring, security updates, and minor feature additions. Plans range from 1 to 6 months included depending on your package.",
  },
  {
    question: "Can you redesign an existing site?",
    answer: "Absolutely. We can redesign and rebuild from scratch, or incrementally modernize your existing site depending on timeline and budget.",
  },
]

export const metadata: Metadata = {
  title: "Web Development",
  description: "High-performance, conversion-focused websites and web apps built with modern stacks. Fast, scalable, and engineered for clarity.",
}


export default function WebDevelopmentServicePage() {
  return (
    <main className="min-h-screen bg-[rgb(var(--ink-rgb))] text-cream">
      <section className="relative pt-[120px] sm:pt-[140px] pb-12 px-5 sm:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto relative">
          <ScrollReveal>
            <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-3">Service</div>
            <h1 className="font-cinzel font-black leading-[1.05] text-[clamp(30px,5.6vw,62px)] mb-4">Web Development</h1>
            <p className="font-cormorant text-cream/78 leading-[1.7]" style={{ fontSize: "clamp(16px,1.3vw,20px)" }}>
              High-performance, conversion-focused websites and web apps built with modern stacks. Fast, scalable, and engineered for clarity.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <GoldLine />

      <section className="py-12 sm:py-14 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="space-y-5 font-cormorant text-cream/80 leading-[1.75] text-[18px]">
            <p>
              SHUBIQ builds websites and web apps that load fast, convert visitors, and scale with your business. We pair premium design with clean engineering to create a polished product experience.
            </p>
            <p>
              Our process includes performance budgets, conversion-first UX, and production-grade deployment so your site stays fast and stable long term.
            </p>
            <p>
              You get a dedicated build lead, clear weekly milestones, and a delivery plan that aligns with launch goals, not vanity features.
            </p>
            <div className="pt-1">
              <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-2">What You Get</div>
              <ul className="space-y-2 text-[15px] text-cream/70">
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span>Performance budget + Lighthouse targets</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span>Conversion-ready IA and CTA hierarchy</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span>Clean handoff docs + launch checklist</li>
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
          <ProcessTimeline steps={webDevProcess} />
        </div>
      </section>

      <section className="py-10 sm:py-12 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-3">FAQ</div>
            <h2 className="font-cinzel text-[clamp(24px,4vw,40px)] text-cream mb-6">Frequently Asked Questions</h2>
          </ScrollReveal>
          <FAQ items={webDevFAQ} />
        </div>
      </section>

      <section className="py-10 sm:py-12 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <PricingTeaser startingPrice="₹19,999" note="One-time • 5-21 day delivery" />
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
import BackLink from "../../components/BackLink"
            <BackLink href="/#services" label="Back to Services" className="mb-6" />
