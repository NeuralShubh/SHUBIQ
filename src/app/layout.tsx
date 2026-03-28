import type { Metadata } from "next"
import { Cinzel, Cormorant_Garamond, Rajdhani } from "next/font/google"
import "./globals.css"
import SmoothScroll from "./components/SmoothScroll"
import ThemeInit from "./components/ThemeInit"
import LayoutShell from "./components/LayoutShell"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

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
  metadataBase: new URL("https://shubiq.com"),
  title: {
    default: "SHUBIQ: Intelligence That Wins",
    template: "%s | SHUBIQ",
  },
  description:
    "SHUBIQ is a digital product and intelligence studio delivering web platforms, apps, AI systems, and scalable solutions for modern businesses.",
  keywords: ["web development", "mobile apps", "AI solutions", "digital product studio", "SHUBIQ"],
  alternates: {
    canonical: "https://shubiq.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: "https://shubiq.com",
    siteName: "SHUBIQ",
    title: "SHUBIQ: Intelligence That Wins",
    description:
      "SHUBIQ is a digital product and intelligence studio delivering web platforms, apps, AI systems, and scalable solutions for modern businesses.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SHUBIQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHUBIQ: Intelligence That Wins",
    description:
      "SHUBIQ is a digital product and intelligence studio delivering web platforms, apps, AI systems, and scalable solutions for modern businesses.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${cormorant.variable} ${rajdhani.variable}`}>
        <ThemeInit />
        <Navbar />
        <SmoothScroll>
          <LayoutShell>
            {children}
          </LayoutShell>
        </SmoothScroll>
        <Footer />
      </body>
    </html>
  )
}
