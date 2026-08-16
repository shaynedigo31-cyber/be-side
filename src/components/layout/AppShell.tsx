import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'

export default function AppShell() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fffaf5_0%,_#f7f1fa_42%,_#f4ecf9_100%)] text-[#4B3B5A] antialiased">
      <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-transparent shadow-[0_0_0_1px_rgba(139,111,179,0.05)]">
        <main className="flex-1 pb-20">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
