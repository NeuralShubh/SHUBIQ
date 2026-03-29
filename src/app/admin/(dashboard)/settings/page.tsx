export default function SettingsAdminPage() {
  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-white">System Settings</h1>
        <p className="text-sm text-[#a1a1aa] mt-1">Configure global platform toggles, webhooks, and security.</p>
      </div>
      <div className="max-w-2xl border border-[#27272a] rounded-lg bg-[#18181b] p-6 space-y-6">
        <h3 className="font-medium text-white">Authentication</h3>
        <p className="text-sm text-[#71717a]">
          The SHUBIQ Administrator portal is currently secured behind Next.js server actions and an HTTP-only 
          encrypted cookie. To change your password, update the <code>ADMIN_PASSWORD</code> environment variable.
        </p>

        <h3 className="font-medium text-white pt-4 border-t border-[#27272a]">Database Connectivity</h3>
        <p className="text-sm text-[#71717a]">
          Postgres database functions are synced seamlessly from Supabase environment variables.
        </p>
      </div>
    </div>
  )
}
