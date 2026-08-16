import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Lock, Sparkles } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useAuth } from '../hooks/useAuth'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
})

export default function Login() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const { error } = await signIn(values.email, values.password)

    if (!error) {
      navigate('/')
      return
    }

    alert(error.message || 'Something did not work. That is okay — let’s try again.')
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-8">
      <div className="rounded-[30px] border border-[#EAE1F2] bg-white/80 p-6 shadow-[0_12px_35px_rgba(75,59,90,0.08)]">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#F3EDF9] text-[#8B6FB3]">
            <Sparkles className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#8A8190]">BE-SIDE</p>
          <h1 className="mt-3 text-3xl font-semibold text-[#4B3B5A]">Welcome back.</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm text-[#5D4E68]">
              <Lock className="h-4 w-4" aria-hidden="true" />
              Password
            </span>
            <input
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className="w-full rounded-[18px] border border-[#EAE1F2] bg-[#FAF8FC] px-4 py-3 text-sm text-[#4B3B5A] outline-none focus:border-[#8B6FB3] focus:ring-4 focus:ring-[#EDE7F6]"
            />
            {errors.password && <p className="mt-1 text-xs text-[#B05A5A]">{String(errors.password.message)}</p>}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-[22px] bg-[#8B6FB3] px-4 py-3 text-sm font-medium text-white shadow-[0_12px_30px_rgba(139,111,179,0.2)] disabled:opacity-70"
          >
            {isSubmitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <div className="mt-5 space-y-2 text-center text-sm text-[#6E5E7A]">
          <p>
            Need an account?{' '}
            <Link to="/register" className="font-medium text-[#8B6FB3]">
              Create one
            </Link>
          </p>
          <p>
            <Link to="/forgot-password" className="text-[#6E5E7A]">
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
