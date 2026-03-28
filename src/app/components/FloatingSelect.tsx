"use client"

import { useState } from "react"
import { useReducedMotion } from "framer-motion"

interface FloatingSelectProps {
  label: string
  name: string
  value: string
  required?: boolean
  options: string[]
  onChange: (value: string) => void
  onBlur?: () => void
}

export default function FloatingSelect({ label, name, value, required, options, onChange, onBlur }: FloatingSelectProps) {
  const [focused, setFocused] = useState(false)
  const prefersReduced = useReducedMotion()
  const isActive = focused || value.length > 0

  const selectClasses = `w-full bg-transparent border-b-2 outline-none py-3 text-[16px] font-cormorant transition-colors duration-200 ${
    focused ? "border-gold/70" : "border-[rgb(var(--cream-rgb)/0.2)]"
  }`

  const labelClasses = `absolute left-0 transition-all duration-200 pointer-events-none ${
    isActive ? "top-0 text-[11px] tracking-[2px] uppercase" : "top-3 text-[15px]"
  } ${focused ? "text-gold/80" : "text-cream/45"}`

  return (
    <div className="relative pt-5">
      <label htmlFor={name} className={prefersReduced ? "absolute left-0 top-0 text-[11px] tracking-[2px] uppercase text-cream/55" : labelClasses}>
        {label}{required ? " *" : ""}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false)
          onBlur?.()
        }}
        className={`${selectClasses} bg-transparent`}
        required={required}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="text-ink">
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
