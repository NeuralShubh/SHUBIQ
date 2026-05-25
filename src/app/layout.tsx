import type { Metadata } from "next"
import { Cinzel, Cormorant_Garamond, Rajdhani } from "next/font/google"
import "./globals.css"
import SmoothScroll from "./components/SmoothScroll"
import ThemeInit from "./components/ThemeInit"
import LayoutShell from "./components/LayoutShell"
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
  metadataBase: new URL("https://NexGravision.com"),
  title: {
    default: "NexGravision | Intelligence That Wins",
    template: "%s | NexGravision",
  },
  description:
    "NexGravision is a premium digital engineering brand crafting high-performance web platforms, productivity apps, and intelligent systems.",
  keywords: ["web development", "digital engineering", "AI integration", "NexGravision", "Next.js", "premium web design"],
  authors: [{ name: "Shubham", url: "https://NexGravision.com/founder" }],
  creator: "NexGravision",
  alternates: {
    canonical: "https://NexGravision.com",
  },
  icons: {
    icon: [
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://NexGravision.com",
    siteName: "NexGravision",
    title: "NexGravision | Intelligence That Wins",
    description:
      "Premium digital engineering, web platforms, AI systems, and productivity apps.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NexGravision, Intelligence That Wins",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexGravision | Intelligence That Wins",
    description: "Premium digital engineering, web platforms, AI systems, and productivity apps.",
    creator: "@NexGravisionofficial",
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
      <body className={`${cinzel.variable} ${cormorant.variable} ${rajdhani.variable} bg-[rgb(var(--ink-rgb))] text-cream`}>
        <ThemeInit />
        <LoadingScreen />
        <CustomCursor />
        <ScrollProgress />
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

