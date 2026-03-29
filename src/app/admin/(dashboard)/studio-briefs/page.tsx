import React from 'react'
import { AdminCard, AdminButton } from '@/components/admin/AdminUI'
import { Search, Inbox } from 'lucide-react'

export default function StudioBriefsAdminPage() {
  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-cream font-cinzel">Studio Briefs</h1>
          <p className="text-[14px] text-cream/70 mt-1 font-medium">Review onboarding questionnaires and detailed project scopes.</p>
        </div>
      </div>

      <AdminCard className="p-0 overflow-hidden flex flex-col min-h-[400px]">
        <div className="p-4 border-b border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-1-rgb))] flex items-center gap-3 sticky top-0 z-10">
          <Search size={16} className="text-cream/50" />
          <input 
            type="text" 
            placeholder="Search submitted briefs by email or project name..."
            className="bg-transparent border-none outline-none text-[13px] text-cream placeholder:text-cream/40 w-full"
          />
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-16 text-cream/50 bg-[rgb(var(--surface-0-rgb))] text-center">
          <div className="w-16 h-16 rounded-full bg-[rgb(var(--surface-1-rgb))] flex items-center justify-center mb-6 border border-[rgb(var(--cream-rgb)/0.08)]">
            <Inbox size={24} className="text-gold opacity-80" />
          </div>
          <h3 className="text-lg font-cinzel font-bold text-cream">Inbox Empty</h3>
          <p className="max-w-md mt-2 text-[14px] leading-relaxed">No active studio briefs found. When clients submit the detailed project onboarding questionnaire, their scopes will appear here.</p>
        </div>
      </AdminCard>
    </div>
  )
}
