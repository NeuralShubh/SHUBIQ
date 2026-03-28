// template.tsx causes Next.js to remount children on navigation,
// which gives AnimatePresence in LayoutShell a fresh key to animate.
export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
