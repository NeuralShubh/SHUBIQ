"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion"
import ScrollReveal from "../components/ScrollReveal"
import { BlogBlock, BlogPost, getBlogPosts } from "./blogData"

function renderBlock(block: BlogBlock, index: number) {
  switch (block.type) {
    case "h2":
      return <h2 key={index}>{block.content}</h2>
    case "h3":
      return <h3 key={index}>{block.content}</h3>
    case "blockquote":
      return <blockquote key={index}>{block.content}</blockquote>
    case "pullquote":
      return (
        <div key={index} className="pull-quote">
          {block.content}
        </div>
      )
    case "ul":
      return (
        <ul key={index}>
          {block.content.map((item, itemIndex) => (
            <li key={`${item}-${itemIndex}`}>{item}</li>
          ))}
        </ul>
      )
    case "ol":
      return (
        <ol key={index}>
          {block.content.map((item, itemIndex) => (
            <li key={`${item}-${itemIndex}`}>{item}</li>
          ))}
        </ol>
      )
    default:
      return <p key={index}>{block.content}</p>
  }
}

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false)
  const url = `https://shubiq.com/blog/${slug}`
  const shareLinks = [
    {
      label: "X / Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4 4l7.5 8.5L4 20h3.5l5-5.5L17.5 20H20l-7.8-8.8L20 4h-3.5l-4.5 5L7.5 4H4z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.7-1.2 2.4-2.5 5-2.5 5.3 0 6.3 3.5 6.3 8v8.3h-5V16c0-1.9 0-4.3-2.6-4.3-2.6 0-3 2-3 4.2v8.1h-5V8z" />
        </svg>
      ),
    },
    {
      label: "Copy Link",
      action: async () => {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <rect x="2" y="2" width="13" height="13" rx="2" />
        </svg>
      ),
    },
  ]

  return (
    <div className="flex items-center gap-3 pt-8 mt-8 border-t border-[rgb(var(--cream-rgb)/0.12)]">
      <span className="text-sm text-cream/60">Share this article</span>
      {shareLinks.map((link) => (
        <motion.a
          key={link.label}
          href={link.url ?? "#"}
          onClick={
            link.action
              ? (e) => {
                  e.preventDefault()
                  link.action?.()
                }
              : undefined
          }
          target={link.url ? "_blank" : undefined}
          rel={link.url ? "noopener noreferrer" : undefined}
          className="w-9 h-9 rounded-lg border border-[rgb(var(--cream-rgb)/0.2)] flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold/40 transition-all"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label={link.label}
        >
          {link.icon}
        </motion.a>
      ))}
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-gold"
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const prefersReduced = useReducedMotion()
  const articleRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  })

  const relatedPosts = useMemo(() => {
    const all = getBlogPosts().filter((item) => item.slug !== post.slug)
    const sameCategory = all.filter((item) => item.category === post.category)
    const others = all.filter((item) => item.category !== post.category)
    return [...sameCategory, ...others].slice(0, 2)
  }, [post.slug, post.category])

  return (
    <main className="section-rhythm min-h-screen bg-[rgb(var(--ink-rgb))] text-cream">
      {!prefersReduced && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
          style={{ scaleX: scrollYProgress, backgroundColor: "rgb(var(--gold-rgb))" }}
        />
      )}

      <article ref={articleRef} className="pt-[120px] sm:pt-[140px] pb-16 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-6 flex-wrap"
          >
            <Link href="/blog" className="text-cream/60 hover:text-gold text-sm transition-colors">
              ← Back to Blog
            </Link>
            <span className="text-cream/30">|</span>
            <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium">
              {post.category}
            </span>
            <span className="text-cream/60 text-xs">{post.readingTime} min read</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 font-cinzel"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4 mb-8 pb-8 border-b border-[rgb(var(--cream-rgb)/0.12)]"
          >
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-semibold text-sm">
              {(post.author ?? "S").slice(0, 1)}
            </div>
            <div>
              <p className="font-medium text-sm">{post.author ?? "Shubham"}</p>
              <p className="text-cream/60 text-xs">{post.date}</p>
            </div>
          </motion.div>

          <div className="blog-prose">
            {post.content.map((block, index) => renderBlock(block, index))}
          </div>

          <ShareButtons title={post.title} slug={post.slug} />

          <ScrollReveal>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-[rgb(var(--surface-2-rgb)/0.55)] border border-[rgb(var(--cream-rgb)/0.16)] mt-10">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold shrink-0">
                S
              </div>
              <div>
                <p className="font-semibold text-sm">Shubham</p>
                <p className="text-cream/60 text-xs mb-2">Founder, SHUBIQ</p>
                <p className="text-cream/70 text-sm leading-relaxed font-cormorant">
                  Building high-performance digital platforms and productivity systems at SHUBIQ.
                </p>
                <Link href="/founder" className="text-gold text-xs font-medium mt-2 inline-block hover:underline">
                  Learn more →
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mt-16 pt-12 border-t border-[rgb(var(--cream-rgb)/0.12)]">
              <h2 className="text-xl font-bold mb-6 font-cinzel">More from SHUBIQ</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((related) => (
                  <Link key={related.slug} href={`/blog/${related.slug}`}>
                    <div className="group rounded-xl border border-[rgb(var(--cream-rgb)/0.14)] p-5 hover:border-gold/40 transition-all duration-300">
                      <span className="text-xs text-gold font-medium">{related.category}</span>
                      <h3 className="font-semibold mt-1 mb-2 group-hover:text-gold transition-colors font-cinzel">
                        {related.title}
                      </h3>
                      <span className="text-cream/60 text-xs">{related.readingTime} min read</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </ScrollReveal>
        </div>
      </article>
    </main>
  )
}
