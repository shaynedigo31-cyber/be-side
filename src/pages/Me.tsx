import { ArrowRight, Heart, MoonStar, Settings, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Me() {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-6">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.28em] text-[#8A8190]">Me</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#4B3B5A]">Your little patterns.</h1>
      </div>

      <div className="space-y-4">
        {[
          {
            title: 'My patterns',
            text: 'Something you have noticed',
            icon: MoonStar,
            href: '/me/patterns',
          },
          {
            title: 'Things that help me',
            text: 'Gentle routines and reminders.',
            icon: Sparkles,
            href: '/comfort',
          },
          {
            title: 'My comfort',
            text: 'What helps you feel held.',
            icon: Heart,
            href: '/comfort',
          },
          {
            title: 'Settings',
            text: 'Privacy, sharing, notifications.',
            icon: Settings,
            href: '/settings',
          },
        ].map(({ title, text, icon: Icon, href }) => (
          <Link
            key={title}
            to={href}
            className="flex items-center justify-between rounded-[24px] border border-[#EAE1F2] bg-white/80 p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-[#F3EDF9] text-[#8B6FB3]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-medium text-[#4B3B5A]">{title}</p>
                <p className="text-sm text-[#8A8190]">{text}</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-[#8A8190]" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  )
}
