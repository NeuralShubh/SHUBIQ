"use client"
import { useEffect } from "react"

export default function ThemeInit() {
  useEffect(() => {
    const saved = localStorage.getItem("shubiq-theme")
    const migrated = saved === "cyan" ? "cobalt" : saved
    const valid = ["gold", "cobalt", "emerald", "violet", "crimson", "silver", "amber"]
    if (migrated && valid.includes(migrated)) {
      if (migrated === "gold") document.documentElement.removeAttribute("data-theme")
      else document.documentElement.setAttribute("data-theme", migrated)
    } else {
      document.documentElement.removeAttribute("data-theme")
    }
  }, [])

  return null
}
