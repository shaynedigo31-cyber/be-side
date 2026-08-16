import { BookOpen, Heart, House, Leaf } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  { label: 'Home', to: '/', icon: House },
  { label: 'Journal', to: '/journal', icon: BookOpen },
  { label: 'Me', to: '/me', icon: Leaf },
  { label: 'Us', to: '/us', icon: Heart },
]

export default function BottomNav() {
  return (
    <nav className="sticky bottom-0 z-20 border-t border-[#EAE1F2] bg-[#FAF8FC]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-md items-center justify-around gap-2 px-2 py-2">
        {items.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-[18px] px-2 py-2 text-[11px] transition ${
                isActive
                  ? 'bg-[#F3EDF9] text-[#4B3B5A]'
                  : 'text-[#8A8190] hover:bg-[#F4F0F7]'
              }`
            }
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
