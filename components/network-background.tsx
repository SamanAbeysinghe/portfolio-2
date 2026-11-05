'use client'

import { useEffect, useRef } from 'react'

type Node = { x: number; y: number; vx: number; vy: number }

const LINK_DISTANCE = 120
const MOUSE_RADIUS = 110

export function NetworkBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0
    let nodes: Node[] = []
    let frameId = 0
    let dotColor = '#60a5fa'
    let lineColor = '#52525b'
    const mouse = { x: -9999, y: -9999 }

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement)
      dotColor = styles.getPropertyValue('--accent').trim() || dotColor
      lineColor = styles.getPropertyValue('--ink-faint').trim() || lineColor
    }

    const resize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round((width * height) / 15000)
      nodes = Array.from({ length: Math.max(22, Math.min(count, 80)) }, () => ({
        x: (width * 0.45) + Math.random() * (width * 0.55),
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.12,
      }))
    }

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1

        const dx = n.x - mouse.x
        const dy = n.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < MOUSE_RADIUS && dist > 0.01) {
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * 1.1
          n.x += (dx / dist) * force
          n.y += (dy / dist) * force
        }
      }

      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = lineColor
            ctx.globalAlpha = (1 - dist / LINK_DISTANCE) * 0.45
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 0.75
      ctx.fillStyle = dotColor
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const loop = () => {
      drawFrame()
      frameId = requestAnimationFrame(loop)
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    readColors()
    resize()
    drawFrame()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    const themeObserver = new MutationObserver(() => {
      readColors()
      if (reduced) drawFrame()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    if (!reduced) frameId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      themeObserver.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className={`block h-full w-full ${className}`} />
}