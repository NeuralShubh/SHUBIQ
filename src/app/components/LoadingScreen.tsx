"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"

const LOGO_URL =
  "https://cglzadzphyxgiqwwuwle.supabase.co/storage/v1/object/public/Logo/SHUBIQ.png"

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("shubiq-loaded")
    if (hasLoaded) {
      setLoading(false)
      return
    }

    const minTime = new Promise((resolve) => setTimeout(resolve, 1100))
    const pageLoad = new Promise((resolve) => {
      if (document.readyState === "complete") resolve(true)
      else window.addEventListener("load", () => resolve(true), { once: true })
    })

    Promise.all([minTime, pageLoad]).then(() => {
      setLoading(false)
      sessionStorage.setItem("shubiq-loaded", "true")
    })
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{ backgroundColor: "rgb(var(--ink-rgb))" }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Image src={LOGO_URL} alt="SHUBIQ" width={180} height={72} priority className="h-10 md:h-12 w-auto object-contain" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-cream/60 text-[10px] tracking-[0.3em] uppercase font-rajdhani"
            >
              Intelligence That Wins
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-32 h-[2px] bg-[rgb(var(--cream-rgb)/0.18)] rounded-full overflow-hidden mt-1"
            >
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: "rgb(var(--gold-rgb))" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

