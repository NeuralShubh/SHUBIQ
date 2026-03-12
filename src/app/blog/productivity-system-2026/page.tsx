import Link from "next/link"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import GoldLine from "../../components/GoldLine"

export default function ProductivitySystem2026Page() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Build a Productivity System in 2026",
    description: "A practical, no-fluff system for tasks, habits, and focus that scales with your life and team.",
    author: {
      "@type": "Person",
      name: "Shubham",
    },
    publisher: {
      "@type": "Organization",
      name: "SHUBIQ",
      url: "https://shubiq.com",
    },
    mainEntityOfPage: "https://shubiq.com/blog/productivity-system-2026",
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[rgb(var(--ink-rgb))] text-cream">
        <section className="relative pt-[120px] sm:pt-[140px] pb-10 px-5 sm:px-8 overflow-hidden">
          <div className="max-w-4xl mx-auto relative">
            <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-3">Productivity</div>
            <h1 className="font-cinzel font-black leading-[1.05] text-[clamp(30px,5.4vw,56px)] mb-4">
              How to Build a Productivity System in 2026
            </h1>
            <p className="font-cormorant text-cream/75 leading-[1.7]" style={{ fontSize: "clamp(16px,1.3vw,20px)" }}>
              A practical, no-fluff system for tasks, habits, and focus that scales with your life and team.
            </p>
          </div>
        </section>

        <GoldLine />

        <section className="py-12 sm:py-14 px-5 sm:px-8">
          <div className="max-w-4xl mx-auto space-y-6 font-cormorant text-cream/80 leading-[1.8] text-[18px]">
            <p>
              A real productivity system does three things: captures tasks reliably, turns actions into habits, and protects deep focus. If any one of those fails, execution breaks.
            </p>
            <p>
              Start with a single source of truth for tasks, a weekly review ritual, and a focus block you defend daily. Then layer habit tracking and performance metrics.
            </p>
            <p>
              SHUBIQ Labs designs systems like this to be lightweight and premium-low friction, high clarity, and resilient under pressure.
            </p>
          </div>
          <div className="max-w-4xl mx-auto mt-10 flex flex-wrap gap-3">
            <Link href="/shubiq-labs" className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-gold/60 px-5 py-3 text-cream hover:text-gold hover:border-gold transition-all duration-300">
              Explore SHUBIQ Labs
            </Link>
            <Link href="/shubiq-studio" className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-[rgb(var(--cream-rgb)/0.25)] px-5 py-3 text-cream/80 hover:text-gold hover:border-gold transition-all duration-300">
              Build With Studio
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </>
  )
}
