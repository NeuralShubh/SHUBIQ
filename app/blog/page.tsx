import type { Metadata } from "next"
import BlogIndexPage from "../../src/app/blog/page"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://NexGravision.com"

export const metadata: Metadata = {
  title: "Blog",
  description: "NexGravision field notes on productivity systems, focus rituals, and AI-enabled execution.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "NexGravision Blog",
    description: "NexGravision field notes on productivity systems, focus rituals, and AI-enabled execution.",
    url: `${siteUrl}/blog`,
  },
}

export default function Page() {
  return <BlogIndexPage />
}

