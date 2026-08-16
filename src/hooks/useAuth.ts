import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export type AuthUser = {
  id: string
  email?: string | null
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return undefined
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ? { id: session.user.id, email: session.user.email } : null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { id: session.user.id, email: session.user.email } : null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      return { error: { message: 'Supabase credentials are not configured yet.' } }
    }

    return supabase.auth.signInWithPassword({ email, password })
  }

  const signUp = async (email: string, password: string) => {
    if (!supabase) {
      return { error: { message: 'Supabase credentials are not configured yet.' } }
    }

    return supabase.auth.signUp({ email, password })
  }

  const resetPassword = async (email: string) => {
    if (!supabase) {
      return { error: { message: 'Supabase credentials are not configured yet.' } }
    }

    return supabase.auth.resetPasswordForEmail(email)
  }

  const signOut = async () => {
    if (!supabase) {
      return { error: { message: 'Supabase credentials are not configured yet.' } }
    }

    return supabase.auth.signOut()
  }

  return { user, loading, signIn, signUp, signOut, resetPassword }
}
