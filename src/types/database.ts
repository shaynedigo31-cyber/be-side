export type DatabaseUser = {
  id: string
  email?: string
  full_name?: string
  avatar_url?: string
  created_at?: string
}

export type CheckInRecord = {
  id: string
  user_id: string
  created_at: string
  mood: string
  energy: string
  sleep_quality: string
  sleep_duration?: number | null
  thoughts?: string | null
  current_need: string
  tags?: string[]
  note?: string | null
}

export type JournalEntryRecord = {
  id: string
  user_id: string
  title: string
  content: string
  mood: string
  created_at: string
  updated_at: string
  song?: string | null
  image_url?: string | null
  tags?: string[]
}

export type ComfortItemRecord = {
  id: string
  user_id: string
  label: string
  category: 'message' | 'habit' | 'song' | 'memory' | 'support'
  created_at: string
}

export type SharedStatus = {
  id: string
  user_id: string
  current_need?: string
  mood?: string
  custom_message?: string
  selected_journal_entry_id?: string | null
  is_public: boolean
  created_at: string
}

export type UserPreferences = {
  id: string
  user_id: string
  daily_checkin_reminder: boolean
  reminder_time: string
  journal_reminder: boolean
  theme: 'light' | 'soft'
  privacy_mode: 'private' | 'selective'
  updated_at: string
}
