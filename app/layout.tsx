import type { Metadata } from "next"
import { Cinzel, Cinzel_Decorative, Cormorant_Garamond, Orbitron, Rajdhani } from "next/font/google"
import "../src/app/globals.css"
import SmoothScroll from "../src/app/components/SmoothScroll"
import ThemeInit from "../src/app/components/ThemeInit"
import LoadingScreen from "../src/app/components/LoadingScreen"
import MagneticCursor from "../src/app/components/MagneticCursor"
import ScrollProgress from "../src/app/components/ScrollProgress"
import BackToTop from "../src/app/components/BackToTop"
import AnimationGate from "../src/app/components/AnimationGate"
import Navbar from "../src/app/components/Navbar"

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", weight: ["400", "700", "900"] })
const cinzelDecorative = Cinzel_Decorative({ subsets: ["latin"], variable: "--font-cinzel-decorative", weight: ["400", "700", "900"] })
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant", weight: ["300", "400", "500", "600"], style: ["normal", "italic"] })
const rajdhani = Rajdhani({ subsets: ["latin"], variable: "--font-rajdhani", weight: ["300", "400", "500", "600", "700"] })
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", weight: ["500", "700", "900"] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://NexGravision.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NexGravision: Intelligence That Wins",
    template: "%s | NexGravision",
  },
  description: "NexGravision builds high-performance software, productivity apps, and intelligent digital platforms for ambitious brands and founders.",
  applicationName: "NexGravision",
  creator: "Shubham",
  publisher: "NexGravision",
  alternates: {
    canonical: "/",
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "NexGravision",
    title: "NexGravision: Intelligence That Wins",
    description: "NexGravision builds high-performance software, productivity apps, and intelligent digital platforms for ambitious brands and founders.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "NexGravision",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexGravision: Intelligence That Wins",
    description: "NexGravision builds high-performance software, productivity apps, and intelligent digital platforms for ambitious brands and founders.",
    images: ["/opengraph-image"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NexGravision",
    url: siteUrl,
    founder: {
      "@type": "Person",
      name: "Shubham",
    },
    sameAs: [
      "https://github.com/NexGravisionofficial",
      "https://x.com/NexGravisionofficial",
      "https://instagram.com/NexGravisionofficial",
      "https://linkedin.com/company/NexGravisionofficial",
    ],
  }

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NexGravision",
    url: siteUrl,
  }

  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${cinzelDecorative.variable} ${cormorant.variable} ${rajdhani.variable} ${orbitron.variable} bg-[rgb(var(--ink-rgb))] text-cream`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <ThemeInit />
        <LoadingScreen />
        <MagneticCursor />
        <ScrollProgress />
        <Navbar />
        <SmoothScroll>
          <AnimationGate>{children}</AnimationGate>
        </SmoothScroll>
        <BackToTop />
      </body>
    </html>
  )
}

