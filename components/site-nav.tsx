'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

import { ThemeToggle } from '@/components/theme-toggle'
import { navItems, socialLinks } from '@/lib/site'

// Sections that aren't nav items still belong to the nav item above them.
const sectionToNav: Record<string, string> = { skills: 'experience' }
const watched = ['builds', 'experience', 'skills', 'about', 'contact']

export function SiteNav({ showBlog = false }: { showBlog?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(sectionToNav[entry.target.id] ?? entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    for (const id of watched) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    const onScroll = () => {
      if (window.scrollY < 200) setActive('')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const linkClass = (id: string, base: string) =>
    `${base} transition-colors ${active === id ? 'text-ink' : 'text-ink-muted hover:text-ink'}`

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-canvas/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight text-ink">
          /dev<span className="text-accent">.ai</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navItems
            .filter((item) => item.id !== 'contact')
            .map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={linkClass(item.id, 'text-[13px]')}
              >
                {item.label}
              </a>
            ))}
          {showBlog && (
            <a href="/blog" className="text-[13px] text-ink-muted transition-colors hover:text-ink">
              Writing
            </a>
          )}

          <ThemeToggle />
          <a
            href="#contact"
            className="group inline-flex items-center rounded-full border border-hairline-strong px-4 py-2 text-[13px] text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Let&apos;s talk
            <ArrowUpRight className="ml-1 size-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="rounded-lg p-1.5 text-ink-muted transition-colors hover:text-ink"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-5 border-t border-hairline bg-canvas px-6 py-6 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
              aria-current={active === item.id ? 'true' : undefined}
              className={linkClass(item.id, 'text-sm')}
            >
              {item.label}
            </a>
          ))}
          {showBlog && (
            <a href="/blog" onClick={() => setMenuOpen(false)} className="text-sm text-ink-muted transition-colors hover:text-ink">
              Writing
            </a>
          )}
          <div className="flex items-center gap-4 border-t border-hairline pt-5">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-ink-faint transition-colors hover:text-ink"
              >
                <Icon className="size-[18px]" strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
