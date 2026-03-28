"use client"
import Link from "next/link"
import GoldLine from "../components/GoldLine"
import StaggerContainer, { StaggerItem } from "../components/StaggerContainer"

const POSTS = [
  {
    slug: "productivity-system-2026",
    title: "How to Build a Productivity System in 2026",
    desc: "A practical, no-fluff system for tasks, habits, and focus that scales with your life and team.",
    tag: "Productivity",
  },
  {
    slug: "deep-focus-stack",
    title: "The Deep Focus Stack: Rituals That Actually Work",
    desc: "A simple focus framework SHUBIQ uses to ship faster and maintain quality under pressure.",
    tag: "Focus",
  },
  {
    slug: "ai-workflows-for-teams",
    title: "AI Workflows for Small Teams",
    desc: "How to integrate AI into daily execution without adding chaos or overhead.",
    tag: "AI Systems",
  },
]

export default function BlogIndexPage() {
  return (
    <>
      <main className="min-h-screen bg-[rgb(var(--ink-rgb))] text-cream">
        <section className="relative pt-[120px] sm:pt-[140px] pb-14 px-5 sm:px-8 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 40% 20%, rgb(var(--gold-rgb) / 0.08) 0%, transparent 55%), radial-gradient(ellipse at 75% 10%, rgb(var(--gold-light-rgb) / 0.06) 0%, transparent 52%)",
            }}
          />
          <div className="max-w-6xl mx-auto relative">
            <div className="inline-flex items-center gap-2 border border-gold/20 bg-gold/[0.04] px-3.5 py-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold/80" />
              <span className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/80">Blog</span>
            </div>
            <h1 className="font-cinzel font-black leading-[1.02] text-[clamp(32px,6vw,64px)] mb-4">
              SHUBIQ
              <span className="text-gold"> Field Notes</span>
            </h1>
            <p className="font-cormorant text-cream/75 leading-[1.7] max-w-[700px]" style={{ fontSize: "clamp(16px,1.4vw,20px)" }}>
              Practical insights on productivity systems, focus rituals, and AI-enabled execution.
            </p>
          </div>
        </section>

        <GoldLine />

        <section className="py-14 sm:py-16 px-5 sm:px-8">
          <StaggerContainer staggerDelay={0.12} className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            {POSTS.map((post) => (
              <StaggerItem key={post.slug}>
                <article className="border border-[rgb(var(--cream-rgb)/0.14)] bg-card-soft p-6 sm:p-7 rounded-sm hover:border-gold/28 hover:shadow-[0_0_0_1px_rgb(var(--gold-rgb)_/_0.12)_inset] transition-all duration-300">
                  <div className="font-rajdhani text-[10px] tracking-[3px] uppercase text-gold/70">{post.tag}</div>
                  <h2 className="font-cinzel text-[22px] text-cream/90 mt-3 mb-3">{post.title}</h2>
                  <p className="font-cormorant text-cream/72 leading-[1.6] mb-5">{post.desc}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-gold/60 px-5 py-3 text-cream hover:text-gold hover:border-gold transition-all duration-300"
                  >
                    Read Article
                  </Link>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </main>
    </>
  )
}
