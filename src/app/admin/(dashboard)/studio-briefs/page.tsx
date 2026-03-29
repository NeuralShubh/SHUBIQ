export default function StudioBriefsAdminPage() {
  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-white">Studio Briefs</h1>
        <p className="text-sm text-[#a1a1aa] mt-1">Review onboarding questionnaires and detailed project scopes.</p>
      </div>
      <div className="flex items-center justify-center p-20 border border-dashed border-[#27272a] rounded-lg">
        <p className="text-[#71717a]">No active studio briefs found.</p>
      </div>
    </div>
  )
}
