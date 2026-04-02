import React from 'react'
import { AdminCard, AdminButton, AdminInput } from '@/components/admin/AdminUI'
import { Shield, Key, Database, Globe, Bell, Server } from 'lucide-react'

export default function SettingsAdminPage() {
  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-cream font-cinzel">System Settings</h1>
        <p className="text-[14px] text-cream/70 mt-1 font-medium">Configure global platform toggles, security, and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AdminCard className="p-0 overflow-hidden">
            <div className="p-5 border-b border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-1-rgb))] flex items-center gap-3">
              <Shield className="text-gold" size={18} />
              <h3 className="font-bold text-cream font-cinzel tracking-wider">Authentication & Security</h3>
            </div>
            <div className="p-6 space-y-6 bg-[rgb(var(--surface-0-rgb))]">
              <p className="text-sm text-cream/60 font-medium">
                The SHUBIQ Administrator portal uses server actions with a signed HTTP-only session token.
                Configure <code className="bg-[rgb(var(--surface-1-rgb))] text-gold px-1.5 py-0.5 rounded border border-[rgb(var(--cream-rgb)/0.1)]">ADMIN_SESSION_SECRET</code> and role passwords to manage access securely.
              </p>
              
              <div className="space-y-4 pt-4 border-t border-[rgb(var(--cream-rgb)/0.08)]">
                <AdminInput label="Current Origin Domain" defaultValue="https://shubiq.com" disabled />
                <AdminInput label="Owner Password" type="password" value="********" disabled />
                <p className="text-xs text-cream/40 italic">Use env vars: ADMIN_OWNER_PASSWORD, ADMIN_ADMIN_PASSWORD, ADMIN_EDITOR_PASSWORD, ADMIN_VIEWER_PASSWORD.</p>
              </div>
            </div>
          </AdminCard>

          <AdminCard className="p-0 overflow-hidden">
            <div className="p-5 border-b border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-1-rgb))] flex items-center gap-3">
              <Database className="text-gold" size={18} />
              <h3 className="font-bold text-cream font-cinzel tracking-wider">Database Environment</h3>
            </div>
            <div className="p-6 space-y-6 bg-[rgb(var(--surface-0-rgb))]">
              <div className="flex items-center justify-between p-4 border border-[rgb(var(--cream-rgb)/0.1)] bg-[rgb(var(--surface-1-rgb))] rounded-lg">
                <div className="flex items-center gap-3">
                  <Server className="text-green-500" size={20} />
                  <div>
                    <h4 className="text-cream font-bold text-sm">Supabase Connection</h4>
                    <p className="text-xs text-cream/50 mt-0.5">Postgres DB is actively synced & receiving traffic.</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">HEALTHY</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AdminInput label="Public URL" defaultValue="https://*.supabase.co" disabled />
                <AdminInput label="Project Schema" defaultValue="public" disabled />
              </div>
            </div>
          </AdminCard>
        </div>

        <div className="space-y-6">
          <AdminCard className="space-y-4">
            <div className="flex items-center gap-2 text-cream mb-4">
              <Globe className="text-gold" size={18} />
              <h3 className="font-bold font-cinzel">Webhooks</h3>
            </div>
            <div className="p-4 border border-[rgb(var(--cream-rgb)/0.1)] rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-cream/80">Revalidate Cache</span>
                <AdminButton variant="secondary" className="px-2 py-1 text-xs">Trigger</AdminButton>
              </div>
              <p className="text-xs text-cream/50">Manually clears Next.js ISR cache across the Vercel Edge Network.</p>
            </div>
          </AdminCard>

          <AdminCard className="space-y-4">
            <div className="flex items-center gap-2 text-cream mb-4">
              <Bell className="text-gold" size={18} />
              <h3 className="font-bold font-cinzel">Notifications</h3>
            </div>
            <div className="flex items-center justify-between text-sm py-2 border-b border-[rgb(var(--cream-rgb)/0.1)]">
              <span className="text-cream/80 font-medium">New Inquiry Emails</span>
              <input type="checkbox" defaultChecked className="accent-gold w-4 h-4 cursor-not-allowed" disabled />
            </div>
            <div className="flex items-center justify-between text-sm py-2">
              <span className="text-cream/80 font-medium">System Error Logs</span>
              <input type="checkbox" defaultChecked className="accent-gold w-4 h-4 cursor-not-allowed" disabled />
            </div>
            <p className="text-[11px] text-cream/40 pt-2">Manage settings directly in platform environment variables.</p>
          </AdminCard>
        </div>
      </div>
    </div>
  )
}
