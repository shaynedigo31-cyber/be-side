import { Search, Plus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
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

  return (
    <div className="mx-auto w-full max-w-md px-4 py-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#8A8190]">Journal</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#4B3B5A]">Your little corner.</h1>
        </div>
        <Link
          to="/journal/new"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#8B6FB3] text-white shadow-[0_10px_24px_rgba(139,111,179,0.2)]"
          aria-label="Create journal entry"
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>

      <label className="relative mb-5 block">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A8190]" aria-hidden="true" />
        <input
          aria-label="Search journal entries"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search entries"
          className="w-full rounded-[22px] border border-[#EAE1F2] bg-white/80 py-3 pl-11 pr-4 text-sm text-[#4B3B5A] outline-none focus:border-[#8B6FB3] focus:ring-4 focus:ring-[#EDE7F6]"
        />
      </label>

      {filteredEntries.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-[#D9CFE8] bg-[#F8F3FB] p-6 text-center text-[#5D4E68]">
          <p className="text-lg font-medium">Your little corner is still quiet.</p>
          <p className="mt-2 text-sm text-[#8A8190]">
            Whenever you&apos;re ready, you can leave something here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <Link
              key={entry.id}
              to={`/journal/${entry.id}`}
              className="block rounded-[24px] border border-[#EAE1F2] bg-white/80 p-4 shadow-sm transition hover:border-[#D3C2E6]"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-[#4B3B5A]">{entry.title}</h2>
                <span className="rounded-full bg-[#F4DCEB] px-2 py-1 text-[10px] font-medium text-[#4B3B5A]">
                  {entry.mood}
                </span>
              </div>
              <p className="line-clamp-3 text-sm text-[#6E5E7A]">{entry.content}</p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[#8A8190]">
                {format(new Date(entry.created_at), 'MMM d, yyyy')}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
