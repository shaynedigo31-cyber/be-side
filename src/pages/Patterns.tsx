import { useEffect, useState } from 'react'
import type { CheckInRecord } from '../types/database'

const STORAGE_KEY = 'be-side-check-ins'

export default function Patterns() {
  const [checkIns, setCheckIns] = useState<CheckInRecord[]>([])

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setCheckIns(JSON.parse(stored))
      } catch {
        setCheckIns([])
      }
    }
  }, [])

  const getAverageMood = () => {
    if (checkIns.length === 0) return 0
    const sum = checkIns.reduce((acc: number, ci) => acc + (typeof ci.mood === 'number' ? ci.mood : 0), 0)
    return Math.round(sum / checkIns.length)
  }

  const getMoodTrend = () => {
    if (checkIns.length < 2) return 'stable'
    const recent = checkIns.slice(0, 3)
    const older = checkIns.slice(3, 6)
    if (older.length === 0) return 'stable'
    const recentAvg = recent.reduce((acc: number, ci) => acc + (typeof ci.mood === 'number' ? ci.mood : 0), 0) / recent.length
    const olderAvg = older.reduce((acc: number, ci) => acc + (typeof ci.mood === 'number' ? ci.mood : 0), 0) / older.length
    if (recentAvg > olderAvg + 0.5) return 'improving'
    if (recentAvg < olderAvg - 0.5) return 'declining'
    return 'stable'
  }

  const getMoodEmoji = (mood: number) => {
    const emojis = ['', '😔', '😕', '😐', '🙂', '😊']
    return emojis[mood] || '😐'
  }

  const trend = getMoodTrend()
  const avgMood = getAverageMood()
  const recentCount = checkIns.length

  const trendMessages = {
    improving: "You're doing better! That's beautiful. 🌱",
    declining: 'It seems like things have been harder lately. That\'s okay. 💙',
    stable: "You're holding steady. That takes strength. 💫",
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-6">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.28em] text-[#8A8190]">My patterns</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#4B3B5A]">Your recent patterns.</h1>
      </div>

      {recentCount === 0 ? (
        <div className="rounded-[28px] border border-[#EAE1F2] bg-white/80 p-5 shadow-sm">
          <p className="text-base leading-relaxed text-[#5D4E68]">
            No check-ins yet. 💭
          </p>
          <p className="mt-3 text-sm text-[#8A8190]">
            Start tracking your mood and we&apos;ll show you your patterns here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-[28px] border border-[#D4C5E2] bg-gradient-to-br from-[#F9F5FC] to-white p-5 shadow-sm">
            <div className="mb-4 text-center">
              <p className="text-4xl">{getMoodEmoji(avgMood)}</p>
              <p className="mt-2 text-sm text-[#8A8190]">Your average mood</p>
              <p className="mt-1 text-2xl font-semibold text-[#4B3B5A]">{avgMood}/5</p>
            </div>
            <p className="text-center text-sm text-[#5D4E68]">{trendMessages[trend]}</p>
          </div>

          <div className="rounded-[28px] border border-[#EAE1F2] bg-white/80 p-5 shadow-sm">
            <p className="font-medium text-[#4B3B5A]">Recent check-ins 📊</p>
            <p className="mt-2 text-sm text-[#8A8190]">
              You&apos;ve checked in <span className="font-semibold text-[#4B3B5A]">{recentCount}</span> times.
            </p>
            <div className="mt-4 space-y-2">
              {checkIns.slice(0, 5).map((ci, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-[16px] bg-[#F8F3FB] px-3 py-2">
                  <span className="text-sm text-[#5D4E68]">
                    {new Date(ci.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="text-lg">{getMoodEmoji(typeof ci.mood === 'number' ? ci.mood : 3)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
