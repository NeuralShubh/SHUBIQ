import type { Metadata } from "next"
import FounderPageClient from "./FounderPageClient"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://NexGravision.com"

export const metadata: Metadata = {
  title: "Shubham | Founder",
  description: "Shubham leads NexGravision Studio and NexGravision Labs, building high-performance digital platforms and productivity systems.",
  openGraph: {
    title: "Shubham | Founder",
    description: "Shubham leads NexGravision Studio and NexGravision Labs, building high-performance digital platforms and productivity systems.",
    url: `${siteUrl}/founder`,
  },
}

export default function FounderPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shubham",
    jobTitle: "Founder",
    worksFor: {
      "@type": "Organization",
      name: "NexGravision",
      url: siteUrl,
    },
    url: `${siteUrl}/founder`,
    sameAs: [
      "https://github.com/NeuralShubh",
      "https://www.instagram.com/shubham.bnb/",
      "https://www.linkedin.com/in/neuralshubh/",
    ],
  }

  return (
    <>
      <FounderPageClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
    </>
  )
}

