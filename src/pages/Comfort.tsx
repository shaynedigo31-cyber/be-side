import { Plus, Sparkles } from 'lucide-react'
import { comfortMessages } from '../data/comfortMessages'

export default function Comfort() {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#8A8190]">Comfort</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#4B3B5A]">Come here for a moment. 🤍</h1>
        </div>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#8B6FB3] text-white"
          aria-label="Add comfort note"
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <p className="mb-5 text-base text-[#6E5E7A]">You don&apos;t have to explain anything.</p>

      <div className="space-y-4">
        <section className="rounded-[24px] border border-[#EAE1F2] bg-white/80 p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-[#4B3B5A]">
            <Sparkles className="h-4 w-4 text-[#8B6FB3]" aria-hidden="true" />
            <h2 className="font-medium">Comfort messages</h2>
          </div>
          <ul className="space-y-2 text-sm text-[#5D4E68]">
            {comfortMessages.map((message) => (
              <li key={message} className="rounded-[16px] bg-[#F8F3FB] px-3 py-2">
                {message}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
