import type { Metadata } from "next"
import { Cinzel, Cormorant_Garamond, Rajdhani } from "next/font/google"
import "./globals.css"
import SmoothScroll from "./components/SmoothScroll"
import ThemeInit from "./components/ThemeInit"
import LayoutShell from "./components/LayoutShell"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ScrollProgress from "./components/ScrollProgress"
import BackToTop from "./components/BackToTop"
import LoadingScreen from "./components/LoadingScreen"
import CustomCursor from "./components/CustomCursor"
import MobileNav from "./components/MobileNav"
import AnimationGate from "./components/AnimationGate"

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
    default: "SHUBIQ | Intelligence That Wins",
    template: "%s | SHUBIQ",
  },
  description:
    "SHUBIQ is a premium digital engineering brand crafting high-performance web platforms, productivity apps, and intelligent systems.",
  keywords: ["web development", "digital engineering", "AI integration", "SHUBIQ", "Next.js", "premium web design"],
  authors: [{ name: "Shubham", url: "https://shubiq.com/founder" }],
  creator: "SHUBIQ",
  alternates: {
    canonical: "https://shubiq.com",
  },
  icons: {
    icon: [
      { url: "/shubiq-icons/sizes/shubiq-gold-16.svg", type: "image/svg+xml", sizes: "16x16" },
      { url: "/shubiq-icons/sizes/shubiq-gold-32.svg", type: "image/svg+xml", sizes: "32x32" },
      { url: "/shubiq-icons/sizes/shubiq-gold-48.svg", type: "image/svg+xml", sizes: "48x48" },
      { url: "/shubiq-icons/sizes/shubiq-gold-64.svg", type: "image/svg+xml", sizes: "64x64" },
      { url: "/shubiq-icons/sizes/shubiq-gold-96.svg", type: "image/svg+xml", sizes: "96x96" },
      { url: "/shubiq-icons/sizes/shubiq-gold-256.svg", type: "image/svg+xml", sizes: "256x256" },
      { url: "/shubiq-icons/sizes/shubiq-gold-512.svg", type: "image/svg+xml", sizes: "512x512" },
    ],
    apple: [{ url: "/shubiq-icons/sizes/shubiq-gold-200.svg", sizes: "200x200", type: "image/svg+xml" }],
    shortcut: ["/shubiq-icons/sizes/shubiq-gold-32.svg"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shubiq.com",
    siteName: "SHUBIQ",
    title: "SHUBIQ | Intelligence That Wins",
    description:
      "Premium digital engineering, web platforms, AI systems, and productivity apps.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SHUBIQ, Intelligence That Wins",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHUBIQ | Intelligence That Wins",
    description: "Premium digital engineering, web platforms, AI systems, and productivity apps.",
    creator: "@shubiqofficial",
    images: ["/og-image.png"],
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
        <LoadingScreen />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <SmoothScroll>
          <AnimationGate>
            <LayoutShell>
              {children}
            </LayoutShell>
          </AnimationGate>
        </SmoothScroll>
        <MobileNav />
        <BackToTop />
        <Footer />
      </body>
    </html>
  )
}
