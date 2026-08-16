import { z } from 'zod'

export const checkInSchema = z.object({
  mood: z.string().optional(),
  energy: z.string().optional(),
  sleep_quality: z.string().optional(),
  thoughts: z.string().max(500).optional(),
  current_need: z.string().optional(),
  note: z.string().max(500).optional(),
})

export const journalSchema = z.object({
  title: z.string().min(1).max(80),
  content: z.string().min(1).max(2000),
  mood: z.string().min(1),
  song: z.string().max(120).optional(),
  tags: z.array(z.string()).optional(),
})
