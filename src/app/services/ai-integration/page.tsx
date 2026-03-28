import Link from "next/link"

import GoldLine from "../../components/GoldLine"
import ScrollReveal from "../../components/ScrollReveal"
import ProcessTimeline from "../../components/ProcessTimeline"
import FAQ from "../../components/FAQ"
import PricingTeaser from "../../components/PricingTeaser"

const deliverables = [
  "AI strategy and use case mapping",
  "Automation workflows and pipelines",
  "LLM integrations and prompt systems",
  "Data cleanup and transformation",
  "Monitoring dashboards and alerts",
  "Cost optimization and safety checks",
]

const aiProcess = [
  {
    number: "01",
    title: "Use Case Assessment",
    description: "We identify where AI creates real value in your workflow, not where it only sounds impressive.",
  },
  {
    number: "02",
    title: "Data and Pipeline Design",
    description: "Map data sources, clean inputs, and design the processing pipeline that feeds your AI systems.",
  },
  {
    number: "03",
    title: "Model Selection and Integration",
    description: "Choose the right AI approach and integrate it into your product in a reliable, maintainable way.",
  },
  {
    number: "04",
    title: "Testing and Calibration",
    description: "Evaluate accuracy, edge cases, and failure modes. Tune until the system performs reliably in production.",
  },
  {
    number: "05",
    title: "Monitor and Improve",
    description: "Deploy with monitoring dashboards and feedback loops that continuously improve AI performance over time.",
  },
]

const aiFAQ = [
  {
    question: "Do we need a lot of data to use AI?",
    answer: "Not always. Many AI integrations use pre-trained models that work immediately. Custom-trained models need data, and we help you assess what is realistic.",
  },
  {
    question: "What types of AI do you implement?",
    answer: "LLM-powered features, automation pipelines, classification systems, recommendation engines, and smart search. We pick the approach that fits your problem.",
  },
  {
    question: "How do you measure AI effectiveness?",
    answer: "We define success metrics before building and ship every AI feature with monitoring to track real performance.",
  },
  {
    question: "Is AI integration expensive to maintain?",
    answer: "It depends on usage volume. We design systems that optimize API costs, use caching where possible, and provide dashboards to monitor spend.",
  },
]

export default function AiIntegrationServicePage() {
  return (
    <main className="min-h-screen bg-[rgb(var(--ink-rgb))] text-cream">
      <section className="relative pt-[120px] sm:pt-[140px] pb-12 px-5 sm:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto relative">
          <ScrollReveal>
            <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-3">Service</div>
            <h1 className="font-cinzel font-black leading-[1.05] text-[clamp(30px,5.6vw,62px)] mb-4">AI Integration</h1>
            <p className="font-cormorant text-cream/78 leading-[1.7]" style={{ fontSize: "clamp(16px,1.3vw,20px)" }}>
              Embed intelligence into your products with AI systems that save time, reduce cost, and improve decision-making.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <GoldLine />

      <section className="py-12 sm:py-14 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="space-y-5 font-cormorant text-cream/80 leading-[1.75] text-[18px]">
            <p>
              We design AI systems that integrate cleanly into your workflow and deliver measurable outcomes. From automation to smart features, we keep it practical and production-ready.
            </p>
            <p>
              Every integration includes monitoring, cost optimization, and safety checks so AI becomes a reliable part of your stack.
            </p>
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
          <ProcessTimeline steps={aiProcess} />
        </div>
      </section>

      <section className="py-10 sm:py-12 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-3">FAQ</div>
            <h2 className="font-cinzel text-[clamp(24px,4vw,40px)] text-cream mb-6">Frequently Asked Questions</h2>
          </ScrollReveal>
          <FAQ items={aiFAQ} />
        </div>
      </section>

      <section className="py-10 sm:py-12 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <PricingTeaser startingPrice="₹39,999" note="Scope-dependent • Free consultation" />
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
