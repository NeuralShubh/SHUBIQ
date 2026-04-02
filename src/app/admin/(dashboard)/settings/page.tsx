'use client'

import { useEffect, useMemo, useState } from 'react'
import { AdminButton, AdminCard, AdminInput } from '@/components/admin/AdminUI'
import { Shield, Database, Globe, Bell, RefreshCw, CircleCheck, CircleAlert, Key, Server } from 'lucide-react'
import { toast } from 'sonner'

type SystemStatus = {
  ok: boolean
  checkedAt?: string
  environment?: {
    siteUrl: string
    hasAdminSessionSecret: boolean
    hasSinglePassword: boolean
    authMode: 'single-password' | 'role-based'
    rolesConfigured: {
      owner: boolean
      admin: boolean
      editor: boolean
      viewer: boolean
    }
  }
  database?: {
    connected: boolean
    activeContactTable: string | null
    counts: {
      contacts: number | null
      blogPosts: number | null
      managedContent: number | null
    }
  }
  error?: string
}

export default function SettingsAdminPage() {
  const [status, setStatus] = useState<SystemStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [revalidating, setRevalidating] = useState(false)

  async function loadStatus(silent = false) {
    if (silent) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }

    try {
      const res = await fetch('/api/admin/system-status', { cache: 'no-store' })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to load system status')
      setStatus(json)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load system status')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  async function revalidateSiteCache() {
    setRevalidating(true)
    try {
      const res = await fetch('/api/admin/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
      const json = await res.json()
      if (!res.ok || !json?.ok) throw new Error(json?.error || 'Revalidate failed')
      toast.success('Site cache revalidated')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Revalidate failed')
    } finally {
      setRevalidating(false)
    }
  }

  useEffect(() => {
    loadStatus()
  }, [])

  const statusRows = useMemo(() => {
    const env = status?.environment
    const db = status?.database
    return [
      {
        label: 'Admin Session Secret',
        value: env?.hasAdminSessionSecret ? 'Configured' : 'Missing',
        healthy: Boolean(env?.hasAdminSessionSecret),
      },
      {
        label: 'Authentication Mode',
        value: env?.authMode === 'single-password' ? 'Single Password' : 'Role Based',
        healthy: Boolean(env),
      },
      {
        label: 'Database Connectivity',
        value: db?.connected ? 'Healthy' : 'Issue Detected',
        healthy: Boolean(db?.connected),
      },
      {
        label: 'Contact Table',
        value: db?.activeContactTable || 'Not Resolved',
        healthy: Boolean(db?.activeContactTable),
      },
    ]
  }, [status])

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-cream font-cinzel">System Settings</h1>
          <p className="text-[14px] text-cream/70 mt-1 font-medium">Monitor deployment health, security state, and cache controls.</p>
        </div>
        <AdminButton variant="secondary" onClick={() => loadStatus(true)} disabled={refreshing || loading}>
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          Refresh
        </AdminButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AdminCard className="p-0 overflow-hidden">
            <div className="p-5 border-b border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-1-rgb))] flex items-center gap-3">
              <Shield className="text-gold" size={18} />
              <h3 className="font-bold text-cream font-cinzel tracking-wider">Security & Authentication</h3>
            </div>
            <div className="p-6 space-y-4 bg-[rgb(var(--surface-0-rgb))]">
              {loading ? (
                <div className="flex items-center gap-3 text-cream/60">
                  <RefreshCw size={15} className="animate-spin" /> Loading status...
                </div>
              ) : (
                <>
                  {statusRows.map((row) => (
                    <div key={row.label} className="flex items-center justify-between p-3 border border-[rgb(var(--cream-rgb)/0.1)] rounded-lg">
                      <div className="flex items-center gap-2">
                        {row.healthy ? <CircleCheck size={15} className="text-green-400" /> : <CircleAlert size={15} className="text-red-400" />}
                        <span className="text-sm text-cream/85 font-medium">{row.label}</span>
                      </div>
                      <span className="text-xs uppercase tracking-[2px] text-cream/60">{row.value}</span>
                    </div>
                  ))}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <AdminInput label="Current Origin Domain" value={status?.environment?.siteUrl || 'https://shubiq.com'} disabled />
                    <AdminInput
                      label="Configured Roles"
                      value={status?.environment ? Object.entries(status.environment.rolesConfigured).filter(([, v]) => v).map(([k]) => k).join(', ') || 'None' : '-'}
                      disabled
                    />
                  </div>

                  <p className="text-xs text-cream/45 italic">
                    Password values are hidden by design. Use Vercel environment variables to rotate credentials.
                  </p>
                </>
              )}
            </div>
          </AdminCard>

          <AdminCard className="p-0 overflow-hidden">
            <div className="p-5 border-b border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-1-rgb))] flex items-center gap-3">
              <Database className="text-gold" size={18} />
              <h3 className="font-bold text-cream font-cinzel tracking-wider">Database Health</h3>
            </div>
            <div className="p-6 space-y-4 bg-[rgb(var(--surface-0-rgb))]">
              <div className="flex items-center justify-between p-4 border border-[rgb(var(--cream-rgb)/0.1)] bg-[rgb(var(--surface-1-rgb))] rounded-lg">
                <div className="flex items-center gap-3">
                  <Server className={status?.database?.connected ? 'text-green-500' : 'text-red-400'} size={20} />
                  <div>
                    <h4 className="text-cream font-bold text-sm">Supabase Connection</h4>
                    <p className="text-xs text-cream/50 mt-0.5">Live status check from admin endpoint.</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded ${status?.database?.connected ? 'text-green-500 bg-green-500/10' : 'text-red-400 bg-red-500/10'}`}>
                  {status?.database?.connected ? 'HEALTHY' : 'ISSUE'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-lg border border-[rgb(var(--cream-rgb)/0.1)] p-4 bg-[rgb(var(--surface-1-rgb))]">
                  <p className="text-[11px] uppercase tracking-[2px] text-cream/45">Contacts</p>
                  <p className="text-xl font-semibold text-cream mt-2">{status?.database?.counts.contacts ?? '-'}</p>
                </div>
                <div className="rounded-lg border border-[rgb(var(--cream-rgb)/0.1)] p-4 bg-[rgb(var(--surface-1-rgb))]">
                  <p className="text-[11px] uppercase tracking-[2px] text-cream/45">Blog Posts</p>
                  <p className="text-xl font-semibold text-cream mt-2">{status?.database?.counts.blogPosts ?? '-'}</p>
                </div>
                <div className="rounded-lg border border-[rgb(var(--cream-rgb)/0.1)] p-4 bg-[rgb(var(--surface-1-rgb))]">
                  <p className="text-[11px] uppercase tracking-[2px] text-cream/45">Managed Content</p>
                  <p className="text-xl font-semibold text-cream mt-2">{status?.database?.counts.managedContent ?? '-'}</p>
                </div>
              </div>
            </div>
          </AdminCard>
        </div>

        <div className="space-y-6">
          <AdminCard className="space-y-4">
            <div className="flex items-center gap-2 text-cream mb-2">
              <Globe className="text-gold" size={18} />
              <h3 className="font-bold font-cinzel">Cache Control</h3>
            </div>
            <p className="text-xs text-cream/55">Trigger on-demand revalidation for key public routes after content updates.</p>
            <AdminButton onClick={revalidateSiteCache} disabled={revalidating}>
              <RefreshCw size={14} className={revalidating ? 'animate-spin' : ''} />
              Revalidate Website Cache
            </AdminButton>
          </AdminCard>

          <AdminCard className="space-y-4">
            <div className="flex items-center gap-2 text-cream mb-2">
              <Bell className="text-gold" size={18} />
              <h3 className="font-bold font-cinzel">Notifications</h3>
            </div>
            <div className="flex items-center justify-between text-sm py-2 border-b border-[rgb(var(--cream-rgb)/0.1)]">
              <span className="text-cream/80 font-medium">New Inquiry Emails</span>
              <span className="text-xs text-green-400">Enabled</span>
            </div>
            <div className="flex items-center justify-between text-sm py-2">
              <span className="text-cream/80 font-medium">System Error Logs</span>
              <span className="text-xs text-green-400">Enabled</span>
            </div>
            <p className="text-[11px] text-cream/40 pt-2">Manage provider-level notifications in your Vercel and Supabase dashboards.</p>
          </AdminCard>

          <AdminCard className="space-y-4">
            <div className="flex items-center gap-2 text-cream mb-2">
              <Key className="text-gold" size={18} />
              <h3 className="font-bold font-cinzel">Credential Notes</h3>
            </div>
            <p className="text-xs text-cream/55 leading-relaxed">
              Keep <code className="text-gold">ADMIN_SESSION_SECRET</code>, <code className="text-gold">ADMIN_PASSWORD</code>, and Supabase keys set in all Vercel environments.
            </p>
          </AdminCard>
        </div>
      </div>
    </div>
  )
}
