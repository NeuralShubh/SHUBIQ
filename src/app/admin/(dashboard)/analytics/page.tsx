import React from 'react'
import { BarChart3, TrendingUp, Users, Activity, ExternalLink, ArrowUpRight } from 'lucide-react'
import { AdminCard, AdminButton } from '@/components/admin/AdminUI'

export default function AnalyticsAdminPage() {
  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-cream font-cinzel">Traffic & Analytics</h1>
          <p className="text-[14px] text-cream/70 mt-1 font-medium">Real-time engagement, visitors, and growth metrics.</p>
        </div>
        <div className="flex gap-3">
          <AdminButton variant="secondary" className="whitespace-nowrap">
            Last 30 Days
          </AdminButton>
          <a href="https://vercel.com/analytics" target="_blank" rel="noreferrer">
            <AdminButton variant="primary">
              Vercel Dashboard <ExternalLink size={14} />
            </AdminButton>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Visits', value: '12,482', change: '+14%', up: true, icon: Users },
          { label: 'Avg Session', value: '2m 14s', change: '+5%', up: true, icon: Activity },
          { label: 'Bounce Rate', value: '42.3%', change: '-2.1%', up: true, icon: TrendingUp },
          { label: 'Inquiry Conversion', value: '3.2%', change: '+0.4%', up: true, icon: BarChart3 },
        ].map((stat, i) => (
          <AdminCard key={i} className="flex flex-col gap-3 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 group-hover:bg-gold/10 transition-colors" />
            <div className="flex items-center gap-3 text-cream/70">
              <stat.icon size={16} className="text-gold" />
              <span className="text-[13px] font-bold uppercase tracking-wider font-rajdhani">{stat.label}</span>
            </div>
            <div className="flex items-end gap-3 mt-2">
              <span className="text-3xl font-bold text-cream font-cinzel tracking-tight">{stat.value}</span>
              <span className={`text-sm font-medium mb-1 flex items-center gap-0.5 ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                {stat.up ? <ArrowUpRight size={14} /> : null} {stat.change}
              </span>
            </div>
          </AdminCard>
        ))}
      </div>

      <AdminCard className="p-0 overflow-hidden flex flex-col min-h-[350px]">
        <div className="p-5 border-b border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-1-rgb))] flex items-center justify-between">
          <h3 className="font-bold text-cream font-cinzel">Visitor Demographics</h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-gold bg-gold/10 px-2 py-1 rounded-md">Live</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-cream/50 bg-[rgb(var(--surface-0-rgb))] text-center">
          <BarChart3 size={32} className="mb-3 opacity-50" />
          <p className="font-medium">Detailed demographic tracking requires Vercel Web Analytics PRO integration.</p>
          <p className="text-[13px] mt-1">Upgrade your Vercel plan to unlock native geo-tracking & referer charts.</p>
        </div>
      </AdminCard>
    </div>
  )
}
