"use client"
import { useEffect } from "react"

export default function ThemeInit() {
  useEffect(() => {
    const saved = localStorage.getItem("shubiq-theme")
    const migrated = saved === "cyan" ? "cobalt" : saved
    const valid = ["gold", "cobalt", "emerald", "violet", "crimson", "silver", "amber", "shubh-blue", "shubiq-purple"]
    if (migrated && valid.includes(migrated)) {
      if (migrated === "gold") document.documentElement.removeAttribute("data-theme")
      else document.documentElement.setAttribute("data-theme", migrated)
    } else {
      document.documentElement.setAttribute("data-theme", "shubiq-purple")
    }

    const savedMode = localStorage.getItem("shubiq-mode")
    if (savedMode === "light" || savedMode === "dark") {
      document.documentElement.setAttribute("data-mode", savedMode)
    } else {
      document.documentElement.setAttribute("data-mode", "light")
    }
  }, [])

  return null
}
