'use client'

import { useEffect, useRef } from 'react'

/**
 * A faint accent light that follows the mouse. Mouse/trackpad only, and off
 * for reduced motion. Updates the DOM directly so moving the mouse never
 * re-renders React.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let x = 0
    let y = 0
    const paint = () => {
      frame = 0
      el.style.background = `radial-gradient(260px circle at ${x}px ${y}px, var(--glow-accent), transparent 70%)`
    }
    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      el.style.opacity = '0.45'
      if (!frame) frame = requestAnimationFrame(paint)
    }
    const onLeave = () => {
      el.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-500"
      aria-hidden
    />
  )
}
