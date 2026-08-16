import { type ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

const variants = {
  primary: 'bg-[#8B6FB3] text-white shadow-[0_12px_30px_rgba(139,111,179,0.2)]',
  secondary: 'border border-[#EDE7F6] bg-white text-[#4B3B5A]',
  ghost: 'bg-[#F3EDF9] text-[#4B3B5A]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className = '', variant = 'primary', type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`inline-flex items-center justify-center rounded-[22px] px-4 py-3 text-sm font-medium transition hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-[#EDE7F6] ${variants[variant]} ${className}`}
      {...props}
    />
  )
})
