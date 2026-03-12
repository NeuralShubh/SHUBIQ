import type { Metadata } from "next"
import Page from "../../../src/app/services/app-building/page"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"

export const metadata: Metadata = {
  title: "App Building",
  description: "Build scalable mobile and web apps with premium UX and production-grade performance.",
  alternates: { canonical: "/services/app-building" },
  openGraph: {
    title: "App Building",
    description: "Build scalable mobile and web apps with premium UX and production-grade performance.",
    url: `${siteUrl}/services/app-building`,
  },
}

export default function AppBuildingPage() {
  return <Page />
}
