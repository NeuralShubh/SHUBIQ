import type { Metadata } from "next"
import Post from "../../../src/app/blog/ai-workflows-for-teams/page"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"

export const metadata: Metadata = {
  title: "AI Workflows for Small Teams",
  description: "Practical AI workflows that remove manual drag and improve decision speed.",
  alternates: { canonical: "/blog/ai-workflows-for-teams" },
  openGraph: {
    title: "AI Workflows for Small Teams",
    description: "Practical AI workflows that remove manual drag and improve decision speed.",
    url: `${siteUrl}/blog/ai-workflows-for-teams`,
  },
}

export default function Page() {
  return <Post />
}
