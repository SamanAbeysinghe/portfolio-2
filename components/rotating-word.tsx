'use client'

import { useEffect, useState } from 'react'

const words = ['document-heavy workflows.', 'private knowledge bases.', 'real-world images.', 'customer conversations.']

const TYPING_SPEED = 65
const DELETING_SPEED = 30
const PAUSE_AFTER_TYPE = 1800
const PAUSE_AFTER_DELETE = 300

export function RotatingWord() {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'deleting'>('typing')

  useEffect(() => {
    const current = words[wordIndex]

    if (phase === 'typing') {
      if (text.length < current.length) {
        const t = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPING_SPEED)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setPhase('deleting'), PAUSE_AFTER_TYPE)
      return () => clearTimeout(t)
    }

    // phase === 'deleting'
    if (text.length > 0) {
      const t = setTimeout(() => setText(text.slice(0, -1)), DELETING_SPEED)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setWordIndex((i) => (i + 1) % words.length)
      setPhase('typing')
    }, PAUSE_AFTER_DELETE)
    return () => clearTimeout(t)
  }, [text, phase, wordIndex])

  return (
    <span className="inline text-accent">
      {text}
      <span
        className="ml-0.5 inline-block w-[2px] animate-pulse bg-accent align-middle"
        style={{ height: '0.85em' }}
      />
    </span>
  )
}