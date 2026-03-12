import type { Metadata } from "next"
import Page from "../../../src/app/services/ai-integration/page"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"

export const metadata: Metadata = {
  title: "AI Integration",
  description: "Embed intelligence into your product through automation and AI-driven features.",
  alternates: { canonical: "/services/ai-integration" },
  openGraph: {
    title: "AI Integration",
    description: "Embed intelligence into your product through automation and AI-driven features.",
    url: `${siteUrl}/services/ai-integration`,
  },
}

export default function AiIntegrationPage() {
  return <Page />
}
