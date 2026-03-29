import React from 'react'
import { toast } from 'sonner'

export function AdminCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[rgb(var(--surface-1-rgb))] border border-[rgb(var(--cream-rgb)/0.08)] rounded-xl p-5 shadow-[0_4px_24px_rgb(0_0_0/0.12)] ${className}`}>
      {children}
    </div>
  )
}

export function AdminInput({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <label className="text-[13px] text-cream/70 font-semibold uppercase tracking-wider font-rajdhani">{label}</label>
      <input
        className="w-full bg-[rgb(var(--surface-2-rgb))] border border-[rgb(var(--cream-rgb)/0.12)] rounded-lg px-3 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold/60 focus:bg-[rgb(var(--surface-3-rgb))] transition-colors"
        {...props}
      />
    </div>
  )
}

export function AdminTextarea({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="space-y-1.5">
      <label className="text-[13px] text-cream/70 font-semibold uppercase tracking-wider font-rajdhani">{label}</label>
      <textarea
        className="w-full bg-[rgb(var(--surface-2-rgb))] border border-[rgb(var(--cream-rgb)/0.12)] rounded-lg px-3 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold/60 focus:bg-[rgb(var(--surface-3-rgb))] transition-colors resize-y"
        {...props}
      />
    </div>
  )
}

export function AdminSelect({ label, children, ...props }: { label: string, children: React.ReactNode } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="space-y-1.5">
      <label className="text-[13px] text-cream/70 font-semibold uppercase tracking-wider font-rajdhani">{label}</label>
      <select
        className="w-full bg-[rgb(var(--surface-2-rgb))] border border-[rgb(var(--cream-rgb)/0.12)] rounded-lg px-3 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold/60 focus:bg-[rgb(var(--surface-3-rgb))] transition-colors appearance-none"
        {...props}
      >
        {children}
      </select>
    </div>
  )
}

export function AdminButton({ variant = 'primary', className = '', children, ...props }: { 
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  className?: string
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const styles = {
    primary: 'bg-gold hover:bg-gold-light text-ink shadow-[0_0_12px_rgb(var(--gold-rgb)/0.25)] hover:shadow-[0_0_20px_rgb(var(--gold-rgb)/0.4)]',
    secondary: 'bg-[rgb(var(--surface-2-rgb))] hover:bg-[rgb(var(--surface-3-rgb))] text-cream border border-[rgb(var(--cream-rgb)/0.15)]',
    danger: 'bg-[#ef4444] hover:bg-[#dc2626] text-white shadow-lg shadow-red-500/20',
    ghost: 'bg-transparent hover:bg-[rgb(var(--surface-2-rgb))] text-cream/70 hover:text-cream',
  }

  return (
    <button className={`px-4 py-2 flex items-center justify-center gap-2 rounded-lg text-[13px] tracking-wider uppercase font-rajdhani font-bold transition-all disabled:opacity-50 ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

export function AdminBadge({ status }: { status: string }) {
  const s = status.toLowerCase()
  let colorClass = 'bg-[rgb(var(--muted-rgb)/0.1)] text-muted border-[rgb(var(--muted-rgb)/0.2)]'
  let dotClass = 'bg-muted'

  if (s.includes('live') || s.includes('published') || s.includes('new') || s.includes('done')) {
    colorClass = 'bg-green-500/10 text-green-400 border-green-500/20'
    dotClass = 'bg-green-400'
  } else if (s.includes('dev') || s.includes('progress') || s.includes('draft')) {
    colorClass = 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    dotClass = 'bg-amber-400'
  } else if (s.includes('error') || s.includes('fail')) {
    colorClass = 'bg-red-500/10 text-red-400 border-red-500/20'
    dotClass = 'bg-red-400'
  } else if (s.includes('planned')) {
    colorClass = 'bg-gold/10 text-gold border-gold/20'
    dotClass = 'bg-gold'
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium border ${colorClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      {status}
    </span>
  )
}

export function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Delete' }: {
  isOpen: boolean, title: string, message: string, onConfirm: () => void, onCancel: () => void, confirmText?: string
}) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[rgb(var(--surface-1-rgb))] border border-[rgb(var(--cream-rgb)/0.12)] rounded-xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <h3 className="text-lg font-bold text-cream mb-2 font-cinzel">{title}</h3>
        <p className="text-sm text-cream/70 mb-6 font-cormorant text-[16px]">{message}</p>
        <div className="flex gap-3 justify-end">
          <AdminButton variant="secondary" onClick={onCancel}>Cancel</AdminButton>
          <AdminButton variant={confirmText.toLowerCase() === 'delete' ? 'danger' : 'primary'} onClick={() => {
            onConfirm()
          }}>{confirmText}</AdminButton>
        </div>
      </div>
    </div>
  )
}
