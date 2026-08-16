export type MoodOption = 'Heavy' | 'Okay' | 'Good' | 'Really good' | 'Wonderful'
export type EnergyOption = 'Very low' | 'Normal' | 'High' | 'Very high'
export type SleepOption = 'Not enough' | 'Okay' | 'Good' | 'Very good'
export type NeedOption =
  | 'I need comfort'
  | 'I need quiet'
  | 'I want to talk'
  | 'I want a distraction'
  | 'I need rest'
  | "I don't know"

export type CheckInStep = {
  id: string
  question: string
  type: 'mood' | 'energy' | 'sleep' | 'thoughts' | 'need' | 'complete'
  options?: string[]
}
