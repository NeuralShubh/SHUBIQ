import React from 'react'
import { AdminCard, AdminInput, AdminTextarea, AdminButton } from '@/components/admin/AdminUI'
import { User, Image as ImageIcon, Briefcase, GraduationCap } from 'lucide-react'

export default function FounderAdminPage() {
  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cream font-cinzel">Founder Profile</h1>
          <p className="text-[14px] text-cream/70 mt-1 font-medium">Manage the personal brand, bio, and resume data displayed on the site.</p>
        </div>
        <AdminButton variant="primary">Save Changes</AdminButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AdminCard className="p-0 overflow-hidden">
            <div className="p-5 border-b border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-1-rgb))] flex items-center gap-3">
              <User className="text-gold" size={18} />
              <h3 className="font-bold text-cream font-cinzel tracking-wider">Profile Information</h3>
            </div>
            <div className="p-6 space-y-4 bg-[rgb(var(--surface-0-rgb))]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AdminInput label="Full Name" defaultValue="Shubham" />
                <AdminInput label="Title / Role" defaultValue="Full Stack Engineer & Designer" />
                <AdminInput label="Location" defaultValue="India" />
                <AdminInput label="Availability" defaultValue="Available for hiring" />
              </div>
              
              <div className="pt-2">
                <AdminTextarea 
                  label="Short Bio (Mobile)" 
                  defaultValue="I build products from zero to one. Focused on elegant systems and beautiful interfaces."
                  rows={2}
                />
              </div>

              <div className="pt-2">
                <AdminTextarea 
                  label="Full Bio (Desktop)" 
                  defaultValue="Independent engineer and designer focused on creating digital experiences that feel both intuitive and premium. With a background in scalable architecture and modern frontend frameworks, I bridge the gap between complex engineering and beautiful design."
                  rows={4}
                />
              </div>
            </div>
          </AdminCard>

          <AdminCard className="p-0 overflow-hidden">
            <div className="p-5 border-b border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-1-rgb))] flex items-center gap-3">
              <Briefcase className="text-gold" size={18} />
              <h3 className="font-bold text-cream font-cinzel tracking-wider">Experience & Timeline</h3>
            </div>
            <div className="p-6 bg-[rgb(var(--surface-0-rgb))]">
              <p className="text-sm text-cream/50 mb-6 font-medium">Add timeline events, work history, or education milestones to display on your About page.</p>
              
              <div className="space-y-4">
                {[
                  { title: "Founder & Lead Engineer", company: "SHUBIQ Studio", year: "2024 - Present" },
                  { title: "Senior Frontend Engineer", company: "TechCorp Inc.", year: "2021 - 2024" }
                ].map((job, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-[rgb(var(--cream-rgb)/0.1)] rounded-lg hover:border-gold/30 transition-colors">
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-full bg-[rgb(var(--surface-1-rgb))] flex items-center justify-center border border-[rgb(var(--cream-rgb)/0.08)]">
                        <Briefcase size={16} className="text-gold" />
                      </div>
                      <div>
                        <h4 className="font-bold text-cream text-sm">{job.title}</h4>
                        <p className="text-xs text-cream/60">{job.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-cream/40 bg-[rgb(var(--surface-1-rgb))] px-2 py-1 rounded">{job.year}</span>
                    </div>
                  </div>
                ))}
                <AdminButton variant="secondary" className="w-full text-xs">
                  + Add Experience
                </AdminButton>
              </div>
            </div>
          </AdminCard>
        </div>

        <div className="space-y-6">
          <AdminCard className="flex flex-col items-center justify-center p-8 text-center border-dashed border-[rgb(var(--cream-rgb)/0.2)] bg-[rgb(var(--surface-0-rgb))]">
            <div className="w-32 h-32 rounded-full border-4 border-[rgb(var(--surface-1-rgb))] bg-[rgb(var(--surface-2-rgb))] mb-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                <ImageIcon className="text-white" size={24} />
              </div>
            </div>
            <h3 className="font-bold text-cream font-cinzel mb-1">Profile Picture</h3>
            <p className="text-xs text-cream/50 mb-4">Recommended: Square format, minimum 400x400px</p>
            <AdminButton variant="secondary" className="w-full text-xs py-1.5">Upload Image</AdminButton>
          </AdminCard>

          <AdminCard className="p-0 overflow-hidden">
            <div className="p-4 border-b border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-1-rgb))]">
              <h3 className="font-bold text-cream text-sm">Social Links</h3>
            </div>
            <div className="p-4 space-y-3 bg-[rgb(var(--surface-0-rgb))]">
              {['Twitter', 'GitHub', 'LinkedIn'].map((platform) => (
                <div key={platform} className="space-y-1.5">
                  <label className="text-[11px] text-cream/60 uppercase tracking-wider font-bold">{platform}</label>
                  <input type="text" className="w-full bg-[rgb(var(--surface-2-rgb))] border border-[rgb(var(--cream-rgb)/0.1)] rounded px-2 py-1.5 text-xs text-cream" placeholder="https://" />
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  )
}
