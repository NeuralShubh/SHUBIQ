import type { Metadata } from "next"
import ShubiqFlowPage from "../../../src/app/shubiq-labs/shubiq-flow/page"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"

export const metadata: Metadata = {
  title: "SHUBIQ Flow",
  description: "Download SHUBIQ Flow beta: a premium task, habit, and focus system built for disciplined execution.",
  alternates: {
    canonical: "/shubiq-labs/shubiq-flow",
  },
  openGraph: {
    title: "SHUBIQ Flow",
    description: "Download SHUBIQ Flow beta: a premium task, habit, and focus system built for disciplined execution.",
    url: `${siteUrl}/shubiq-labs/shubiq-flow`,
  },
  twitter: {
    card: "summary_large_image",
    title: "SHUBIQ Flow",
    description: "Beta access for SHUBIQ Flow productivity system.",
  },
}

export default function Page() {
  return <ShubiqFlowPage />
}
