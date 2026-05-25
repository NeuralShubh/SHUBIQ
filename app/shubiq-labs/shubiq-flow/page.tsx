import type { Metadata } from "next"
import NexGravisionFlowPage from "../../../src/app/shubiq-labs/shubiq-flow/page"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://NexGravision.com"

export const metadata: Metadata = {
  title: "NexGravision Flow",
  description: "Download NexGravision Flow beta: a premium task, habit, and focus system built for disciplined execution.",
  alternates: {
    canonical: "/shubiq-labs/shubiq-flow",
  },
  openGraph: {
    title: "NexGravision Flow",
    description: "Download NexGravision Flow beta: a premium task, habit, and focus system built for disciplined execution.",
    url: `${siteUrl}/shubiq-labs/shubiq-flow`,
  },
  twitter: {
    card: "summary_large_image",
    title: "NexGravision Flow",
    description: "Beta access for NexGravision Flow productivity system.",
  },
}

export default function Page() {
  return <NexGravisionFlowPage />
}

