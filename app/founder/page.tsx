import type { Metadata } from "next"
import FounderPage from "../../src/app/founder/page"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"

export const metadata: Metadata = {
  title: "Shubham - Founder of SHUBIQ",
  description: "Learn about Shubham, founder of SHUBIQ, and the vision behind SHUBIQ Studio and SHUBIQ Labs.",
  alternates: {
    canonical: "/founder",
  },
  openGraph: {
    title: "Shubham - Founder of SHUBIQ",
    description: "Learn about Shubham, founder of SHUBIQ, and the vision behind SHUBIQ Studio and SHUBIQ Labs.",
    url: `${siteUrl}/founder`,
  },
}

export default function Page() {
  return <FounderPage />
}
