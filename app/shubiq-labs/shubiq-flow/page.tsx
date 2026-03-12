import type { Metadata } from "next"
import ShubiqFlowPage from "../../../src/app/shubiq-labs/shubiq-flow/page"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"

export const metadata: Metadata = {
  title: "SHUBIQ Flow",
  description: "Download SHUBIQ Flow: tasks, habits, and focus rituals in one premium productivity app.",
  alternates: {
    canonical: "/shubiq-labs/shubiq-flow",
  },
  openGraph: {
    title: "SHUBIQ Flow",
    description: "Download SHUBIQ Flow: tasks, habits, and focus rituals in one premium productivity app.",
    url: `${siteUrl}/shubiq-labs/shubiq-flow`,
  },
}

export default function Page() {
  return <ShubiqFlowPage />
}
