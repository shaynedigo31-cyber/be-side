import { Plus, Sparkles, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { comfortMessages } from '../data/comfortMessages'

const STORAGE_KEY = 'be-side-custom-comfort'

export default function Comfort() {
  const [showForm, setShowForm] = useState(false)
  const [input, setInput] = useState('')
  const [customNotes, setCustomNotes] = useState<string[]>([])

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setCustomNotes(JSON.parse(stored))
    }
  }, [])

  const handleAdd = () => {
    if (input.trim()) {
      const updated = [input, ...customNotes]
      setCustomNotes(updated)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      setInput('')
      setShowForm(false)
    }
  }

  const handleDelete = (note: string) => {
    const updated = customNotes.filter((n) => n !== note)
    setCustomNotes(updated)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#8A8190]">Comfort</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#4B3B5A]">Come here for a moment. 🤍</h1>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#8B6FB3] text-white transition-transform hover:scale-110"
          aria-label="Add comfort note"
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <p className="mb-5 text-base text-[#6E5E7A]">You don&apos;t have to explain anything.</p>

      {showForm && (
        <div className="mb-5 rounded-[24px] border border-[#8B6FB3] bg-gradient-to-br from-[#F8F3FB] to-white p-4 shadow-md">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What brings you comfort?"
            className="w-full resize-none rounded-[16px] border border-[#EAE1F2] bg-white p-3 text-[#4B3B5A] placeholder-[#A89FB5] focus:border-[#8B6FB3] focus:outline-none"
            rows={3}
          />
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 rounded-[12px] bg-[#8B6FB3] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#7A5DA0]"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setInput('')
              }}
              className="flex-1 rounded-[12px] border border-[#EAE1F2] bg-white px-4 py-2 text-sm font-medium text-[#4B3B5A] transition-all hover:bg-[#F8F3FB]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {customNotes.length > 0 && (
          <section className="rounded-[24px] border border-[#D4C5E2] bg-gradient-to-br from-[#F9F5FC] to-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-[#4B3B5A]">
              <span className="text-lg">💫</span>
              <h2 className="font-medium">Your comfort notes</h2>
            </div>
            <ul className="space-y-2 text-sm text-[#5D4E68]">
              {customNotes.map((note, idx) => (
                <li
                  key={idx}
                  className="flex items-start justify-between rounded-[16px] bg-white px-3 py-2 hover:bg-[#F8F3FB]"
                >
                  <span>{note}</span>
                  <button
                    type="button"
                    onClick={() => handleDelete(note)}
                    className="ml-2 text-[#8A8190] hover:text-[#8B6FB3]"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className="rounded-[24px] border border-[#EAE1F2] bg-white/80 p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-[#4B3B5A]">
            <Sparkles className="h-4 w-4 text-[#8B6FB3]" aria-hidden="true" />
            <h2 className="font-medium">Gentle reminders</h2>
          </div>
          <ul className="space-y-2 text-sm text-[#5D4E68]">
            {comfortMessages.map((message) => (
              <li key={message} className="rounded-[16px] bg-[#F8F3FB] px-3 py-2 hover:bg-[#F0E8FA]">
                {message}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
