import { Heart, MessageSquareText, MoonStar, Sparkles } from 'lucide-react'

const options = [
  '🫂 Stay close',
  '🌙 Give me space',
  '💬 Talk to me',
  '🎧 Distract me',
  '🤍 Just be there',
]

export default function Us() {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-6">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.28em] text-[#8A8190]">Us 💜</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#4B3B5A]">A little private note.</h1>
      </div>

      <div className="rounded-[28px] border border-[#EAE1F2] bg-white/80 p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F4DCEB] text-[#8B6FB3]">
            <Heart className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="font-medium text-[#4B3B5A]">What would feel good today?</p>
            <p className="text-sm text-[#8A8190]">Only what you choose to share.</p>
          </div>
        </div>

        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className="flex w-full items-center justify-between rounded-[20px] border border-[#EAE1F2] bg-[#FAF8FC] px-4 py-3 text-left text-base text-[#4B3B5A]"
            >
              <span>{option}</span>
              <span className="text-[#8A8190]">
                {option.includes('💬') ? <MessageSquareText className="h-4 w-4" /> : null}
                {option.includes('🌙') ? <MoonStar className="h-4 w-4" /> : null}
                {option.includes('🤍') ? <Sparkles className="h-4 w-4" /> : null}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
