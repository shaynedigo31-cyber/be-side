import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { JournalEntry } from '../types/journal'

const STORAGE_KEY = 'be-side-journal'

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([])

  useEffect(() => {
    const hydrateFromStorage = () => {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          setEntries(JSON.parse(stored) as JournalEntry[])
        } catch {
          setEntries([])
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
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (!error) {
        setEntries((data ?? []) as JournalEntry[])
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data ?? []))
      } else {
        hydrateFromStorage()
      }
    }

    void loadFromSupabase()
  }, [])

  const saveEntry = async (entry: JournalEntry) => {
    const next = [entry, ...entries]
    setEntries(next)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))

    const client = supabase
    if (!client) return

    const {
      data: { user },
    } = await client.auth.getUser()

    if (!user) return

    const { error } = await client.from('journal_entries').insert({
      ...entry,
      user_id: user.id,
    })

    if (error) {
      console.error('Failed to sync journal entry:', error)
    }
  }

  const deleteEntry = async (id: string) => {
    const next = entries.filter((entry) => entry.id !== id)
    setEntries(next)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))

    const client = supabase
    if (!client) return

    const {
      data: { user },
    } = await client.auth.getUser()

    if (!user) return

    const { error } = await client.from('journal_entries').delete().eq('id', id).eq('user_id', user.id)

    if (error) {
      console.error('Failed to delete journal entry:', error)
    }
  }

  return { entries, saveEntry, deleteEntry }
}
