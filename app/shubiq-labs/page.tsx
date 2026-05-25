import type { Metadata } from "next"
import NexGravisionLabsPage from "../../src/app/shubiq-labs/page"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://NexGravision.com"

export const metadata: Metadata = {
  title: "NexGravision Labs",
  description: "Explore NexGravision Labs: a premium product division building execution systems, focused apps, and high-performance digital tools.",
  alternates: {
    canonical: "/shubiq-labs",
  },
  openGraph: {
    title: "NexGravision Labs",
    description: "Explore NexGravision Labs: a premium product division building execution systems, focused apps, and high-performance digital tools.",
    url: `${siteUrl}/shubiq-labs`,
  },
  twitter: {
    card: "summary_large_image",
    title: "NexGravision Labs",
    description: "Execution-grade products from NexGravision Labs.",
  },
}

export default function Page() {
  return <NexGravisionLabsPage />
}

