import type { Metadata } from "next"
import Post from "../../../src/app/blog/deep-focus-stack/page"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"

export const metadata: Metadata = {
  title: "The Deep Focus Stack: Rituals That Actually Work",
  description: "A lightweight focus ritual used inside SHUBIQ to ship faster without sacrificing quality.",
  alternates: { canonical: "/blog/deep-focus-stack" },
  openGraph: {
    title: "The Deep Focus Stack: Rituals That Actually Work",
    description: "A lightweight focus ritual used inside SHUBIQ to ship faster without sacrificing quality.",
    url: `${siteUrl}/blog/deep-focus-stack`,
  },
}

export default function Page() {
  return <Post />
}
