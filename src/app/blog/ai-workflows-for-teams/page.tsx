import Link from "next/link"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import GoldLine from "../../components/GoldLine"

export default function AiWorkflowsForTeamsPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "AI Workflows for Small Teams",
    description: "Practical AI workflows that remove manual drag and improve decision speed.",
    author: {
      "@type": "Person",
      name: "Shubham",
    },
    publisher: {
      "@type": "Organization",
      name: "SHUBIQ",
      url: "https://shubiq.com",
    },
    mainEntityOfPage: "https://shubiq.com/blog/ai-workflows-for-teams",
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[rgb(var(--ink-rgb))] text-cream">
        <section className="relative pt-[120px] sm:pt-[140px] pb-10 px-5 sm:px-8 overflow-hidden">
          <div className="max-w-4xl mx-auto relative">
            <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-3">AI Systems</div>
            <h1 className="font-cinzel font-black leading-[1.05] text-[clamp(30px,5.4vw,56px)] mb-4">
              AI Workflows for Small Teams
            </h1>
            <p className="font-cormorant text-cream/75 leading-[1.7]" style={{ fontSize: "clamp(16px,1.3vw,20px)" }}>
              Practical AI workflows that remove manual drag and improve decision speed.
            </p>
          </div>
        </section>

        <GoldLine />

        <section className="py-12 sm:py-14 px-5 sm:px-8">
          <div className="max-w-4xl mx-auto space-y-6 font-cormorant text-cream/80 leading-[1.8] text-[18px]">
            <p>
              Start with workflow bottlenecks: content drafts, QA, customer response, or research synthesis. Then automate only the repeatable parts.
            </p>
            <p>
              SHUBIQ implements AI as a force multiplier, not a replacement. The best systems keep human judgment in control and use AI for speed.
            </p>
            <p>
              When done right, AI reduces cycles and clarifies priorities without creating a new tech stack to maintain.
            </p>
          </div>
          <div className="max-w-4xl mx-auto mt-10 flex flex-wrap gap-3">
            <Link href="/shubiq-studio" className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-gold/60 px-5 py-3 text-cream hover:text-gold hover:border-gold transition-all duration-300">
              Work With Studio
            </Link>
            <Link href="/blog" className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-[rgb(var(--cream-rgb)/0.25)] px-5 py-3 text-cream/80 hover:text-gold hover:border-gold transition-all duration-300">
              Back to Blog
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </>
  )
}
