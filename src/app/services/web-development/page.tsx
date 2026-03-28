import Link from "next/link"


import GoldLine from "../../components/GoldLine"
import ScrollReveal from "../../components/ScrollReveal"

export default function WebDevelopmentServicePage() {
  return (
    <>

      <main className="min-h-screen bg-[rgb(var(--ink-rgb))] text-cream">
        <section className="relative pt-[120px] sm:pt-[140px] pb-12 px-5 sm:px-8 overflow-hidden">
          <div className="max-w-5xl mx-auto relative">
            <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-3">Service</div>
            <h1 className="font-cinzel font-black leading-[1.05] text-[clamp(30px,5.6vw,62px)] mb-4">
              Web Development
            </h1>
            <p className="font-cormorant text-cream/78 leading-[1.7]" style={{ fontSize: "clamp(16px,1.3vw,20px)" }}>
              High-performance, conversion-focused websites and web apps built with modern stacks. Fast, scalable, and engineered for clarity.
            </p>
          </div>
        </section>

        <GoldLine />

        <ScrollReveal>
        <section className="py-12 sm:py-14 px-5 sm:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-6">
            <div className="space-y-5 font-cormorant text-cream/80 leading-[1.75] text-[18px]">
              <p>
                SHUBIQ builds websites and web apps that load fast, convert visitors, and scale with your business. We pair premium design with clean engineering to create a polished product experience.
              </p>
              <p>
                Our process includes performance budgets, conversion-first UX, and production-grade deployment so your site stays fast and stable long term.
              </p>
            </div>
            <div className="border border-[rgb(var(--cream-rgb)/0.14)] bg-card-soft p-6 rounded-sm">
              <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-3">Deliverables</div>
              <ul className="space-y-3 font-cormorant text-cream/75">
                <li>Marketing sites & landing systems</li>
                <li>Web apps & dashboards</li>
                <li>Performance optimization</li>
                <li>Analytics & conversion tuning</li>
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
