import type { Metadata } from "next"
import { Cinzel, Cormorant_Garamond, Rajdhani } from "next/font/google"
import "./globals.css"
import SmoothScroll from "./components/SmoothScroll"
import ThemeInit from "./components/ThemeInit"

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", weight: ["400", "700", "900"], display: "swap" })
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
})
const rajdhani = Rajdhani({ subsets: ["latin"], variable: "--font-rajdhani", weight: ["500", "600", "700"], display: "swap" })

export const metadata: Metadata = {
  title: "SHUBIQ: Intelligence That Wins",
  description: "SHUBIQ is a digital product and intelligence studio delivering web platforms, apps, AI systems, and scalable solutions for modern businesses.",
  keywords: ["web development", "mobile apps", "AI solutions", "digital product studio", "SHUBIQ"],
  icons: {
    icon: [
      {
        url: "https://cglzadzphyxgiqwwuwle.supabase.co/storage/v1/object/public/Logo/SHUBIQ.png",
        type: "image/png",
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${cormorant.variable} ${rajdhani.variable}`}>
        <ThemeInit />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
