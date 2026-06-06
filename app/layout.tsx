import type { Metadata } from "next"
import { Inter, Roboto, Playfair_Display } from "next/font/google"
import "../src/app/globals.css"
import SmoothScroll from "../src/app/components/SmoothScroll"
import ThemeInit from "../src/app/components/ThemeInit"
import LoadingScreen from "../src/app/components/LoadingScreen"
import MagneticCursor from "../src/app/components/MagneticCursor"
import ScrollProgress from "../src/app/components/ScrollProgress"
import BackToTop from "../src/app/components/BackToTop"
import AnimationGate from "../src/app/components/AnimationGate"
import Navbar from "../src/app/components/Navbar"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["300", "400", "500", "600", "700", "800"] })
const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto", weight: ["300", "400", "500", "700", "900"] })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "500", "600", "700", "900"] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://NexGravision.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NexGravision",
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
    icon: [{ url: "/logo/logo.png", type: "image/png", sizes: "any" }],
    apple: [{ url: "/logo/logo.png", type: "image/png", sizes: "any" }],
    shortcut: ["/logo/logo.png"],
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
    title: "NexGravision",
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
    title: "NexGravision",
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
      "https://github.com/NeuralShubh",
      "https://www.instagram.com/shubham.bnb/",
      "https://www.linkedin.com/in/neuralshubh/",
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
      <body className={`${inter.variable} ${roboto.variable} ${playfair.variable} bg-[rgb(var(--ink-rgb))] text-cream`}>
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

