import React from 'react'
import { AdminCard, AdminButton } from '@/components/admin/AdminUI'
import { Palette, Layers, Brush, Droplet } from 'lucide-react'

export default function ThemesAdminPage() {
  const themes = [
    { name: 'Signature Gold', bg: 'bg-[#C4A458]', text: 'text-ink', border: 'border-[#C4A458]/20', active: true },
    { name: 'Cobalt Blue', bg: 'bg-[#5E9AE9]', text: 'text-white', border: 'border-[#5E9AE9]/20', active: false },
    { name: 'Emerald', bg: 'bg-[#22B492]', text: 'text-white', border: 'border-[#22B492]/20', active: false },
    { name: 'Shubh Blue', bg: 'bg-[#1447E6]', text: 'text-white', border: 'border-[#1447E6]/20', active: false },
  ]

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cream font-cinzel">Brand Themes</h1>
          <p className="text-[14px] text-cream/70 mt-1 font-medium">Manage global CSS accent colors and design tokens.</p>
        </div>
        <AdminButton variant="primary">Add Custom Theme</AdminButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {themes.map((theme, i) => (
          <AdminCard key={i} className="flex flex-col relative overflow-hidden group hover:border-gold/40 transition-colors cursor-pointer">
            {theme.active && (
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
            )}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full shadow-lg flex items-center justify-center ${theme.bg}`}>
                  <Droplet size={14} className={theme.text} />
                </div>
                <div>
                  <h3 className="font-bold text-cream font-cinzel text-lg">{theme.name}</h3>
                  <p className="text-xs text-cream/50">CSS Variables set</p>
                </div>
              </div>
              {theme.active && (
                <span className="text-[10px] font-bold tracking-wider uppercase bg-gold/10 text-gold px-2 py-1 rounded-md border border-gold/20">
                  Active
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-auto">
              <div className={`h-12 rounded-md border ${theme.border} ${theme.bg} opacity-20`} />
              <div className={`h-12 rounded-md border ${theme.border} ${theme.bg} opacity-40`} />
              <div className={`h-12 rounded-md border ${theme.border} ${theme.bg} opacity-70`} />
              <div className={`h-12 rounded-md border ${theme.border} ${theme.bg} opacity-100 flex items-center justify-center`}>
                <span className={`text-xs font-bold ${theme.text}`}>Base</span>
              </div>
            </div>
            
            <div className="pt-4 mt-4 border-t border-[rgb(var(--cream-rgb)/0.08)] flex justify-between items-center">
              <span className="text-xs text-cream/40">Default configuration</span>
              <AdminButton variant={theme.active ? 'secondary' : 'ghost'} disabled={theme.active} className="py-1 px-3 text-xs">
                {theme.active ? 'Current' : 'Activate'}
              </AdminButton>
            </div>
          </AdminCard>
        ))}

        <AdminCard className="flex flex-col items-center justify-center text-center p-8 border-dashed border-[rgb(var(--cream-rgb)/0.1)] bg-transparent hover:bg-[rgb(var(--surface-1-rgb))] cursor-pointer group transition-colors">
          <div className="w-12 h-12 rounded-full bg-[rgb(var(--surface-2-rgb))] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gold/10 transition-all">
            <Palette size={20} className="text-cream/50 group-hover:text-gold" />
          </div>
          <h3 className="font-bold text-cream font-cinzel mb-1">Custom CSS Theme</h3>
          <p className="text-xs text-cream/50">Define explicit HSL variables to match client branding exactly.</p>
        </AdminCard>
      </div>
    </div>
  )
}
