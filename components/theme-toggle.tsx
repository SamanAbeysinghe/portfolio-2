'use client'

import { useCallback, useEffect, useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'

type Theme = 'light' | 'dark' | 'system'
const STORAGE_KEY = 'theme'

function resolve(theme: Theme) {
  if (theme !== 'system') return theme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function apply(theme: Theme) {
  const resolved = resolve(theme)
  const root = document.documentElement
  root.classList.add('theme-transition')
  root.classList.toggle('dark', resolved === 'dark')
  root.classList.toggle('light', resolved === 'light')
  root.style.colorScheme = resolved
  window.setTimeout(() => root.classList.remove('theme-transition'), 250)
}

const ORDER: Theme[] = ['dark', 'light', 'system']
const ICONS: Record<Theme, typeof Sun> = { dark: Moon, light: Sun, system: Monitor }
const LABELS: Record<Theme, string> = { dark: 'Dark', light: 'Light', system: 'System' }

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    const initial = stored ?? 'dark'
    setTheme(initial)
    apply(initial)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (theme !== 'system') return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => apply('system')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [theme])

  const cycle = useCallback(() => {
    const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length]
    setTheme(next)
    localStorage.setItem(STORAGE_KEY, next)
    apply(next)
  }, [theme])

  const Icon = mounted ? ICONS[theme] : Moon

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${mounted ? LABELS[theme] : 'Dark'} - click to cycle`}
      title={`Theme: ${mounted ? LABELS[theme] : 'Dark'}`}
      className={`rounded-full border border-hairline p-1.5 text-ink-faint transition-colors hover:border-hairline-strong hover:text-ink ${className}`}
    >
      <Icon className="size-3.5" strokeWidth={1.75} aria-hidden />
    </button>
  )
}