import type { Metadata } from "next"
import ShubiqFlowClient from "./ShubiqFlowClient"

export const metadata: Metadata = {
  title: "SHUBIQ Flow | SHUBIQ Labs",
  description: "A unified personal productivity system for tasks, habits, focus sessions, and daily execution.",
}

export default function ShubiqFlowDownloadPage() {
  return <ShubiqFlowClient />
}
