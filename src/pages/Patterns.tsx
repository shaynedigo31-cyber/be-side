export default function Patterns() {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-6">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.28em] text-[#8A8190]">My patterns</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#4B3B5A]">Your recent pattern.</h1>
      </div>

      <div className="rounded-[28px] border border-[#EAE1F2] bg-white/80 p-5 shadow-sm">
        <p className="text-base leading-relaxed text-[#5D4E68]">
          Something feels a little different lately.
        </p>
        <p className="mt-3 text-sm text-[#8A8190]">
          Your recent check-ins show that you&apos;ve been feeling more energetic.
        </p>
        <p className="mt-4 text-sm text-[#6E5E7A]">
          Would you like to slow down and look at your recent days?
        </p>
      </div>
    </div>
  )
}
