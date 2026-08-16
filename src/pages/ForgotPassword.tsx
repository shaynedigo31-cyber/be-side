import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, ArrowLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { useAuth } from '../hooks/useAuth'

const resetSchema = z.object({
  email: z.string().email('Please enter a valid email.'),
})

export default function ForgotPassword() {
  const { resetPassword } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(resetSchema) })

  const onSubmit = async (values: z.infer<typeof resetSchema>) => {
    const { error } = await resetPassword(values.email)

    if (!error) {
      alert('A reset link is on the way.')
      return
    }

    alert(error.message || 'Something did not work. That is okay — let’s try again.')
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-8">
      <div className="rounded-[30px] border border-[#EAE1F2] bg-white/80 p-6 shadow-[0_12px_35px_rgba(75,59,90,0.08)]">
        <Link to="/login" className="mb-5 inline-flex items-center gap-2 text-sm text-[#6E5E7A]">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </Link>

        <h1 className="text-3xl font-semibold text-[#4B3B5A]">Reset your password.</h1>
        <p className="mt-3 text-sm text-[#8A8190]">
          We can send a gentle reset link to your email.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm text-[#5D4E68]">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email
            </span>
            <input
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              className="w-full rounded-[18px] border border-[#EAE1F2] bg-[#FAF8FC] px-4 py-3 text-sm text-[#4B3B5A] outline-none focus:border-[#8B6FB3] focus:ring-4 focus:ring-[#EDE7F6]"
            />
            {errors.email && <p className="mt-1 text-xs text-[#B05A5A]">{String(errors.email.message)}</p>}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 w-full rounded-[22px] bg-[#8B6FB3] px-4 py-3 text-sm font-medium text-white shadow-[0_12px_30px_rgba(139,111,179,0.2)] disabled:opacity-70"
          >
            {isSubmitting ? 'Sending…' : 'Send reset link'}
          </button>
        </form>
      </div>
    </div>
  )
}
