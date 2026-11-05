import type { Metadata } from 'next'
import Link from 'next/link'

import { formatDate, getAllPosts } from '@/lib/blog'
import { eyebrow } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Writing - Saman Abeysinghe',
  description: 'Notes on building AI systems: RAG, local LLMs, document intelligence and AI-assisted testing.',
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
      <p className={eyebrow}>Writing</p>
      <h1 className="mt-4 text-4xl tracking-[-0.03em] text-ink sm:text-5xl">Notes from building AI systems.</h1>
      <p className="mt-5 max-w-[56ch] text-base leading-7 text-ink-muted">
        Practical write-ups on RAG, local LLMs, document intelligence and AI-assisted testing: what I
        tried, what I measured, and what I would do differently.
      </p>

      <ul className="mt-14 divide-y divide-hairline border-y border-hairline">
        {posts.length === 0 && <li className="py-8 text-sm text-ink-muted">The first posts are on their way.</li>}
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block py-8">
              <p className="font-mono text-xs text-ink-faint">
                {formatDate(post.date)} · {post.readingMinutes} min read
                {post.draft && <span className="ml-3 text-amber-400">DRAFT (hidden in production)</span>}
              </p>
              <h2 className="mt-2 text-xl tracking-[-0.02em] text-ink transition-colors group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{post.description}</p>
              {post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[10px] text-ink-subtle"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
