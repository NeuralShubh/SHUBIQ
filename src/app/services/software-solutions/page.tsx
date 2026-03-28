import Link from "next/link"


import GoldLine from "../../components/GoldLine"
import ScrollReveal from "../../components/ScrollReveal"

export default function SoftwareSolutionsServicePage() {
  return (
    <>

      <main className="min-h-screen bg-[rgb(var(--ink-rgb))] text-cream">
        <section className="relative pt-[120px] sm:pt-[140px] pb-12 px-5 sm:px-8 overflow-hidden">
          <div className="max-w-5xl mx-auto relative">
            <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-3">Service</div>
            <h1 className="font-cinzel font-black leading-[1.05] text-[clamp(30px,5.6vw,62px)] mb-4">
              Software Solutions
            </h1>
            <p className="font-cormorant text-cream/78 leading-[1.7]" style={{ fontSize: "clamp(16px,1.3vw,20px)" }}>
              Custom web apps, dashboards, and SaaS tools designed to solve real business problems with clean architecture and long-term stability.
            </p>
          </div>
        </section>

        <GoldLine />

        <ScrollReveal>
        <section className="py-12 sm:py-14 px-5 sm:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-6">
            <div className="space-y-5 font-cormorant text-cream/80 leading-[1.75] text-[18px]">
              <p>
                SHUBIQ builds custom software with a focus on clarity, security, and scale. We design systems that fit your operations, not generic templates.
              </p>
              <p>
                From internal dashboards to customer-facing platforms, we create stable architecture that grows with usage and evolving requirements.
              </p>
            </div>
            <div className="border border-[rgb(var(--cream-rgb)/0.14)] bg-card-soft p-6 rounded-sm">
              <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-3">Deliverables</div>
              <ul className="space-y-3 font-cormorant text-cream/75">
                <li>Custom SaaS platforms</li>
                <li>Admin dashboards & ops tools</li>
                <li>Secure role-based access</li>
                <li>API & data integration</li>
              </ul>
            </div>
          </div>
          <div className="max-w-5xl mx-auto mt-10 flex flex-wrap gap-3">
            <Link href="/shubiq-studio" className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-gold/60 px-5 py-3 text-cream hover:text-gold hover:border-gold transition-all duration-300">
              Work With Studio
            </Link>
            <Link href="/shubiq-studio#studio-contact-anchor" className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-[rgb(var(--cream-rgb)/0.25)] px-5 py-3 text-cream/80 hover:text-gold hover:border-gold transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </section>
        </ScrollReveal>
      </main>

    </>
  )
}
