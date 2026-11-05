import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog')

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readingMinutes: number
  draft: boolean
}

export type Post = PostMeta & { content: string }

function parseFile(file: string): Post {
  const slug = file.replace(/\.md$/, '')
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8')
  const { data, content } = matter(raw)
  const words = content.trim().split(/\s+/).length
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    // gray-matter parses bare YAML dates into Date objects
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ''),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: Math.max(1, Math.round(words / 220)),
    draft: data.draft === true,
    content,
  }
}

/** Newest first. Drafts are visible in development only. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  const showDrafts = process.env.NODE_ENV !== 'production'
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map(parseFile)
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug)
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(date),
  )
}
