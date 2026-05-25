import type { Metadata } from "next"
import FounderPage from "../../src/app/founder/page"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://NexGravision.com"

export const metadata: Metadata = {
  title: "Shubham - Founder of NexGravision",
  description: "Learn about Shubham, founder of NexGravision, and the vision behind NexGravision Studio and NexGravision Labs.",
  alternates: {
    canonical: "/founder",
  },
  openGraph: {
    title: "Shubham - Founder of NexGravision",
    description: "Learn about Shubham, founder of NexGravision, and the vision behind NexGravision Studio and NexGravision Labs.",
    url: `${siteUrl}/founder`,
  },
}

export default function Page() {
  return <FounderPage />
}

