'use client'

import { useEffect, useRef, useState } from 'react'

export type PipelineStage = {
  label: string
  detail: string
}

type ProjectPipelineProps = {
  stages: PipelineStage[]
  label?: string
  stepMs?: number
  className?: string
}

/**
 * Compact, animated pipeline tracker for use inside a project card.
 * Same visual language as the hero PipelineDiagram, sized down to fit
 * within a card's existing padding.
 */
export function ProjectPipeline({
  stages,
  label = 'Pipeline',
  stepMs = 1200,
  className = '',
}: ProjectPipelineProps) {
  const [active, setActive] = useState(0)
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion.current) return

    const id = window.setInterval(() => {
      setActive((n) => (n + 1) % stages.length)
    }, stepMs)
    return () => window.clearInterval(id)
  }, [stages.length, stepMs])

  const trackPercent = stages.length > 1 ? (active / (stages.length - 1)) * 100 : 0

  return (
    <div
      className={`rounded-xl border border-hairline bg-canvas-raised p-4 ${className}`}
    >
      <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-ink-subtle">
        <span>{label}</span>
        <span className="inline-flex items-center gap-1.5 text-accent">
          <span className="size-1.5 rounded-full bg-accent" />
          live
        </span>
      </div>

      {/* track */}
      <div className="relative pt-2">
        <div className="absolute left-0 top-[15px] h-px w-full bg-hairline-strong" aria-hidden />
        <div
          className="absolute top-[15px] h-px bg-accent transition-[width] duration-500 ease-out"
          style={{ width: `${trackPercent}%` }}
          aria-hidden
        />

        <div className="relative flex justify-between">
          {stages.map((stage, i) => {
            const isActive = i === active
            const isDone = i < active
            return (
              <div
                key={stage.label}
                className="flex flex-col items-center gap-2"
                style={{ width: `${100 / stages.length}%` }}
              >
                <span
                  className={`flex size-3.5 items-center justify-center rounded-full border transition-colors duration-300 ${
                    isActive
                      ? 'border-accent bg-accent'
                      : isDone
                        ? 'border-accent/50 bg-accent/20'
                        : 'border-hairline-strong bg-canvas'
                  }`}
                  aria-hidden
                >
                  {isActive && <span className="size-1.5 rounded-full bg-canvas" />}
                </span>
                <span
                  className={`text-center font-mono text-[9px] leading-tight transition-colors ${
                    isActive ? 'text-ink' : 'text-ink-faint'
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* status line */}
      <div className="mt-5 min-h-[2.75rem] rounded-lg border border-hairline bg-canvas p-2.5 font-mono text-[11px] leading-5 text-ink-muted">
        <span className="text-accent">›</span> {stages[active].detail}
        <span className="ml-1 inline-block h-3 w-px animate-pulse bg-accent align-middle" />
      </div>
    </div>
  )
}