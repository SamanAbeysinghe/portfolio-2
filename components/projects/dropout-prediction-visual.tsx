'use client'

import { useEffect, useState } from 'react'

const outcomes = [
  { label: 'Graduate', value: 62, tone: 'accent' as const },
  { label: 'Enrolled', value: 27, tone: 'muted' as const },
  { label: 'Dropout', value: 11, tone: 'risk' as const },
]

const scenarios = [
  [62, 27, 11],
  [38, 22, 40],
  [71, 19, 10],
]

export function DropoutPredictionVisual({ className = '' }: { className?: string }) {
  const [scenario, setScenario] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setScenario((s) => (s + 1) % scenarios.length)
    }, 2600)
    return () => window.clearInterval(id)
  }, [])

  const values = scenarios[scenario]

  return (
    <div className={`rounded-xl border border-hairline bg-canvas-raised p-3.5 ${className}`}>
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-[9px] tracking-[0.14em] text-ink-subtle">PREDICTED OUTCOME</p>
        <span className="font-mono text-[9px] text-ink-faint">student #{scenario + 1204}</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {outcomes.map((outcome, i) => {
          const value = values[i]
          const barColor =
            outcome.tone === 'risk' ? 'bg-amber-400' : outcome.tone === 'accent' ? 'bg-accent' : 'bg-ink-faint'
          return (
            <div key={outcome.label}>
              <div className="mb-1 flex items-center justify-between text-[10.5px]">
                <span className="text-ink-muted">{outcome.label}</span>
                <span className="font-mono text-ink-subtle">{value}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-canvas">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}