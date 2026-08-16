import { type ReactNode } from 'react'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[28px] border border-[#EAE1F2] bg-white/80 p-5 shadow-sm ${className}`}>
      {children}
    </div>
  )
}
