import type { Metadata } from "next"
import ShubiqStudioPage from "../../src/app/shubiq-studio/page"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"

export const metadata: Metadata = {
  title: "SHUBIQ Studio",
  description: "SHUBIQ Studio delivers conversion-focused websites, apps, and digital platforms for ambitious brands.",
  alternates: {
    canonical: "/shubiq-studio",
  },
  openGraph: {
    title: "SHUBIQ Studio",
    description: "SHUBIQ Studio delivers conversion-focused websites, apps, and digital platforms for ambitious brands.",
    url: `${siteUrl}/shubiq-studio`,
  },
}

export default function Page() {
  return <ShubiqStudioPage />
}
