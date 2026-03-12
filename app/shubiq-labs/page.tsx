import type { Metadata } from "next"
import ShubiqLabsPage from "../../src/app/shubiq-labs/page"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"

export const metadata: Metadata = {
  title: "SHUBIQ Labs",
  description: "Explore SHUBIQ Labs: the product division building focused productivity apps and performance systems.",
  alternates: {
    canonical: "/shubiq-labs",
  },
  openGraph: {
    title: "SHUBIQ Labs",
    description: "Explore SHUBIQ Labs: the product division building focused productivity apps and performance systems.",
    url: `${siteUrl}/shubiq-labs`,
  },
}

export default function Page() {
  return <ShubiqLabsPage />
}
