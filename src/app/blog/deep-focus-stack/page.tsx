import Link from "next/link"


import GoldLine from "../../components/GoldLine"

export default function DeepFocusStackPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Deep Focus Stack: Rituals That Actually Work",
    description: "A lightweight focus ritual used inside SHUBIQ to ship faster without sacrificing quality.",
    author: {
      "@type": "Person",
      name: "Shubham",
    },
    publisher: {
      "@type": "Organization",
      name: "SHUBIQ",
      url: "https://shubiq.com",
    },
    mainEntityOfPage: "https://shubiq.com/blog/deep-focus-stack",
  }

  return (
    <>

      <main className="min-h-screen bg-[rgb(var(--ink-rgb))] text-cream">
        <section className="relative pt-[120px] sm:pt-[140px] pb-10 px-5 sm:px-8 overflow-hidden">
          <div className="max-w-4xl mx-auto relative">
            <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-3">Focus</div>
            <h1 className="font-cinzel font-black leading-[1.05] text-[clamp(30px,5.4vw,56px)] mb-4">
              The Deep Focus Stack: Rituals That Actually Work
            </h1>
            <p className="font-cormorant text-cream/75 leading-[1.7]" style={{ fontSize: "clamp(16px,1.3vw,20px)" }}>
              A lightweight focus ritual used inside SHUBIQ to ship faster without sacrificing quality.
            </p>
          </div>
        </section>

        <GoldLine />

        <section className="py-12 sm:py-14 px-5 sm:px-8">
          <div className="max-w-4xl mx-auto space-y-6 font-cormorant text-cream/80 leading-[1.8] text-[18px]">
            <p>
              Deep focus is not a mood-it is a system. Start with a daily 90-minute block, a clear input list, and a shutdown ritual to preserve energy.
            </p>
            <p>
              Pair focus blocks with a short review: what shipped, what blocked, and what needs to be redesigned. This closes the loop and keeps execution clean.
            </p>
            <p>
              SHUBIQ Labs bakes this into product rituals so that teams can sustain velocity without burnout.
            </p>
          </div>
          <div className="max-w-4xl mx-auto mt-10 flex flex-wrap gap-3">
            <Link href="/shubiq-labs/shubiq-flow" className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-gold/60 px-5 py-3 text-cream hover:text-gold hover:border-gold transition-all duration-300">
              Explore SHUBIQ Flow
            </Link>
            <Link href="/founder" className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-[rgb(var(--cream-rgb)/0.25)] px-5 py-3 text-cream/80 hover:text-gold hover:border-gold transition-all duration-300">
              Meet the Founder
            </Link>
          </div>
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </>
  )
}
