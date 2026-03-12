import type { Metadata } from "next"
import Page from "../../../src/app/services/web-development/page"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"

export const metadata: Metadata = {
  title: "Web Development",
  description: "High-performance, conversion-focused websites and web apps built with modern stacks.",
  alternates: { canonical: "/services/web-development" },
  openGraph: {
    title: "Web Development",
    description: "High-performance, conversion-focused websites and web apps built with modern stacks.",
    url: `${siteUrl}/services/web-development`,
  },
}

export default function WebDevelopmentPage() {
  return <Page />
}
