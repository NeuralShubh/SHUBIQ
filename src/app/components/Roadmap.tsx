"use client"

import { motion, useReducedMotion } from "framer-motion"
import ScrollReveal from "./ScrollReveal"

export interface RoadmapItem {
  quarter: string
  title: string
  description: string
  status: "completed" | "current" | "upcoming"
  product?: string
}

export default function Roadmap({ items }: { items: RoadmapItem[] }) {
  const prefersReduced = useReducedMotion()

  return (
    <section>
      <ScrollReveal>
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-cream/60 mb-2 font-rajdhani">Roadmap</p>
          <h2 className="text-2xl md:text-3xl font-cinzel text-cream">Product Roadmap</h2>
          <p className="text-cream/70 font-cormorant mt-2">
            From concept to launch, the SHUBIQ Labs timeline.
          </p>
        </div>
      </ScrollReveal>

      <div className="relative">
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-[2px] bg-[rgb(var(--cream-rgb)/0.12)]" />
        <div className="space-y-8">
          {items.map((item, index) => (
            <ScrollReveal key={`${item.quarter}-${item.title}`} delay={index * 0.08}>
              <div className="flex gap-5 md:gap-8 items-start">
                <div className="relative z-10 shrink-0">
                  <motion.div
                    className={`w-8 h-8 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center ${
                      item.status === "completed"
                        ? "bg-emerald-500/10 border-emerald-400"
                        : item.status === "current"
                          ? "bg-gold/10 border-gold"
                          : "bg-[rgb(var(--surface-2-rgb)/0.7)] border-[rgb(var(--cream-rgb)/0.2)]"
                    }`}
                    whileInView={prefersReduced ? undefined : { scale: [0.85, 1.05, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                  >
                    {item.status === "completed" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-400">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                    {item.status === "current" && (
                      <span className="w-3 h-3 rounded-full bg-gold animate-pulse" />
                    )}
                    {item.status === "upcoming" && (
                      <span className="w-2 h-2 rounded-full bg-[rgb(var(--cream-rgb)/0.4)]" />
                    )}
                  </motion.div>
                </div>
                <div className={`pb-2 ${item.status === "upcoming" ? "opacity-70" : ""}`}>
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="text-xs font-medium text-cream/55 uppercase tracking-wider">{item.quarter}</span>
                    {item.product && (
                      <span className="text-xs px-2 py-0.5 rounded-full border border-[rgb(var(--cream-rgb)/0.2)] text-cream/70">
                        {item.product}
                      </span>
                    )}
                    {item.status === "current" && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold font-medium">Now</span>
                    )}
                  </div>
                  <h3 className="font-cinzel text-base md:text-lg text-cream mb-1">{item.title}</h3>
                  <p className="text-cream/70 text-sm leading-relaxed font-cormorant">{item.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
