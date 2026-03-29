export default function ThemesAdminPage() {
  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-white">Themes Engine</h1>
        <p className="text-sm text-[#a1a1aa] mt-1">Configure site-wide brand token systems and color variants.</p>
      </div>
      <div className="flex items-center justify-center p-20 border border-dashed border-[#27272a] rounded-lg">
        <p className="text-[#71717a]">Theme configuration allows dynamic overriding of Next.js CSS variables.</p>
      </div>
    </div>
  )
}
