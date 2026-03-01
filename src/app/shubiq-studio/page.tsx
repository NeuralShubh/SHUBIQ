import type { Metadata } from "next"
import StudioPage from "./StudioPage"

export const metadata: Metadata = {
  title: "SHUBIQ Studio — Digital Engineering Agency",
  description:
    "SHUBIQ Studio partners with brands and founders to design, build, and launch websites, web applications, and custom software. Engineered with precision for long-term impact.",
  keywords: ["web agency", "digital studio", "Next.js development", "custom software", "SHUBIQ Studio"],
}

export default function Page() {
  return <StudioPage />
}
