import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <p className="text-xs uppercase tracking-[0.32em] text-[#8A8190]">Be-side</p>
      <h1 className="mt-3 text-3xl font-semibold text-[#4B3B5A]">This page feels a little far away.</h1>
      <Link
        to="/"
        className="mt-6 rounded-[22px] bg-[#8B6FB3] px-5 py-3 text-sm font-medium text-white"
      >
        Take me home
      </Link>
    </div>
  )
}
