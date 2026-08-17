import { Search, Plus, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import type { JournalEntry } from '../types/journal'

const STORAGE_KEY = 'be-side-journal'

const sampleEntries: JournalEntry[] = [
  {
    id: '1',
    title: 'A quiet evening',
    content: 'I needed to rest and not fix everything. The room felt softer after I sat down.',
    mood: 'Good',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: ['rest', 'gentle'],
  },
]

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>(sampleEntries)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setEntries(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  const filteredEntries = useMemo(() => {
    const value = search.toLowerCase()
    return entries.filter((entry) => {
      return (
        entry.title.toLowerCase().includes(value) ||
        entry.content.toLowerCase().includes(value) ||
        entry.mood.toLowerCase().includes(value)
      )
    })
  }, [entries, search])

  const handleDelete = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id))
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 flex items-center justify-between"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#8A8190]">Journal</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#4B3B5A]">Your little corner. 📝</h1>
        </div>
        <Link
          to="/journal/new"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#8B6FB3] to-[#9A7DBF] text-white shadow-[0_10px_24px_rgba(139,111,179,0.3)] transition-all hover:scale-110 active:scale-95"
          aria-label="Create journal entry"
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
        </Link>
      </motion.div>

      <motion.label
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative mb-5 block"
      >
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A8190]" aria-hidden="true" />
        <input
          aria-label="Search journal entries"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search entries..."
          className="w-full rounded-[22px] border-2 border-[#EAE1F2] bg-white/80 py-3 pl-11 pr-4 text-sm text-[#4B3B5A] outline-none transition-all focus:border-[#8B6FB3] focus:ring-4 focus:ring-[#EDE7F6]"
        />
      </motion.label>

      {filteredEntries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[28px] border-2 border-dashed border-[#D9CFE8] bg-gradient-to-br from-[#F8F3FB] to-white p-6 text-center text-[#5D4E68]"
        >
          <p className="text-lg font-medium">Your little corner is still quiet. 🌙</p>
          <p className="mt-2 text-sm text-[#8A8190]">
            Whenever you&apos;re ready, you can leave something here.
          </p>
        </motion.div>
      ) : (
        <motion.div className="space-y-3">
          {filteredEntries.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group rounded-[24px] border-2 border-[#EAE1F2] bg-gradient-to-r from-white to-[#FAF8FC] p-4 shadow-sm transition-all hover:border-[#8B6FB3] hover:shadow-md"
            >
              <Link to={`/journal/${entry.id}`} className="block">
                <h3 className="font-semibold text-[#4B3B5A] group-hover:text-[#8B6FB3] transition-colors">
                  {entry.title}
                </h3>
                <p className="mt-1 text-sm text-[#8A8190] line-clamp-2">{entry.content}</p>
                <div className="mt-2 flex items-center justify-between text-xs text-[#8A8190]">
                  <span>{format(new Date(entry.created_at), 'MMM d, yyyy')}</span>
                  <span className="rounded-full bg-[#F3EDF9] px-2 py-1 text-[#8B6FB3]">{entry.mood}</span>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(entry.id)}
                className="mt-2 flex w-full items-center gap-2 rounded-[12px] bg-[#FFF8F8] px-2 py-1 text-xs text-[#8B5A5A] transition-all opacity-0 group-hover:opacity-100 hover:bg-[#FFECEC]"
              >
                <Trash2 className="h-3 w-3" aria-hidden="true" />
                Delete
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
