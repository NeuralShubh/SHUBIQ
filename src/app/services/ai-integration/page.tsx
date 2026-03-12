import Link from "next/link"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import GoldLine from "../../components/GoldLine"

export default function AiIntegrationServicePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[rgb(var(--ink-rgb))] text-cream">
        <section className="relative pt-[120px] sm:pt-[140px] pb-12 px-5 sm:px-8 overflow-hidden">
          <div className="max-w-5xl mx-auto relative">
            <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-3">Service</div>
            <h1 className="font-cinzel font-black leading-[1.05] text-[clamp(30px,5.6vw,62px)] mb-4">
              AI Integration
            </h1>
            <p className="font-cormorant text-cream/78 leading-[1.7]" style={{ fontSize: "clamp(16px,1.3vw,20px)" }}>
              Embed intelligence into your product through automation, smart workflows, and AI-driven features that deliver measurable gains.
            </p>
          </div>
        </section>

        <GoldLine />

        <section className="py-12 sm:py-14 px-5 sm:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-6">
            <div className="space-y-5 font-cormorant text-cream/80 leading-[1.75] text-[18px]">
              <p>
                We integrate AI in a way that improves speed and decision quality without adding complexity. The focus is practical execution, not hype.
              </p>
              <p>
                From customer support to research and ops automation, SHUBIQ designs AI workflows that scale with your team.
              </p>
            </div>
            <div className="border border-[rgb(var(--cream-rgb)/0.14)] bg-card-soft p-6 rounded-sm">
              <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-3">Deliverables</div>
              <ul className="space-y-3 font-cormorant text-cream/75">
                <li>AI workflow integration</li>
                <li>Automation pipelines</li>
                <li>Data enrichment & retrieval</li>
                <li>AI feature design</li>
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
      </main>
      <Footer />
    </>
  )
}
