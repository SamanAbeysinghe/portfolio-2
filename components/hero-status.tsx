'use client'

import { useEffect, useState } from 'react'

export function HeroStatus() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Colombo',
        }).format(new Date())
      )
    update()
    const id = window.setInterval(update, 30_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="flex items-center font-mono text-xs text-ink-faint">
      <div className="flex items-center gap-2 text-ink-subtle">
        <span className="size-1.5 animate-pulse rounded-full bg-accent" />
        {time || '-:-'} · Colombo
      </div>
    </div>
  )
}