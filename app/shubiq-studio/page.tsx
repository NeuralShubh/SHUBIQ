import type { Metadata } from "next"
import ShubiqStudioPage from "../../src/app/shubiq-studio/page"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"

export const metadata: Metadata = {
  title: "SHUBIQ Studio",
  description: "SHUBIQ Studio delivers conversion-focused websites, apps, and digital platforms for ambitious brands.",
  alternates: {
    canonical: "/shubiq-studio",
  },
  openGraph: {
    title: "SHUBIQ Studio",
    description: "SHUBIQ Studio delivers conversion-focused websites, apps, and digital platforms for ambitious brands.",
    url: `${siteUrl}/shubiq-studio`,
  },
}

export default function Page() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SHUBIQ Studio - Digital Engineering",
    provider: {
      "@type": "Organization",
      name: "SHUBIQ",
      url: siteUrl,
    },
    areaServed: "Worldwide",
    serviceType: [
      "Web Development",
      "Custom Software",
      "AI Integration",
      "App Development",
      "Digital Brand Infrastructure",
    ],
    url: `${siteUrl}/shubiq-studio`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <ShubiqStudioPage />
    </>
  )
}
