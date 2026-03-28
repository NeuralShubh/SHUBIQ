import type { Metadata } from "next"
import LabsPageClient from "./LabsPageClient"

export const metadata: Metadata = {
  title: "SHUBIQ Labs | Product Division",
  description:
    "A focused ecosystem of apps, web platforms, and performance tools engineered under SHUBIQ. Built for clarity, speed, and execution power.",
  keywords: ["SHUBIQ Labs", "product division", "productivity apps", "performance tools"],
}

export default function Page() {
  return <LabsPageClient />
}
