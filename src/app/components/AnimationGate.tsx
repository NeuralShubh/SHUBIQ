"use client"

import { useEffect, useState } from "react"

export default function AnimationGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const unlock = () => setReady(true)
    const lock = () => setReady(false)

    const fallbackId = window.setTimeout(unlock, 4500)
    window.addEventListener("shubiq-loading-start", lock as EventListener)
    window.addEventListener("shubiq-loading-complete", unlock as EventListener)

    return () => {
      window.clearTimeout(fallbackId)
      window.removeEventListener("shubiq-loading-start", lock as EventListener)
      window.removeEventListener("shubiq-loading-complete", unlock as EventListener)
    }
  }, [])

  if (!ready) {
    return <div className="min-h-screen w-full bg-[rgb(var(--ink-rgb))]" aria-hidden="true" />
  }
  return <>{children}</>
}
