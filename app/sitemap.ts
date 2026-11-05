import type { MetadataRoute } from 'next'

import { getAllPosts } from '@/lib/blog'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  return [
    { url: siteUrl, lastModified: new Date() },
    ...(posts.length > 0 ? [{ url: `${siteUrl}/blog`, lastModified: new Date(posts[0].date) }] : []),
    ...posts.map((post) => ({ url: `${siteUrl}/blog/${post.slug}`, lastModified: new Date(post.date) })),
  ]
}
