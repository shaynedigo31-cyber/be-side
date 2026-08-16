import { Download, LogOut, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Settings() {
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const exportData = () => {
    const journal = JSON.parse(localStorage.getItem('be-side-journal') ?? '[]')
    const checkIns = JSON.parse(localStorage.getItem('be-side-check-ins') ?? '[]')
    const preferences = JSON.parse(localStorage.getItem('be-side-preferences') ?? '{}')

    const payload = { exportedAt: new Date().toISOString(), journal, checkIns, preferences }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'be-side-export.json'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-6">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.28em] text-[#8A8190]">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#4B3B5A]">A gentle place to adjust.</h1>
      </div>

      <div className="space-y-4 rounded-[28px] border border-[#EAE1F2] bg-white/80 p-5 shadow-sm text-[#4B3B5A]">
        <div>
          <p className="font-medium">Privacy</p>
          <p className="mt-1 text-sm text-[#8A8190]">
            Private by default. Only what you explicitly choose can be shared.
          </p>
        </div>
        <div>
          <p className="font-medium">Notifications</p>
          <p className="mt-1 text-sm text-[#8A8190]">Daily check-ins are off until enabled.</p>
        </div>
        <div>
          <p className="font-medium">Sharing</p>
          <p className="mt-1 text-sm text-[#8A8190]">You decide what is shared, and nothing is exposed by default.</p>
        </div>

        <button
          type="button"
          onClick={exportData}
          className="flex w-full items-center justify-between rounded-[20px] border border-[#EAE1F2] bg-[#FAF8FC] px-4 py-3 text-left text-sm text-[#4B3B5A]"
        >
          <span className="flex items-center gap-2">
            <Download className="h-4 w-4" aria-hidden="true" />
            Export my data
          </span>
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-between rounded-[20px] border border-[#FDECEC] bg-[#FFF8F8] px-4 py-3 text-left text-sm text-[#4B3B5A]"
        >
          <span className="flex items-center gap-2">
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Logout
          </span>
        </button>

        <div className="flex items-center gap-2 rounded-[20px] bg-[#F3EDF9] px-4 py-3 text-sm text-[#4B3B5A]">
          <ShieldCheck className="h-4 w-4 text-[#8B6FB3]" aria-hidden="true" />
          Private and secure by default.
        </div>
      </div>
    </div>
  )
}
