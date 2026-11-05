'use client'

import { useEffect, useState } from 'react'

const stops = [
  { id: 'top', label: 'Intro' },
  { id: 'builds', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

/**
 * A thin line down the left edge that fills as you scroll, with a node per
 * section. Decorative and quiet: only on wide screens, no motion beyond the fill.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [positions, setPositions] = useState<number[]>(() => stops.map(() => 0))

  useEffect(() => {
    let frame = 0

    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max <= 0) return
      setPositions(
        stops.map(({ id }) => {
          const el = document.getElementById(id)
          return el ? Math.min(1, Math.max(0, el.offsetTop / max)) : 0
        }),
      )
    }

    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    measure()
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    // late layout shifts (fonts, images) change section offsets
    const timer = window.setTimeout(measure, 800)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      window.clearTimeout(timer)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed bottom-24 left-6 top-24 z-30 hidden w-4 xl:block"
    >
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-hairline" />
      <div
        className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-accent/70"
        style={{ height: `${progress * 100}%` }}
      />
      {stops.map((stop, i) => {
        const reached = progress >= positions[i] - 0.001
        return (
          <a
            key={stop.id}
            href={`#${stop.id}`}
            aria-label={`Jump to ${stop.label}`}
            title={stop.label}
            className="group pointer-events-auto absolute left-1/2 -translate-x-1/2 -translate-y-1/2 p-1.5"
            style={{ top: `${positions[i] * 100}%` }}
          >
            <span
              className={`block size-1.5 rounded-full border transition-colors duration-300 ${
                reached ? 'border-accent bg-accent' : 'border-hairline-strong bg-canvas'
              }`}
            />
            <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] text-ink-faint opacity-0 transition-opacity group-hover:opacity-100">
              {stop.label}
            </span>
          </a>
        )
      })}
    </div>
  )
}
