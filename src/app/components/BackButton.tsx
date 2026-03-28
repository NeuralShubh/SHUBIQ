"use client"

import { usePathname, useRouter } from "next/navigation"

export default function BackButton() {
  const router = useRouter()
  const pathname = usePathname()

  if (!pathname || pathname === "/" || pathname.startsWith("/admin") || pathname === "/shubiq-studio") {
    return null
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="fixed top-[152px] md:top-[168px] z-[90] inline-flex items-center gap-2 border border-[rgb(var(--cream-rgb)/0.18)] bg-[rgb(var(--surface-2-rgb)/0.7)] px-3.5 py-2 text-[10px] tracking-[3px] uppercase font-rajdhani text-cream/75 backdrop-blur-md hover:text-gold hover:border-gold/50 hover:bg-gold/[0.08] transition-colors"
      style={{ left: "max(1.25rem, calc(50% - 640px + 1.5rem))" }}
      aria-label="Go back"
    >
      <span className="text-gold/80">←</span>
      Back
    </button>
  )
}
