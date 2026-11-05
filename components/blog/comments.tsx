'use client'

import { useEffect, useRef } from 'react'

// Giscus keeps comments in GitHub Discussions on your repo. Readers sign in with GitHub.
// Setup: https://giscus.app (enable Discussions, install the giscus app, copy the IDs into .env.local).
const repo = process.env.NEXT_PUBLIC_GISCUS_REPO
const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID
const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY
const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID

const configured = Boolean(repo && repoId && category && categoryId)

const currentTheme = () => (document.documentElement.classList.contains('dark') ? 'transparent_dark' : 'light')

export function Comments() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container || !configured) return

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    const attributes: Record<string, string> = {
      'data-repo': repo!,
      'data-repo-id': repoId!,
      'data-category': category!,
      'data-category-id': categoryId!,
      'data-mapping': 'pathname',
      'data-strict': '0',
      // the post has its own like button, so skip Giscus' top-level reactions
      'data-reactions-enabled': '0',
      'data-emit-metadata': '0',
      'data-input-position': 'top',
      'data-theme': currentTheme(),
      'data-lang': 'en',
      'data-loading': 'lazy',
    }
    for (const [key, value] of Object.entries(attributes)) script.setAttribute(key, value)
    container.appendChild(script)

    // follow the site's light/dark toggle
    const observer = new MutationObserver(() => {
      const frame = container.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
      frame?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: currentTheme() } } },
        'https://giscus.app',
      )
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      observer.disconnect()
      container.innerHTML = ''
    }
  }, [])

  if (!configured) {
    return process.env.NODE_ENV !== 'production' ? (
      <p className="mt-10 rounded-xl border border-dashed border-hairline-strong p-4 text-xs leading-5 text-ink-faint">
        Comments are off: set the NEXT_PUBLIC_GISCUS_* variables in .env.local (see .env.example).
      </p>
    ) : null
  }

  return (
    <section aria-label="Comments" className="mt-10">
      <h2 className="mb-4 text-lg text-ink">Comments</h2>
      <div ref={ref} />
    </section>
  )
}
