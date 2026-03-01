"use client"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-gold/10 py-10 sm:py-12 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgb(var(--gold-rgb)/0.04),transparent_45%)]" />

      <div className="max-w-7xl mx-auto relative grid gap-5 md:grid-cols-3 md:items-center">
        <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4">
          <span className="font-cinzel font-black tracking-[6.5px] text-gold text-sm footer-brand-glow">SHUBIQ</span>
          <span className="text-cream/55 text-sm">&middot;</span>
          <span className="font-rajdhani text-[11px] sm:text-[12px] tracking-[3.3px] uppercase text-cream/78">Intelligence That Wins</span>
        </div>

        <div className="text-center font-rajdhani text-[11px] sm:text-[12px] tracking-[3px] uppercase text-cream/68">
          &copy; {year} Shubham. All rights reserved.
        </div>

        <div className="flex items-center justify-center md:justify-end gap-2">
          <div className="system-status-dot w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="font-rajdhani text-[11px] sm:text-[12px] tracking-[3px] uppercase text-cream/78">All systems operational</span>
        </div>
      </div>
    </footer>
  )
}
