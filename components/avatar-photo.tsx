'use client'

import { useState } from 'react'

export function AvatarPhoto({ size = 30, className = '' }: { size?: number; className?: string }) {
  const [broken, setBroken] = useState(false)

  if (broken) {
    return (
      <span
        style={{ width: size, height: size }}
        className={`flex shrink-0 items-center justify-center rounded-full bg-invert font-mono text-[11px] font-semibold text-invert-ink ${className}`}
      >
        SA
      </span>
    )
  }

  return (
    // Drop a file at /public/profile.jpg (square, ~256px+) and it appears here automatically.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/profile.jpg"
      alt="Portrait"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`shrink-0 rounded-full border border-hairline object-cover ${className}`}
      onError={() => setBroken(true)}
    />
  )
}