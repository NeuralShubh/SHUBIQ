import type { Metadata } from "next"
import Post from "../../../src/app/blog/productivity-system-2026/page"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"

export const metadata: Metadata = {
  title: "How to Build a Productivity System in 2026",
  description: "A practical, no-fluff system for tasks, habits, and focus that scales with your life and team.",
  alternates: { canonical: "/blog/productivity-system-2026" },
  openGraph: {
    title: "How to Build a Productivity System in 2026",
    description: "A practical, no-fluff system for tasks, habits, and focus that scales with your life and team.",
    url: `${siteUrl}/blog/productivity-system-2026`,
  },
}

export default function Page() {
  return <Post />
}
