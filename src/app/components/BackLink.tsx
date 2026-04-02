"use client"

import Link from "next/link"

interface BackLinkProps {
  href: string
  label: string
  className?: string
}

export default function BackLink({ href, label, className = "" }: BackLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3 border border-[rgb(var(--cream-rgb)/0.18)] bg-[rgb(var(--surface-2-rgb)/0.72)] px-4 py-3 font-rajdhani text-[12px] leading-none tracking-[3px] uppercase text-cream/78 hover:text-gold-light hover:border-gold/45 hover:bg-gold/[0.08] transition-colors ${className}`}
    >
      <span className="text-gold/80">&larr;</span>
      {label}
    </Link>
  )
}
