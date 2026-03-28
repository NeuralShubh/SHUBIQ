"use client"

import ScrollReveal from "./ScrollReveal"

export default function SectionDivider() {
  return (
    <ScrollReveal>
      <div className="flex items-center justify-center py-12 md:py-16">
        <div className="w-12 h-[1px] bg-[rgb(var(--cream-rgb)/0.2)]" />
        <div className="w-2 h-2 rounded-full border border-[rgb(var(--cream-rgb)/0.35)] mx-4" />
        <div className="w-12 h-[1px] bg-[rgb(var(--cream-rgb)/0.2)]" />
      </div>
    </ScrollReveal>
  )
}
