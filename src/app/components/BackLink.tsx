"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import type { MouseEvent } from "react"

interface BackLinkProps {
  href: string
  label: string
  className?: string
}

export default function BackLink({ href, label, className = "" }: BackLinkProps) {
  const router = useRouter()

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    window.dispatchEvent(new Event("shubiq-nav-loading"))
    window.setTimeout(() => {
      router.push(href)
    }, 110)
  }

  return (
    <Link
      href={href}
      onClick={handleNavigate}
      className={`inline-flex items-center gap-3 border border-[rgb(var(--cream-rgb)/0.18)] bg-[rgb(var(--surface-2-rgb)/0.72)] px-4 py-3 font-rajdhani text-[12px] leading-none tracking-[3px] uppercase text-cream/78 hover:text-gold-light hover:border-gold/45 hover:bg-gold/[0.08] transition-colors ${className}`}
    >
      <span className="text-gold/80">&larr;</span>
      {label}
    </Link>
  )
}
