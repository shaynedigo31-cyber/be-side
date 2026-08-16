import { Heart, Check } from 'lucide-react'
import { useState, useEffect } from 'react'

const options = [
  { label: '🫂 Stay close', key: 'stay-close' },
  { label: '🌙 Give me space', key: 'space' },
  { label: '💬 Talk to me', key: 'talk' },
  { label: '🎧 Distract me', key: 'distract' },
  { label: '🤍 Just be there', key: 'be-there' },
]

const STORAGE_KEY = 'be-side-shared-mood'

export default function Us() {
  const [selected, setSelected] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      setSelected(data.key)
      setLastUpdated(new Date(data.timestamp))
    }
  }, [])

  const handleSelect = (key: string) => {
    setSelected(key)
    const now = new Date()
    setLastUpdated(now)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ key, timestamp: now }))
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-6">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.28em] text-[#8A8190]">Us 💜</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#4B3B5A]">A little private note.</h1>
      </div>

      <div className="rounded-[28px] border border-[#D4C5E2] bg-gradient-to-br from-[#F9F5FC] to-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F4DCEB] text-[#8B6FB3]">
            <Heart className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="font-medium text-[#4B3B5A]">What would feel good today?</p>
            <p className="text-sm text-[#8A8190]">Only what you choose to share.</p>
          </div>
        </div>

        <div className="space-y-2">
          {options.map(({ label, key }) => {
            const isSelected = selected === key
            const baseClass = 'relative flex w-full items-center justify-between rounded-[20px] border-2 px-4 py-3 text-left text-base font-medium transition-all'
            const selectedClass = baseClass + ' border-[#8B6FB3] bg-[#F3EDF9] text-[#4B3B5A] shadow-md'
            const unselectedClass = baseClass + ' border-[#EAE1F2] bg-[#FAF8FC] text-[#4B3B5A] hover:border-[#D4C5E2]'
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelect(key)}
                className={isSelected ? selectedClass : unselectedClass}
              >
                <span>{label}</span>
                {isSelected && (
                  <Check className="h-5 w-5 text-[#8B6FB3]" aria-hidden="true" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {lastUpdated && (
        <div className="mt-4 rounded-[20px] border border-[#EAE1F2] bg-[#F8F3FB] p-4 text-center">
          <p className="text-xs text-[#8A8190]">Last shared</p>
          <p className="mt-1 text-sm font-medium text-[#4B3B5A]">{getTimeAgo(lastUpdated)}</p>
        </div>
      )}
    </div>
  )
}

