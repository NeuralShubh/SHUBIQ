"use client"

import { useState } from "react"
import { useReducedMotion } from "framer-motion"

interface FloatingInputProps {
  label: string
  name: string
  type?: string
  value: string
  required?: boolean
  multiline?: boolean
  onChange: (value: string) => void
  onBlur?: () => void
  error?: boolean
  helperText?: string
  maxLength?: number
}

export default function FloatingInput({
  label,
  name,
  type = "text",
  value,
  required,
  multiline,
  onChange,
  onBlur,
  error,
  helperText,
  maxLength,
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false)
  const prefersReduced = useReducedMotion()
  const isActive = focused || value.length > 0

  const inputClasses = `w-full bg-transparent border-b-2 outline-none py-3 text-[16px] font-cormorant transition-colors duration-200 ${
    error ? "border-red-400" : focused ? "border-gold/70" : "border-[rgb(var(--cream-rgb)/0.2)]"
  }`

  const labelClasses = `absolute left-0 transition-all duration-200 pointer-events-none ${
    isActive ? "top-0 text-[11px] tracking-[2px] uppercase" : "top-3 text-[15px]"
  } ${error ? "text-red-300" : focused ? "text-gold/80" : "text-cream/45"}`

  return (
    <div className="relative pt-5">
      <label htmlFor={name} className={prefersReduced ? "absolute left-0 top-0 text-[11px] tracking-[2px] uppercase text-cream/55" : labelClasses}>
        {label}{required ? " *" : ""}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false)
            onBlur?.()
          }}
          className={`${inputClasses} resize-none min-h-[110px]`}
          required={required}
          maxLength={maxLength}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false)
            onBlur?.()
          }}
          className={inputClasses}
          required={required}
          maxLength={maxLength}
        />
      )}
      {helperText && <div className="mt-1 text-right text-[10px] tracking-[2px] uppercase text-cream/40 font-rajdhani">{helperText}</div>}
    </div>
  )
}
