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
      className={`inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase text-cream/70 hover:text-gold-light transition-colors ${className}`}
    >
      <span className="text-gold/80">&larr;</span>
      {label}
    </Link>
  )
}
