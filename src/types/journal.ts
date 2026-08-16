export type JournalEntry = {
  id: string
  title: string
  content: string
  mood: string
  created_at: string
  updated_at: string
  song?: string
  tags: string[]
}

export type JournalDraft = {
  title: string
  content: string
  mood: string
  song?: string
  tags: string[]
}
