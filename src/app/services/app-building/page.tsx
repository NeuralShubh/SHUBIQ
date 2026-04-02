import type { Metadata } from "next"
import Link from "next/link"

import GoldLine from "../../components/GoldLine"
import ScrollReveal from "../../components/ScrollReveal"
import ProcessTimeline from "../../components/ProcessTimeline"
import FAQ from "../../components/FAQ"
import PricingTeaser from "../../components/PricingTeaser"
import BackLink from "../../components/BackLink"

const deliverables = [
  "MVP scoping and product definition",
  "React Native or Expo builds",
  "Authentication and data sync",
  "App store submission support",
  "Analytics and growth instrumentation",
  "Maintenance and iteration roadmap",
]

const appProcess = [
  {
    number: "01",
    title: "Product Scoping",
    description: "Define the MVP by prioritizing the features that validate your core idea fastest.",
  },
  {
    number: "02",
    title: "UX and Architecture",
    description: "User flows, wireframes, and technical architecture are designed together to ensure great experience and clean code.",
  },
  {
    number: "03",
    title: "Development Sprints",
    description: "Iterative builds with regular demos. Each sprint delivers working features you can test and refine.",
  },
  {
    number: "04",
    title: "QA and Performance",
    description: "Cross-device testing, performance optimization, and bug fixing to production-grade standards.",
  },
  {
    number: "05",
    title: "Launch and Iterate",
    description: "Ship to production or app store. Post-launch analytics drive the next round of improvements.",
  },
]

const appFAQ = [
  {
    question: "Do you build native or cross-platform apps?",
    answer: "Primarily cross-platform using React Native or Expo, which gives you iOS and Android from one codebase. Native development is available when performance demands it.",
  },
  {
    question: "What does an MVP typically include?",
    answer: "Core user flows, authentication, a clean UI, basic analytics, and deployment to TestFlight or Play Store beta. We strip everything non-essential to get you to market faster.",
  },
  {
    question: "How much does an app cost?",
    answer: "MVPs typically start at our Standard or Premium tier. Full-featured apps with backends are custom-quoted after we understand your scope.",
  },
  {
    question: "Do you handle app store submission?",
    answer: "Yes. We handle the full submission process for both Apple App Store and Google Play Store, including screenshots, descriptions, and compliance requirements.",
  },
]

export const metadata: Metadata = {
  title: "App Building",
  description: "Cross-platform mobile apps engineered for execution, performance, and long-term scalability.",
}


export default function AppBuildingServicePage() {
  return (
    <main className="section-rhythm min-h-screen bg-[rgb(var(--ink-rgb))] text-cream">
      <section className="relative pt-[120px] sm:pt-[140px] pb-12 px-5 sm:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto relative">
          <BackLink href="/shubiq-studio#studio-services-anchor" label="Back to Studio" className="mb-6" />
          <ScrollReveal>
            <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-3">Service</div>
            <h1 className="font-cinzel font-black leading-[1.05] text-[clamp(30px,5.6vw,62px)] mb-4">App Building</h1>
            <p className="font-cormorant text-cream/78 leading-[1.7]" style={{ fontSize: "clamp(16px,1.3vw,20px)" }}>
              From idea to launch, we build scalable mobile apps with clean architecture, polished UX, and production-grade performance.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <GoldLine />

      <section className="py-12 sm:py-14 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="space-y-5 font-cormorant text-cream/80 leading-[1.75] text-[18px]">
            <p>
              We design apps that feel premium, run fast, and remain maintainable. Every decision is scoped to maximize time-to-market without compromising quality.
            </p>
            <p>
              Our delivery model keeps you involved at every sprint, so the end product reflects your vision and real user needs.
            </p>
            <p>
              You get a build plan that prioritizes launch readiness, a refined UX baseline, and analytics to guide the next sprint.
            </p>
            <div className="pt-1">
              <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-2">What You Get</div>
              <ul className="space-y-2 text-[15px] text-cream/70">
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span>Polished UX flows and interaction details</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span>Crash-free baseline + store readiness</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span>Analytics to guide the next sprint</li>
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
          <ProcessTimeline steps={appProcess} />
        </div>
      </section>

      <section className="py-10 sm:py-12 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-3">FAQ</div>
            <h2 className="font-cinzel text-[clamp(24px,4vw,40px)] text-cream mb-6">Frequently Asked Questions</h2>
          </ScrollReveal>
          <FAQ items={appFAQ} />
        </div>
      </section>

      <section className="py-10 sm:py-12 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <PricingTeaser startingPrice="₹39,999" note="MVP to production • Sprint-based delivery" />
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
