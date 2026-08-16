import { ShieldAlert, PhoneCall } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SafetySupport() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-8">
      <div className="rounded-[30px] border border-[#F2D9D9] bg-[#FFF9F9] p-6 shadow-[0_12px_35px_rgba(75,59,90,0.08)]">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FDECEC] text-[#B05A5A]">
          <ShieldAlert className="h-6 w-6" aria-hidden="true" />
        </div>

        <h1 className="text-3xl font-semibold text-[#4B3B5A]">You deserve support right now.</h1>
        <p className="mt-3 text-base leading-relaxed text-[#5D4E68]">
          If you are in immediate danger or feel unsafe, please contact a trusted person,
          a healthcare professional, or local emergency services right away.
        </p>

        <div className="mt-5 space-y-3 rounded-[22px] bg-white/80 p-4 text-sm text-[#4B3B5A]">
          <div className="flex items-center gap-3">
            <PhoneCall className="h-4 w-4 text-[#8B6FB3]" aria-hidden="true" />
            <span>Call a trusted person or local emergency support.</span>
          </div>
          <div>
            <p className="font-medium">You are not alone.</p>
          </div>
        </div>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-[22px] bg-[#8B6FB3] px-5 py-3 text-sm font-medium text-white"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
