'use client'

import { useEffect, useState } from 'react'
import { Lock, WifiOff, MessageSquare, Cpu, Star, ArrowRight, RotateCcw } from 'lucide-react'

const loopNodes = [
  { icon: MessageSquare, label: 'Prompt' },
  { icon: Cpu, label: 'Local LLM' },
  { icon: Star, label: 'Rate' },
]

export function LocalRagVisual({ className = '' }: { className?: string }) {
  const [pulse, setPulse] = useState(false)
  const [rating, setRating] = useState(4)

  useEffect(() => {
    const id = window.setInterval(() => {
      setPulse((p) => !p)
      setRating((r) => (r >= 5 ? 3 : r + 1))
    }, 2200)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      {/* offline / data isolation status */}
      <div className="rounded-xl border border-hairline bg-canvas-raised p-3">
        <p className="mb-2 font-mono text-[9px] tracking-[0.14em] text-ink-subtle">DATA ISOLATION</p>
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg border border-hairline bg-canvas/60">
            <Lock className="size-3.5 text-accent" strokeWidth={1.75} />
          </div>
          <div className="flex size-8 items-center justify-center rounded-lg border border-hairline bg-canvas/60">
            <WifiOff className="size-3.5 text-accent" strokeWidth={1.75} />
          </div>
          <span
            className={`ml-1 inline-flex items-center gap-1.5 rounded-full border border-hairline px-2 py-1 font-mono text-[9px] transition-colors ${
              pulse ? 'text-accent' : 'text-ink-faint'
            }`}
          >
            <span className={`size-1.5 rounded-full ${pulse ? 'bg-accent' : 'bg-ink-faint'}`} />
            0 external calls
          </span>
        </div>
        <p className="mt-3 text-[11px] leading-5 text-ink-muted">
          Runs fully on local hardware - no document, prompt, or response ever leaves the device.
        </p>
      </div>

      {/* rating feedback loop */}
      <div className="rounded-xl border border-hairline bg-canvas-raised p-3">
        <p className="mb-2 font-mono text-[9px] tracking-[0.14em] text-ink-subtle">FEEDBACK LOOP</p>
        <div className="flex items-center justify-between">
          {loopNodes.map((node, i) => {
            const NodeIcon = node.icon
            return (
              <div key={node.label} className="flex items-center gap-1">
                <div className="flex flex-col items-center gap-1">
                  <div className="flex size-7 items-center justify-center rounded-lg border border-hairline bg-canvas/60">
                    <NodeIcon className="size-3.5 text-accent" strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-[8px] text-ink-faint">{node.label}</span>
                </div>
                {i < loopNodes.length - 1 && (
                  <ArrowRight className="mb-3 size-3 shrink-0 text-ink-faint" strokeWidth={1.75} />
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-3 flex items-center justify-center gap-0.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              className={`size-3 transition-colors ${n <= rating ? 'fill-accent text-accent' : 'text-ink-faint'}`}
              strokeWidth={1.5}
            />
          ))}
        </div>

        <p className="mt-2 flex items-center gap-1 text-[11px] leading-5 text-ink-muted">
          <RotateCcw className="size-3 shrink-0 text-ink-faint" strokeWidth={1.75} />
          Ratings loop back to improve retrieval quality over time.
        </p>
      </div>
    </div>
  )
}