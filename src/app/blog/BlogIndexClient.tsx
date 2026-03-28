"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import ScrollReveal from "../components/ScrollReveal"
import StaggerContainer, { StaggerItem } from "../components/StaggerContainer"
import { getBlogPosts } from "./blogData"

export default function BlogIndexClient() {
  const posts = useMemo(() => getBlogPosts(), [])
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((post) => post.category)))
    return ["All", ...unique]
  }, [posts])

  const featuredPost = posts[0]
  const regularPosts = posts.slice(1)
  const filteredPosts =
    activeCategory === "All"
      ? regularPosts
      : regularPosts.filter((post) => post.category === activeCategory)

  return (
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
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 border border-gold/20 bg-gold/[0.04] px-3.5 py-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold/80" />
              <span className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/80">Blog</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h1 className="font-cinzel font-black leading-[1.02] text-[clamp(32px,6vw,64px)] mb-4">
              SHUBIQ
              <span className="text-gold"> Field Notes</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <p
              className="font-cormorant text-cream/75 leading-[1.7] max-w-[700px]"
              style={{ fontSize: "clamp(16px,1.4vw,20px)" }}
            >
              Practical insights on productivity systems, focus rituals, and AI-enabled execution.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-4 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="group relative rounded-2xl border border-[rgb(var(--cream-rgb)/0.16)] overflow-hidden hover:border-gold/40 transition-all duration-300">
                <div className="aspect-[21/9] bg-[linear-gradient(135deg,rgb(var(--gold-rgb)/0.08),rgb(var(--surface-2-rgb)/0.85),rgb(var(--gold-rgb)/0.12))] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[64px] sm:text-[90px] font-bold opacity-[0.05] select-none font-cinzel">
                      {featuredPost.category}
                    </span>
                  </div>
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium backdrop-blur-sm">
                    {featuredPost.category}
                  </span>
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[rgb(var(--surface-2-rgb)/0.6)] text-cream/70 text-xs backdrop-blur-sm">
                    {featuredPost.readingTime} min read
                  </span>
                </div>
                <div className="p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-gold transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-cream/70 text-sm md:text-base leading-relaxed mb-4 font-cormorant">
                    {featuredPost.excerpt}
                  </p>
                  <span className="text-gold text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Article
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-14 sm:py-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-gold text-ink"
                    : "border border-[rgb(var(--cream-rgb)/0.2)] text-cream/70 hover:border-gold/40 hover:text-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <StaggerItem key={post.slug}>
                    <Link href={`/blog/${post.slug}`}>
                      <div className="group rounded-xl border border-[rgb(var(--cream-rgb)/0.14)] p-6 hover:border-gold/40 hover:shadow-[0_18px_40px_rgb(0_0_0_/_0.24)] transition-all duration-300 h-full flex flex-col">
                        <span className="inline-block w-fit px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium mb-4">
                          {post.category}
                        </span>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-gold transition-colors flex-grow font-cinzel">
                          {post.title}
                        </h3>
                        <p className="text-cream/70 text-sm leading-relaxed mb-4 font-cormorant">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-cream/60 mt-auto pt-4 border-t border-[rgb(var(--cream-rgb)/0.12)]">
                          <span>{post.date}</span>
                          <span>{post.readingTime} min read</span>
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}

