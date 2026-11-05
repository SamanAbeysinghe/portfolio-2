import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { ThemeToggle } from '@/components/theme-toggle'

export function BlogHeader() {
  return (
    <header className="border-b border-hairline bg-canvas/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight text-ink">
          /dev<span className="text-accent">.ai</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-3.5" />
            Portfolio
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
