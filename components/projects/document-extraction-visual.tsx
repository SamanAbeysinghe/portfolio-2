'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'

const rules = [
  { label: 'Signature field present', passed: true },
  { label: 'All required answers filled', passed: true },
  { label: 'Handwriting confidence ≥ 90%', passed: true },
  { label: 'Date field matches format', passed: false },
]

export function DocumentExtractionVisual({ className = '' }: { className?: string }) {
  const [scanning, setScanning] = useState(true)

  useEffect(() => {
    const id = window.setInterval(() => setScanning((s) => !s), 2600)
    return () => window.clearInterval(id)
  }, [])

  const passedCount = rules.filter((r) => r.passed).length

  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      {/* document mockup with scan line + YOLO-style bounding boxes */}
      <div className="rounded-xl border border-hairline bg-canvas-raised p-3">
        <p className="mb-2 font-mono text-[9px] tracking-[0.14em] text-ink-subtle">DOCUMENT SCAN</p>
        <div className="relative h-28 overflow-hidden rounded-lg border border-hairline-strong bg-canvas/70 p-2.5">
          {/* handwritten-line placeholders */}
          <div className="space-y-2 opacity-70">
            <div className="h-1 w-3/4 rounded bg-ink-faint/40" />
            <div className="h-1 w-1/2 rounded bg-ink-faint/40" />
            <div className="h-1 w-5/6 rounded bg-ink-faint/40" />
            <div className="h-1 w-2/3 rounded bg-ink-faint/40" />
          </div>

          {/* detected question field */}
          <div className="absolute left-2 top-2 rounded border border-dashed border-accent/70 px-1.5 py-0.5">
            <span className="font-mono text-[8px] leading-none text-accent">Q</span>
          </div>
          {/* detected answer field */}
          <div className="absolute bottom-3 right-2 rounded border border-dashed border-accent/70 px-1.5 py-0.5">
            <span className="font-mono text-[8px] leading-none text-accent">A</span>
          </div>

          {/* animated scan line */}
          <div
            className="absolute inset-x-0 h-px bg-accent shadow-[0_0_8px_var(--glow-accent)] transition-[top] duration-[2400ms] ease-in-out"
            style={{ top: scanning ? '85%' : '10%' }}
            aria-hidden
          />
        </div>
      </div>

      {/* rule engine report */}
      <div className="rounded-xl border border-hairline bg-canvas-raised p-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-mono text-[9px] tracking-[0.14em] text-ink-subtle">RULE ENGINE</p>
          <span className="font-mono text-[9px] text-ink-faint">
            {passedCount}/{rules.length} passed
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          {rules.map((rule) => {
            const Icon = rule.passed ? CheckCircle2 : XCircle
            return (
              <div key={rule.label} className="flex items-center gap-1.5">
                <Icon
                  className={`size-3 shrink-0 ${rule.passed ? 'text-accent' : 'text-amber-400'}`}
                  strokeWidth={2}
                />
                <span className="text-[10.5px] leading-tight text-ink-muted">{rule.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}