import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { CheckInRecord } from '../types/database'

const STORAGE_KEY = 'be-side-check-ins'

export function useCheckIns() {
  const [checkIns, setCheckIns] = useState<CheckInRecord[]>([])

  useEffect(() => {
    const hydrateFromStorage = () => {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          setCheckIns(JSON.parse(stored) as CheckInRecord[])
        } catch {
          setCheckIns([])
        }
      }
    }

    const client = supabase
    if (!client) {
      hydrateFromStorage()
      return
    }

    const loadFromSupabase = async () => {
      const {
        data: { user },
      } = await client.auth.getUser()

      if (!user) {
        hydrateFromStorage()
        return
      }

      const { data, error } = await client
        .from('check_ins')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (!error) {
        setCheckIns((data ?? []) as CheckInRecord[])
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data ?? []))
      } else {
        hydrateFromStorage()
      }
    }

    void loadFromSupabase()
  }, [])

  const saveCheckIn = async (checkIn: CheckInRecord) => {
    const next = [checkIn, ...checkIns]
    setCheckIns(next)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))

    const client = supabase
    if (!client) return

    const {
      data: { user },
    } = await client.auth.getUser()

    if (!user) return

    const { error } = await client.from('check_ins').insert({
      ...checkIn,
      user_id: user.id,
    })

    if (error) {
      console.error('Failed to sync check-in:', error)
    }
  }

  return { checkIns, saveCheckIn }
}
