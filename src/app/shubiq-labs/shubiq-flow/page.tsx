import type { Metadata } from "next"
import ShubiqFlowClient from "./ShubiqFlowClient"

export const metadata: Metadata = {
  title: "NexGravision Flow | NexGravision Labs",
  description: "A unified personal productivity system for tasks, habits, focus sessions, and daily execution.",
}

export default function NexGravisionFlowDownloadPage() {
  return <ShubiqFlowClient />
}

