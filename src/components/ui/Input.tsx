import { forwardRef, type InputHTMLAttributes } from 'react'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className = '', ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={`w-full rounded-[18px] border border-[#EAE1F2] bg-[#FAF8FC] px-4 py-3 text-sm text-[#4B3B5A] outline-none transition focus:border-[#8B6FB3] focus:ring-4 focus:ring-[#EDE7F6] ${className}`}
      {...props}
    />
  )
})
