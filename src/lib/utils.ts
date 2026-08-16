import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function getGreeting() {
  const hour = new Date().getHours()

  if (hour < 12) return 'Good morning, Love.'
  if (hour < 18) return 'Good afternoon, Love.'
  if (hour < 22) return 'Good evening, Love.'
  return 'Good night, Love.'
}

export function getAffirmationByIndex(index: number) {
  const affirmations = [
    "You don't have to be okay every day.",
    'One moment at a time.',
    'Rest is still progress.',
    "You're allowed to take your time.",
    "You don't have to figure everything out tonight.",
  ]

  return affirmations[index % affirmations.length]
}
