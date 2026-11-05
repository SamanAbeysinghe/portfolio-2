'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

/**
 * Fades content in as it scrolls into view. Content is visible by default
 * (no-JS, reduced motion, already on screen); the hidden state is only applied
 * to elements that start below the fold.
 */
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return

    el.classList.add('reveal')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.classList.add('is-visible')
        observer.disconnect()
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
