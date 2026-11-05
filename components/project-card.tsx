'use client'

import { useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowUpRight, X, type LucideIcon } from 'lucide-react'

import { ProjectPipeline, type PipelineStage } from '@/components/projects/rag-chatbot-visual'

export type ProjectStep = {
  icon: LucideIcon
  title: string
  description: string
}

export type ProjectCardProps = {
  number: string
  title: string
  metric: string
  glow: string
  /** `feature` renders a full-width row with the visual beside the summary; `compact` is a small grid card. */
  variant?: 'feature' | 'compact'
  /** Feature variant only: put the visual on the left instead of the right. */
  flip?: boolean
  /** Short 1–2 line intro, shown on the card and at the top of the detail view. */
  tagline?: string
  /** Plain paragraph - used in the detail view only when `steps` is not provided. */
  description?: string
  /** Optional animated pipeline tracker, e.g. Site -> Crawl -> Embed -> LLM -> Widget. */
  pipeline?: { stages: PipelineStage[]; label?: string }
  /** Optional bespoke visual specific to this project (its own component, passed in as-is). */
  visual?: ReactNode
  /** Structured breakdown, shown in the detail view. */
  steps?: ProjectStep[]
  tags: string[]
  /** Optional icon per tag, keyed by the exact tag string. Tags without a match render as plain text. */
  tagIcons?: Record<string, LucideIcon>
}

const COMPACT_TAG_LIMIT = 4

/**
 * Shared visual shell for a project card.
 * Layout/style only - each project's actual content lives in its own
 * component under /components/projects, so editing one project never
 * risks changing another.
 */
export function ProjectCard({
  number,
  title,
  metric,
  glow,
  variant = 'compact',
  flip = false,
  tagline,
  description,
  pipeline,
  visual,
  steps,
  tags,
  tagIcons,
}: ProjectCardProps) {
  const [open, setOpen] = useState(false)
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    const trigger = triggerRef.current
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
      trigger?.focus()
    }
  }, [open])

  const renderTags = (limit?: number) => {
    const shown = limit ? tags.slice(0, limit) : tags
    const hidden = tags.length - shown.length
    return (
      <div className="flex flex-wrap gap-2">
        {shown.map((tag) => {
          const TagIcon = tagIcons?.[tag]
          return (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-2.5 py-1 font-mono text-[10px] text-ink-subtle"
            >
              {TagIcon && <TagIcon className="size-3" strokeWidth={1.75} />}
              {tag}
            </span>
          )
        })}
        {hidden > 0 && (
          <span className="inline-flex items-center rounded-full px-1.5 py-1 font-mono text-[10px] text-ink-faint">
            +{hidden}
          </span>
        )}
      </div>
    )
  }

  const header = (
    <div className="flex items-center justify-between gap-4 font-mono text-xs">
      <span className="text-ink-faint">{number}</span>
      <span className="text-right text-ink-muted">{metric}</span>
    </div>
  )

  const media = pipeline && pipeline.stages.length > 0 ? (
    <ProjectPipeline stages={pipeline.stages} label={pipeline.label ?? 'Pipeline'} />
  ) : (
    visual
  )

  const trigger = (label: string) => (
    <button
      ref={triggerRef}
      type="button"
      onClick={() => setOpen(true)}
      aria-haspopup="dialog"
      className="mt-8 inline-flex items-center text-sm text-ink-muted transition-colors hover:text-ink"
    >
      {label}
      <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
    </button>
  )

  const glowBlob = (
    <div
      className="pointer-events-none absolute -right-20 -top-20 size-52 rounded-full blur-[80px]"
      style={{ background: glow }}
      aria-hidden
    />
  )

  return (
    <>
      {variant === 'feature' ? (
        <article className="group relative overflow-hidden rounded-2xl border border-hairline bg-surface p-6 transition-colors duration-200 hover:border-hairline-strong sm:p-8 lg:p-10">
          {glowBlob}
          <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-10">
            <div className={`flex flex-col justify-center ${flip ? 'lg:order-2' : ''}`}>
              {header}
              <h3 className="mt-6 text-2xl tracking-[-0.02em] text-ink sm:text-3xl">{title}</h3>
              {tagline && <p className="mt-3 max-w-[52ch] text-sm leading-6 text-ink-muted">{tagline}</p>}
              <div className="mt-6">{renderTags()}</div>
              {trigger('Read case study')}
            </div>
            <div
              className={`flex items-center justify-center rounded-xl border border-hairline bg-canvas-raised/60 p-5 sm:p-6 ${
                flip ? 'lg:order-1' : ''
              }`}
            >
              <div className="w-full">{media}</div>
            </div>
          </div>
        </article>
      ) : (
        <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface p-6 transition-colors duration-200 hover:border-hairline-strong hover:bg-surface-hover">
          {glowBlob}
          <div className="relative flex h-full flex-col">
            {header}
            <h3 className="mt-5 text-xl tracking-[-0.02em] text-ink">{title}</h3>
            {tagline && <p className="mt-2 text-sm leading-6 text-ink-muted">{tagline}</p>}
            <div className="mt-5">{renderTags(COMPACT_TAG_LIMIT)}</div>
            <div className="mt-auto">{trigger('View details')}</div>
          </div>
        </article>
      )}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/80 p-4 backdrop-blur-sm"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-hairline-strong bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8"
          >
            <button
              ref={closeRef}
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full border border-hairline text-ink-faint transition-colors hover:border-hairline-strong hover:text-ink"
            >
              <X className="size-4" />
            </button>

            {header}
            <h3 id={titleId} className="mt-6 pr-8 text-2xl tracking-[-0.02em] text-ink">
              {title}
            </h3>
            {tagline && <p className="mt-2 max-w-[52ch] text-sm leading-6 text-ink-muted">{tagline}</p>}

            {media && <div className="mt-6">{media}</div>}

            {steps && steps.length > 0 ? (
              <div className="mt-6 flex flex-col gap-4">
                {steps.map((step) => {
                  const StepIcon = step.icon
                  return (
                    <div key={step.title} className="flex gap-3">
                      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-hairline bg-canvas/60">
                        <StepIcon className="size-3.5 text-accent" strokeWidth={1.75} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ink">{step.title}</p>
                        <p className="mt-0.5 max-w-[48ch] text-[13px] leading-5 text-ink-muted">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              description && <p className="mt-3 max-w-[46ch] text-sm leading-6 text-ink-muted">{description}</p>
            )}

            <div className="mt-8">{renderTags()}</div>
          </div>
        </div>
      )}
    </>
  )
}
