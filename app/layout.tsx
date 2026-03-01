import type { Metadata } from "next"
import { Cinzel, Cormorant_Garamond, Orbitron, Rajdhani } from "next/font/google"
import "../src/app/globals.css"
import SmoothScroll from "../src/app/components/SmoothScroll"
import ThemeInit from "../src/app/components/ThemeInit"
import MagneticCursor from "../src/app/components/MagneticCursor"

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", weight: ["400", "700", "900"] })
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant", weight: ["300", "400", "500", "600"], style: ["normal", "italic"] })
const rajdhani = Rajdhani({ subsets: ["latin"], variable: "--font-rajdhani", weight: ["300", "400", "500", "600", "700"] })
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", weight: ["500", "700", "900"] })

export const metadata: Metadata = {
  title: "SHUBIQ: Intelligence That Wins",
  description: "SHUBIQ is a digital product and intelligence studio delivering web platforms, apps, AI systems, and scalable solutions for modern businesses.",
  keywords: ["web development", "mobile apps", "AI solutions", "digital product studio", "SHUBIQ"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${cormorant.variable} ${rajdhani.variable} ${orbitron.variable}`}>
        <ThemeInit />
        <MagneticCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
