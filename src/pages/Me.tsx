import { ArrowRight, Heart, MoonStar, Settings, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Me() {
  const items = [
    { title: 'My patterns', text: 'Something you have noticed', icon: MoonStar, href: '/me/patterns' },
    { title: 'Things that help me', text: 'Gentle routines and reminders.', icon: Sparkles, href: '/comfort' },
    { title: 'My comfort', text: 'What helps you feel held.', icon: Heart, href: '/comfort' },
    { title: 'Settings', text: 'Privacy, sharing, notifications.', icon: Settings, href: '/settings' },
  ]

  return (
    <div className="mx-auto w-full max-w-md px-4 py-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
        <p className="text-xs uppercase tracking-[0.28em] text-[#8A8190]">Me</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#4B3B5A]">Your little patterns. 🌸</h1>
      </motion.div>

      <div className="space-y-3">
        {items.map(({ title, text, icon: Icon, href }, idx) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to={href}
              className="flex items-center justify-between rounded-[24px] border-2 border-[#EAE1F2] bg-gradient-to-r from-white to-[#FAF8FC] p-4 shadow-sm transition-all hover:border-[#8B6FB3] hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-gradient-to-br from-[#F3EDF9] to-[#F8F3FB] text-lg text-[#8B6FB3]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-[#4B3B5A]">{title}</p>
                  <p className="text-sm text-[#8A8190]">{text}</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-[#8B6FB3]" aria-hidden="true" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
