import type { Metadata } from "next"
import Page from "../../../src/app/services/software-solutions/page"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"

export const metadata: Metadata = {
  title: "Software Solutions",
  description: "Custom web apps, dashboards, and SaaS tools designed for real business problems.",
  alternates: { canonical: "/services/software-solutions" },
  openGraph: {
    title: "Software Solutions",
    description: "Custom web apps, dashboards, and SaaS tools designed for real business problems.",
    url: `${siteUrl}/services/software-solutions`,
  },
}

export default function SoftwareSolutionsPage() {
  return <Page />
}
