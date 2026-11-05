'use client'

import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'

export function LikeButton({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    try {
      setLiked(localStorage.getItem(`liked:${slug}`) === '1')
    } catch {}

    let cancelled = false
    fetch(`/api/likes/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled || !data.enabled) return
        setEnabled(true)
        setCount(data.count)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [slug])

  if (!enabled) return <span />

  const like = async () => {
    if (liked) return
    setLiked(true)
    setCount((c) => (c ?? 0) + 1)
    try {
      localStorage.setItem(`liked:${slug}`, '1')
    } catch {}
    try {
      const response = await fetch(`/api/likes/${slug}`, { method: 'POST' })
      const data = await response.json()
      if (response.ok && typeof data.count === 'number') setCount(data.count)
    } catch {
      // keep the optimistic count; a failed request is not worth alarming a reader
    }
  }

  return (
    <button
      type="button"
      onClick={like}
      disabled={liked}
      aria-pressed={liked}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
        liked
          ? 'border-accent/50 text-accent'
          : 'border-hairline text-ink-muted hover:border-hairline-strong hover:text-ink'
      }`}
    >
      <Heart className={`size-4 ${liked ? 'fill-current' : ''}`} strokeWidth={1.75} />
      {liked ? 'Thanks!' : 'Like this post'}
      {count !== null && <span className="font-mono text-xs text-ink-faint">{count}</span>}
    </button>
  )
}
