import { Download, LogOut, ShieldCheck, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { motion } from 'framer-motion'

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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5"
      >
        <p className="text-xs uppercase tracking-[0.28em] text-[#8A8190]">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#4B3B5A]">A gentle place to adjust. ✨</h1>
      </motion.div>

      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-[28px] border border-[#D4C5E2] bg-gradient-to-br from-[#F9F5FC] to-white p-5 shadow-sm"
        >
          <div className="mb-4 flex items-start gap-3">
            <Heart className="mt-0.5 h-5 w-5 text-[#8B6FB3]" aria-hidden="true" />
            <div>
              <p className="font-medium text-[#4B3B5A]">Your Privacy</p>
              <p className="mt-1 text-sm text-[#8A8190]">
                Private by default. Only what you choose is shared.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={exportData}
          className="flex w-full items-center justify-between rounded-[20px] border-2 border-[#D4C5E2] bg-gradient-to-r from-[#FAF8FC] to-white px-4 py-3 text-left text-sm font-medium text-[#4B3B5A] transition-all hover:border-[#8B6FB3] hover:shadow-md active:scale-[0.98]"
        >
          <span className="flex items-center gap-2">
            <Download className="h-4 w-4" aria-hidden="true" />
            Export my data
          </span>
          <span className="text-[#8A8190]">📥</span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-between rounded-[20px] border-2 border-[#F5D4D4] bg-gradient-to-r from-[#FFF8F8] to-white px-4 py-3 text-left text-sm font-medium text-[#8B5A5A] transition-all hover:border-[#E89999] hover:shadow-md active:scale-[0.98]"
        >
          <span className="flex items-center gap-2">
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Logout
          </span>
          <span className="text-[#8A8190]">👋</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-3 rounded-[20px] border border-[#D4C5E2] bg-[#F3EDF9] px-4 py-3 text-sm text-[#4B3B5A]"
        >
          <ShieldCheck className="h-4 w-4 text-[#8B6FB3]" aria-hidden="true" />
          <span>Private and secure by default. 🔐</span>
        </motion.div>
      </div>
    </div>
  )
}
