import { Suspense } from "react"
import { RefreshCw } from "lucide-react"
import ActivityFeedClient from "./ActivityFeedClient"

export default function AdminActivityPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6 pb-20 animate-in fade-in duration-300">
          <div className="flex items-center justify-center py-16">
            <RefreshCw size={18} className="animate-spin text-gold" />
          </div>
        </div>
      }
    >
      <ActivityFeedClient />
    </Suspense>
  )
}
