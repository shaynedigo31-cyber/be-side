import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import type { JournalEntry } from '../types/journal'

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

export default function JournalEntryPage() {
  const { id } = useParams()

  const entry = useMemo(
    () => sampleEntries.find((item) => item.id === id) ?? sampleEntries[0],
    [id],
  )

  return (
    <div className="mx-auto w-full max-w-md px-4 py-6">
      <div className="mb-5 flex items-center justify-between">
        <Link to="/journal" className="flex items-center gap-2 text-sm text-[#6E5E7A]">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </Link>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Edit entry"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3EDF9] text-[#4B3B5A]"
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Delete entry"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FCE7EC] text-[#4B3B5A]"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <article className="rounded-[28px] border border-[#EAE1F2] bg-white/80 p-5 shadow-sm">
        <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#8A8190]">
          {format(new Date(entry.created_at), 'MMMM d, yyyy')}
        </p>
        <h1 className="text-3xl font-semibold text-[#4B3B5A]">{entry.title}</h1>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#EDE7F6] px-3 py-1 text-[11px] font-medium text-[#4B3B5A]">
            {entry.mood}
          </span>
          {entry.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#EAE1F2] bg-[#FAF8FC] px-3 py-1 text-[11px] text-[#6E5E7A]"
            >
              #{tag}
            </span>
          ))}
        </div>

        <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-[#53495E]">
          {entry.content}
        </p>
      </article>
    </div>
  )
}
