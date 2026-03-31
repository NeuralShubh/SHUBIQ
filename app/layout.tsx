import type { Metadata } from "next"
import { Cinzel, Cinzel_Decorative, Cormorant_Garamond, Orbitron, Rajdhani } from "next/font/google"
import "../src/app/globals.css"
import SmoothScroll from "../src/app/components/SmoothScroll"
import ThemeInit from "../src/app/components/ThemeInit"
import LoadingScreen from "../src/app/components/LoadingScreen"
import MagneticCursor from "../src/app/components/MagneticCursor"
import ScrollProgress from "../src/app/components/ScrollProgress"
import BackToTop from "../src/app/components/BackToTop"
import BackButton from "../src/app/components/BackButton"

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", weight: ["400", "700", "900"] })
const cinzelDecorative = Cinzel_Decorative({ subsets: ["latin"], variable: "--font-cinzel-decorative", weight: ["400", "700", "900"] })
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant", weight: ["300", "400", "500", "600"], style: ["normal", "italic"] })
const rajdhani = Rajdhani({ subsets: ["latin"], variable: "--font-rajdhani", weight: ["300", "400", "500", "600", "700"] })
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", weight: ["500", "700", "900"] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SHUBIQ: Intelligence That Wins",
    template: "%s | SHUBIQ",
  },
  description: "SHUBIQ builds high-performance software, productivity apps, and intelligent digital platforms for ambitious brands and founders.",
  applicationName: "SHUBIQ",
  creator: "Shubham",
  publisher: "SHUBIQ",
  alternates: {
    canonical: "/",
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
    siteName: "SHUBIQ",
    title: "SHUBIQ: Intelligence That Wins",
    description: "SHUBIQ builds high-performance software, productivity apps, and intelligent digital platforms for ambitious brands and founders.",
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
    description: "SHUBIQ builds high-performance software, productivity apps, and intelligent digital platforms for ambitious brands and founders.",
    images: ["/opengraph-image"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SHUBIQ",
    url: siteUrl,
    founder: {
      "@type": "Person",
      name: "Shubham",
    },
    sameAs: [
      "https://github.com/shubiqofficial",
      "https://x.com/shubiqofficial",
      "https://instagram.com/shubiqofficial",
      "https://linkedin.com/company/shubiqofficial",
    ],
  }

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SHUBIQ",
    url: siteUrl,
  }

  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${cinzelDecorative.variable} ${cormorant.variable} ${rajdhani.variable} ${orbitron.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <ThemeInit />
        <LoadingScreen />
        <MagneticCursor />
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
        <BackButton />
        <BackToTop />
      </body>
    </html>
  )
}
