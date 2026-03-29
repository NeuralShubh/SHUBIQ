"use client"

export default function SectionLabel({ label, centered = false }: { label: string; centered?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
      <span className="w-1 h-1 rounded-full bg-gold/85" />
      <span className="font-rajdhani text-[12px] sm:text-[13px] tracking-[4px] sm:tracking-[6px] text-gold/78 uppercase">
        {label}
      </span>
      <span className="w-14 h-px bg-gradient-to-r from-gold/50 to-transparent" />
    </div>
  )
}
