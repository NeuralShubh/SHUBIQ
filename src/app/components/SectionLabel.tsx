"use client"

export default function SectionLabel({
  label,
  centered = false,
  showLines = true,
}: {
  label: string
  centered?: boolean
  showLines?: boolean
}) {
  return (
    <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
      {showLines && <span className="w-14 h-px bg-gradient-to-r from-transparent to-gold/50" />}
      <span className="font-rajdhani text-[12px] sm:text-[13px] tracking-[4px] sm:tracking-[6px] text-gold/78 uppercase">
        {label}
      </span>
      {showLines && <span className="w-14 h-px bg-gradient-to-r from-gold/50 to-transparent" />}
    </div>
  )
}
