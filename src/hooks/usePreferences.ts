import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export type UserPreferences = {
  dailyCheckInReminder: boolean
  reminderTime: string
  journalReminder: boolean
  theme: 'light' | 'soft'
}

const STORAGE_KEY = 'be-side-preferences'

const defaultPreferences: UserPreferences = {
  dailyCheckInReminder: false,
  reminderTime: '20:00',
  journalReminder: false,
  theme: 'soft',
}

export function usePreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences)

  useEffect(() => {
    const hydrateFromStorage = () => {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          setPreferences({ ...defaultPreferences, ...JSON.parse(stored) })
        } catch {
          setPreferences(defaultPreferences)
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
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()

      if (!error && data) {
        const next: UserPreferences = {
          dailyCheckInReminder: Boolean(data.daily_checkin_reminder),
          reminderTime: String(data.reminder_time ?? '20:00'),
          journalReminder: Boolean(data.journal_reminder),
          theme: data.theme === 'light' ? 'light' : 'soft',
        }
        setPreferences(next)
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } else {
        hydrateFromStorage()
      }
    }

    void loadFromSupabase()
  }, [])

  const updatePreferences = async (next: Partial<UserPreferences>) => {
    const updated = { ...preferences, ...next }
    setPreferences(updated)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

    const client = supabase
    if (!client) return

    const {
      data: { user },
    } = await client.auth.getUser()

    if (!user) return

    const { error } = await client.from('user_preferences').upsert({
      user_id: user.id,
      daily_checkin_reminder: updated.dailyCheckInReminder,
      reminder_time: updated.reminderTime,
      journal_reminder: updated.journalReminder,
      theme: updated.theme,
      privacy_mode: 'private',
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error('Failed to sync preferences:', error)
    }
  }

  return { preferences, updatePreferences }
}
