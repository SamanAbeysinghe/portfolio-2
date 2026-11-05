'use client'

import { useEffect, useState } from 'react'
import { Leaf, Droplet } from 'lucide-react'

const diagnoses = [
  { name: 'Nitrogen deficiency', remedy: 'Apply a nitrogen-rich fertilizer in split doses.' },
  { name: 'Magnesium deficiency', remedy: 'Add dolomite lime or a foliar magnesium spray.' },
  { name: 'Potassium deficiency', remedy: 'Increase potash application during fruiting stage.' },
]

export function LeafDeficiencyVisual({ className = '' }: { className?: string }) {
  const [index, setIndex] = useState(0)
  const [confidence, setConfidence] = useState(96)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % diagnoses.length)
      setConfidence(90 + Math.round(Math.random() * 8))
    }, 2600)
    return () => window.clearInterval(id)
  }, [])

  const current = diagnoses[index]

  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      {/* leaf classification */}
      <div className="rounded-xl border border-hairline bg-canvas-raised p-3">
        <p className="mb-2 font-mono text-[9px] tracking-[0.14em] text-ink-subtle">LEAF CLASSIFICATION</p>
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg border border-hairline bg-canvas/60">
            <Leaf className="size-4 text-accent" strokeWidth={1.75} />
          </div>
          <div className="flex-1">
            <p className="text-[10.5px] text-ink-muted">Black pepper leaf</p>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-canvas">
              <div
                className="h-full rounded-full bg-accent transition-all duration-700 ease-out"
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>
        </div>
        <p className="mt-2 font-mono text-[9px] text-ink-faint">{confidence}% confidence</p>
      </div>

      {/* diagnosis */}
      <div className="rounded-xl border border-hairline bg-canvas-raised p-3">
        <p className="mb-2 font-mono text-[9px] tracking-[0.14em] text-ink-subtle">DIAGNOSIS</p>
        <div className="flex items-center gap-1.5">
          <Droplet className="size-3.5 shrink-0 text-accent" strokeWidth={1.75} />
          <p className="text-[11px] font-medium text-ink transition-opacity duration-500">{current.name}</p>
        </div>
        <p className="mt-2 text-[10.5px] leading-5 text-ink-muted transition-opacity duration-500">
          {current.remedy}
        </p>
      </div>
    </div>
  )
}