import React from 'react'
import { toast } from 'sonner'

export function AdminCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#18181b] border border-[#27272a] rounded-xl p-5 ${className}`}>
      {children}
    </div>
  )
}

export function AdminInput({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-[#a1a1aa] font-medium">{label}</label>
      <input
        className="w-full bg-[#09090b] border border-[#27272a] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#71717a] focus:outline-none focus:border-[#3b82f6] transition-colors"
        {...props}
      />
    </div>
  )
}

export function AdminTextarea({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-[#a1a1aa] font-medium">{label}</label>
      <textarea
        className="w-full bg-[#09090b] border border-[#27272a] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#71717a] focus:outline-none focus:border-[#3b82f6] transition-colors resize-y"
        {...props}
      />
    </div>
  )
}

export function AdminSelect({ label, children, ...props }: { label: string, children: React.ReactNode } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-[#a1a1aa] font-medium">{label}</label>
      <select
        className="w-full bg-[#09090b] border border-[#27272a] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#71717a] focus:outline-none focus:border-[#3b82f6] transition-colors appearance-none"
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
    primary: 'bg-[#3b82f6] hover:bg-[#2563eb] text-white',
    secondary: 'bg-[#27272a] hover:bg-[#3f3f46] text-white border border-[#3f3f46]',
    danger: 'bg-[#ef4444] hover:bg-[#dc2626] text-white',
    ghost: 'bg-transparent hover:bg-[#18181b] text-[#a1a1aa] hover:text-white',
  }

  return (
    <button className={`px-4 py-2 flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

export function AdminBadge({ status }: { status: string }) {
  const s = status.toLowerCase()
  let colorClass = 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
  let dotClass = 'bg-zinc-400'

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
    colorClass = 'bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20'
    dotClass = 'bg-[#3b82f6]'
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
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl max-w-sm w-full p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-[#a1a1aa] mb-6">{message}</p>
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
