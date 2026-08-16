import { Link } from 'react-router-dom'
import { Heart, MoonStar } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { affirmations } from '../data/affirmations'
import { getGreeting } from '../lib/utils'

export default function Home() {
  const [affirmationIndex, setAffirmationIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setAffirmationIndex((value) => (value + 1) % affirmations.length)
    }, 4000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-8 text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-6 flex flex-col items-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="mb-3"
        >
          <MoonStar className="h-8 w-8 text-[#8B6FB3]" aria-hidden="true" />
        </motion.div>
        <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#8A8190]">
          BE-SIDE
        </p>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-xs text-4xl font-semibold leading-tight text-[#4B3B5A]"
      >
        {getGreeting()}
      </motion.h1>

      <p className="mt-5 max-w-xs text-base leading-relaxed text-[#8A8190]">
        You don&apos;t have to figure everything out tonight.
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 w-full max-w-sm"
      >
        <p className="mb-3 text-[15px] text-[#5D4E68]">How are you feeling?</p>

        <Link
          to="/checkin"
          className="flex w-full items-center justify-center gap-2 rounded-[26px] bg-gradient-to-r from-[#8B6FB3] to-[#9A7DBF] px-5 py-4 text-base font-medium text-white shadow-[0_18px_35px_rgba(139,111,179,0.25)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_24px_45px_rgba(139,111,179,0.35)] focus:outline-none focus:ring-4 focus:ring-[#DCCFF5] active:scale-[0.98]"
        >
          <Heart className="h-4 w-4" aria-hidden="true" />
          Check in 💜
        </Link>

        <p className="mt-4 text-sm text-[#8A8190]">Take your time.</p>
      </motion.div>

      <motion.div
        key={affirmationIndex}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8 max-w-xs rounded-[22px] border border-[#D4C5E2] bg-gradient-to-br from-[#FAF8FC] to-white px-4 py-3 text-sm text-[#4B3B5A] shadow-sm hover:shadow-md"
      >
        {affirmations[affirmationIndex]}
      </motion.div>
    </motion.section>
  )
}
