import type { Metadata } from "next"
import ShubiqLabsPage from "../../src/app/shubiq-labs/page"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"

export const metadata: Metadata = {
  title: "SHUBIQ Labs",
  description: "Explore SHUBIQ Labs: a premium product division building execution systems, focused apps, and high-performance digital tools.",
  alternates: {
    canonical: "/shubiq-labs",
  },
  openGraph: {
    title: "SHUBIQ Labs",
    description: "Explore SHUBIQ Labs: a premium product division building execution systems, focused apps, and high-performance digital tools.",
    url: `${siteUrl}/shubiq-labs`,
  },
  twitter: {
    card: "summary_large_image",
    title: "SHUBIQ Labs",
    description: "Execution-grade products from SHUBIQ Labs.",
  },
}

export default function Page() {
  return <ShubiqLabsPage />
}
