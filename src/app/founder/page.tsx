/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import GoldLine from "../components/GoldLine"
import ScrollReveal from "../components/ScrollReveal"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"

export default function FounderPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shubham",
    jobTitle: "Founder",
    worksFor: {
      "@type": "Organization",
      name: "SHUBIQ",
      url: siteUrl,
    },
    url: `${siteUrl}/founder`,
    sameAs: [
      "https://github.com/NeuralShubh",
      "https://x.com/NeuralShubh",
      "https://www.instagram.com/shubham.bnb/",
      "https://www.linkedin.com/in/neuralshubh/",
    ],
  }

  return (
    <>
      <main className="min-h-screen bg-[rgb(var(--ink-rgb))] text-cream">
        <section className="relative pt-[120px] sm:pt-[140px] pb-16 px-5 sm:px-8 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 35% 18%, rgb(var(--gold-rgb) / 0.1) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgb(var(--gold-light-rgb) / 0.08) 0%, transparent 55%)",
            }}
          />
          <div className="max-w-5xl mx-auto relative grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <ScrollReveal direction="right">
            <div>
              <div className="inline-flex items-center gap-2 border border-gold/20 bg-gold/[0.04] px-3.5 py-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/80" />
                <span className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/80">Founder</span>
              </div>
              <h1 className="font-cinzel font-black leading-[1.02] text-[clamp(32px,6vw,68px)] mb-4">
                Shubham
                <span className="text-gold"> - Founder of SHUBIQ</span>
              </h1>
              <p className="font-cormorant text-cream/78 leading-[1.7] max-w-[680px]" style={{ fontSize: "clamp(16px,1.4vw,20px)" }}>
                Shubham leads SHUBIQ Studio and SHUBIQ Labs, building high-performance digital platforms and productivity systems that help teams execute with clarity and speed.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/shubiq-studio"
                  className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-gold/70 bg-gold text-ink px-5 py-3 hover:bg-gold-light transition-all duration-300"
                >
                  Explore Studio
                </Link>
                <Link
                  href="/shubiq-labs"
                  className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-[rgb(var(--cream-rgb)/0.25)] px-5 py-3 text-cream/80 hover:text-gold hover:border-gold transition-all duration-300"
                >
                  Explore Labs
                </Link>
              </div>
            </div>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.15}>
            <div className="border border-[rgb(var(--cream-rgb)/0.16)] bg-[rgb(var(--surface-2-rgb)/0.65)] p-4 sm:p-5 rounded-sm">
              <div className="aspect-[3/4] w-full overflow-hidden border border-gold/20">
                <img
                  src="https://res.cloudinary.com/dl1jueuj3/image/upload/v1772213832/Image_ky1fkg.png"
                  alt="Shubham - Founder of SHUBIQ"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="mt-4 text-center">
                <div className="font-cinzel text-[20px] text-gold">Shubham</div>
                <div className="font-rajdhani text-[10px] tracking-[3px] uppercase text-cream/60">Founder | SHUBIQ</div>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </section>

        <GoldLine />

        <ScrollReveal delay={0.1}>
        <section className="py-14 sm:py-16 px-5 sm:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1.2fr_0.8fr] gap-6">
            <div className="border border-[rgb(var(--cream-rgb)/0.16)] bg-card-soft p-6 sm:p-8 rounded-sm">
              <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/75 mb-4">Focus</div>
              <p className="font-cormorant text-cream/78 leading-[1.7]">
                Building durable systems for execution: product strategy, engineering systems, and performance-first UX. SHUBIQ operates across Studio client work and Labs-owned products.
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-4 text-[14px] font-cormorant text-cream/70">
                {[
                  "Digital product architecture",
                  "AI-integrated workflows",
                  "Conversion-focused web systems",
                  "Ritual-first productivity tools",
                ].map((item) => (
                  <div key={item} className="border border-[rgb(var(--cream-rgb)/0.12)] bg-[rgb(var(--surface-2-rgb)/0.5)] p-3">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-[rgb(var(--cream-rgb)/0.16)] bg-[rgb(var(--surface-2-rgb)/0.6)] p-6 sm:p-8 rounded-sm">
              <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/75 mb-4">Quick Facts</div>
              <div className="space-y-4 font-cormorant text-cream/75">
                <div>
                  <div className="text-cream/55 text-[12px] uppercase tracking-[2.5px] font-rajdhani">Brand</div>
                  <div>SHUBIQ</div>
                </div>
                <div>
                  <div className="text-cream/55 text-[12px] uppercase tracking-[2.5px] font-rajdhani">Role</div>
                  <div>Founder & Product Lead</div>
                </div>
                <div>
                  <div className="text-cream/55 text-[12px] uppercase tracking-[2.5px] font-rajdhani">Focus</div>
                  <div>Execution systems, AI workflows, premium UX</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>

        <GoldLine />

        <ScrollReveal delay={0.1}>
        <section className="py-14 sm:py-16 px-5 sm:px-8">
          <div className="max-w-5xl mx-auto border border-[rgb(var(--cream-rgb)/0.16)] bg-[rgb(var(--surface-2-rgb)/0.6)] p-6 sm:p-8 rounded-sm">
            <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/75 mb-4">Founder Links</div>
            <div className="flex flex-wrap gap-3 text-[12px] font-rajdhani tracking-[2.5px] uppercase">
              {[
                { label: "X / Twitter", href: "https://x.com/NeuralShubh" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/neuralshubh/" },
                { label: "GitHub", href: "https://github.com/NeuralShubh" },
                { label: "Instagram", href: "https://www.instagram.com/shubham.bnb/" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-gold/40 px-4 py-2 text-cream/80 hover:text-gold hover:border-gold transition-all duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </section>
        </ScrollReveal>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
    </>
  )
}
