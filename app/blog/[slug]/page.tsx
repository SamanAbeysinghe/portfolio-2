import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Comments } from '@/components/blog/comments'
import { LikeButton } from '@/components/blog/like-button'
import { Markdown } from '@/components/blog/markdown'
import { formatDate, getAllPosts, getPost } from '@/lib/blog'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} - Saman Abeysinghe`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: ['Saman Abeysinghe'],
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
      <article>
        <header>
          <p className="font-mono text-xs text-ink-faint">
            {formatDate(post.date)} · {post.readingMinutes} min read
            {post.draft && <span className="ml-3 text-amber-400">DRAFT (hidden in production)</span>}
          </p>
          <h1 className="mt-4 text-3xl tracking-[-0.03em] text-ink sm:text-5xl">{post.title}</h1>
          {post.description && <p className="mt-4 text-lg leading-8 text-ink-muted">{post.description}</p>}
          {post.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
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
        </header>

        <div className="mt-10 border-t border-hairline pt-2">
          <Markdown>{post.content}</Markdown>
        </div>
      </article>

      <div className="mt-14 flex items-center justify-between border-t border-hairline pt-6">
        <LikeButton slug={post.slug} />
        <Link href="/blog" className="text-sm text-ink-muted transition-colors hover:text-ink">
          All posts
        </Link>
      </div>

      <Comments />
    </main>
  )
}
