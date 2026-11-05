'use client'

import { useEffect, useState } from 'react'
import { Globe } from 'lucide-react'

const cases = [
  {
    keywords: ['fever', 'cough', 'fatigue'],
    condition: 'Common Cold',
    snippet: 'Viral infection of the upper respiratory tract. Rest and fluids typically recommended.',
  },
  {
    keywords: ['headache', 'nausea'],
    condition: 'Migraine',
    snippet: 'Recurrent headache disorder. Pain relievers and rest in a dark room often help.',
  },
  {
    keywords: ['joint pain', 'swelling'],
    condition: 'Arthritis',
    snippet: 'Inflammation of one or more joints. Anti-inflammatory medication commonly used.',
  },
]

export function SymptomCheckerVisual({ className = '' }: { className?: string }) {
  const [index, setIndex] = useState(0)
  const [visibleChips, setVisibleChips] = useState(0)

  useEffect(() => {
    setVisibleChips(0)
    const chipId = window.setInterval(() => {
      setVisibleChips((c) => (c < cases[index].keywords.length ? c + 1 : c))
    }, 350)
    const caseId = window.setInterval(() => {
      setIndex((i) => (i + 1) % cases.length)
    }, 3200)
    return () => {
      window.clearInterval(chipId)
      window.clearInterval(caseId)
    }
  }, [index])

  const current = cases[index]

  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      {/* symptom extraction */}
      <div className="rounded-xl border border-hairline bg-canvas-raised p-3">
        <p className="mb-2 font-mono text-[9px] tracking-[0.14em] text-ink-subtle">SYMPTOM INPUT</p>
        <p className="mb-2.5 font-mono text-[10px] leading-5 text-ink-muted">
          &ldquo;I&apos;ve had {current.keywords.join(', ')}...&rdquo;
        </p>
        <div className="flex flex-wrap gap-1.5">
          {current.keywords.slice(0, visibleChips).map((word) => (
            <span
              key={word}
              className="animate-fade-slide-in rounded-full border border-hairline px-2 py-0.5 font-mono text-[9px] text-accent"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* condition lookup */}
      <div className="rounded-xl border border-hairline bg-canvas-raised p-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-mono text-[9px] tracking-[0.14em] text-ink-subtle">PREDICTED CONDITION</p>
          <span className="inline-flex items-center gap-1 font-mono text-[8px] text-ink-faint">
            <Globe className="size-2.5" strokeWidth={1.75} />
            web
          </span>
        </div>
        <p className="text-[11px] font-medium text-ink">{current.condition}</p>
        <p className="mt-1.5 text-[10.5px] leading-5 text-ink-muted">{current.snippet}</p>
      </div>
    </div>
  )
}