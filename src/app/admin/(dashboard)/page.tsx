import { Suspense } from "react"
import { RefreshCw } from "lucide-react"
import FormSubmissionsDashboard from "./DashboardClient"

export default function AdminDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-16">
          <RefreshCw size={18} className="animate-spin text-gold" />
        </div>
      }
    >
      <FormSubmissionsDashboard />
    </Suspense>
  )
}
