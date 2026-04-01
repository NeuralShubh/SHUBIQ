"use client"

import ScrollReveal from "./ScrollReveal"

export default function SectionDivider() {
  return (
    <ScrollReveal>
      <div className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px w-full bg-[rgb(var(--gold-rgb)/0.18)]" />
        </div>
      </div>
    </ScrollReveal>
  )
}
