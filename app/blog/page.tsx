import type { Metadata } from "next"
import BlogIndexPage from "../../src/app/blog/page"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"

export const metadata: Metadata = {
  title: "Blog",
  description: "SHUBIQ field notes on productivity systems, focus rituals, and AI-enabled execution.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "SHUBIQ Blog",
    description: "SHUBIQ field notes on productivity systems, focus rituals, and AI-enabled execution.",
    url: `${siteUrl}/blog`,
  },
}

export default function Page() {
  return <BlogIndexPage />
}
