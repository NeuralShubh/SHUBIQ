import type { Metadata } from "next"
import LabsPageClient from "./LabsPageClient"

export const metadata: Metadata = {
  title: "NexGravision Labs | Product Division",
  description:
    "A focused ecosystem of apps, web platforms, and performance tools engineered under NexGravision. Built for clarity, speed, and execution power.",
  keywords: ["NexGravision Labs", "product division", "productivity apps", "performance tools"],
}

export default function Page() {
  return <LabsPageClient />
}

