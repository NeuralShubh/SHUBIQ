"use client"
import { useEffect, useRef, RefObject } from 'react'

// Hook: Split text into chars for GSAP animation
export function useSplitText(text: string) {
  return text.split('').map((char, i) => ({
    char: char === ' ' ? '\u00A0' : char,
    index: i
  }))
}

// Hook: Magnetic effect
export function useMagnetic<T extends HTMLElement>(strength = 0.4): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      el.style.transform = `translate(${dx}px, ${dy}px)`
      el.style.transition = 'transform 0.2s ease'
    }

    const handleMouseLeave = () => {
      el.style.transform = 'translate(0px, 0px)'
      el.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return ref
}

// Hook: Text scramble effect
export function useTextScramble() {
  const chars = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  
  const scramble = (el: HTMLElement, finalText: string, duration = 1000) => {
    let frame = 0
    const totalFrames = Math.floor(duration / 16)
    let current = ''
    
    const animate = () => {
      const progress = frame / totalFrames
      current = finalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i < finalText.length * progress) return char
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join('')
      
      el.textContent = current
      frame++
      if (frame <= totalFrames) requestAnimationFrame(animate)
      else el.textContent = finalText
    }
    
    requestAnimationFrame(animate)
  }

  return scramble
}
