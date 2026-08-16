import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Check, SkipForward } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type StepAnswers = {
  mood?: string
  energy?: string
  sleep_quality?: string
  thoughts?: string
  current_need?: string
}

const steps = [
  {
    key: 'mood',
    question: 'How does your heart feel today?',
    type: 'choice',
    options: ['🌧️ Heavy', '🌱 Okay', '🌤️ Good', '☀️ Really good', '✨ Wonderful'],
  },
  {
    key: 'energy',
    question: 'And your energy?',
    type: 'choice',
    options: ['🥱 Very low', '🌱 Normal', '⚡ High', '✨ Very high'],
  },
  {
    key: 'sleep_quality',
    question: 'How did you sleep?',
    type: 'choice',
    options: ['😴 Not enough', '🌙 Okay', '☁️ Good', '💤 Very good'],
  },
  {
    key: 'thoughts',
    question: 'Anything on your mind?',
    type: 'textarea',
  },
  {
    key: 'current_need',
    question: 'What do you need right now?',
    type: 'choice',
    options: [
      '🫂 I need comfort',
      '🌙 I need quiet',
      '💬 I want to talk',
      '🎧 I want a distraction',
      '🛌 I need rest',
      "💜 I don't know",
    ],
  },
] as const

export default function CheckIn() {
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<StepAnswers>({})

  const currentStep = steps[stepIndex]
  const progress = useMemo(
    () => ((stepIndex + 1) / steps.length) * 100,
    [stepIndex],
  )

  const updateAnswer = (value: string) => {
    const currentKey = currentStep.key
    setAnswers((prev) => ({ ...prev, [currentKey]: value }))
    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1)
    }
  }

  const openNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1)
      return
    }

    const record = {
      ...answers,
      timestamp: new Date().toISOString(),
    }

    localStorage.setItem('be-side-checkin-last', JSON.stringify(record))
    navigate('/')
  }

  const isComplete = stepIndex === steps.length - 1 && answers.current_need

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-sm text-[#6E5E7A]">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Home
        </Link>
        <span className="text-xs text-[#8A8190]">{stepIndex + 1} / {steps.length}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[#EDE7F6]">
        <motion.div
          className="h-full rounded-full bg-[#8B6FB3]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.key}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.3 }}
          className="rounded-[28px] border border-[#EDE7F6] bg-white/80 p-5 shadow-[0_12px_35px_rgba(75,59,90,0.08)]"
        >
          {currentStep.type === 'textarea' ? (
            <>
              <h2 className="mb-4 text-2xl font-semibold leading-tight text-[#4B3B5A]">
                {currentStep.question}
              </h2>
              <textarea
                aria-label="Anything on your mind"
                value={answers.thoughts ?? ''}
                onChange={(event) =>
                  setAnswers((prev) => ({ ...prev, thoughts: event.target.value }))
                }
                placeholder="Write anything. It doesn't have to make sense."
                className="min-h-[150px] w-full rounded-[22px] border border-[#EAE1F2] bg-[#FFF9F2] px-4 py-3 text-base text-[#4B3B5A] outline-none transition focus:border-[#8B6FB3] focus:ring-4 focus:ring-[#EDE7F6]"
              />
            </>
          ) : (
            <>
              <h2 className="mb-5 text-2xl font-semibold leading-tight text-[#4B3B5A]">
                {currentStep.question}
              </h2>

              <div className="space-y-3">
                {currentStep.options?.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => updateAnswer(option)}
                    className="flex w-full items-center justify-between rounded-[20px] border border-[#EAE1F2] bg-[#FAF8FC] px-4 py-3 text-left text-base text-[#4B3B5A] transition hover:border-[#CCB9E6] hover:bg-[#F3EDF9] focus:outline-none focus:ring-4 focus:ring-[#EDE7F6]"
                  >
                    <span>{option}</span>
                    {answers[currentStep.key] === option && (
                      <Check className="h-4 w-4 text-[#8B6FB3]" aria-hidden="true" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => {
            if (currentStep.type === 'textarea') {
              openNext()
              return
            }
            if (stepIndex < steps.length - 1) {
              setStepIndex((prev) => prev + 1)
            } else {
              openNext()
            }
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-[22px] border border-[#EDE7F6] bg-white px-4 py-3 text-sm font-medium text-[#4B3B5A]"
        >
          <SkipForward className="h-4 w-4" aria-hidden="true" />
          Skip
        </button>

        <button
          type="button"
          onClick={openNext}
          className="flex flex-1 items-center justify-center rounded-[22px] bg-[#8B6FB3] px-4 py-3 text-sm font-medium text-white shadow-[0_12px_30px_rgba(139,111,179,0.2)]"
        >
          {stepIndex === steps.length - 1 ? 'Done' : 'Next'}
        </button>
      </div>

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[28px] bg-[#F4DCEB] p-5 text-center text-[#4B3B5A]"
        >
          <p className="text-xl font-semibold">Thank you for checking in, Love. 💜</p>
          <p className="mt-2 text-sm text-[#5A4B61]">
            You don&apos;t have to solve everything right now.
          </p>
          <p className="mt-1 text-sm text-[#5A4B61]">Take it one moment at a time.</p>
        </motion.div>
      )}
    </div>
  )
}
