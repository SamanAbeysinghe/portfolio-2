import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'

import { getPost } from '@/lib/blog'

// Likes live in Upstash Redis (REST API, free tier). Without the env vars the
// endpoint reports `enabled: false` and the button hides itself.
const url = process.env.UPSTASH_REDIS_REST_URL
const token = process.env.UPSTASH_REDIS_REST_TOKEN

const ONE_DAY = 60 * 60 * 24

async function redis(command: (string | number)[]) {
  const response = await fetch(url!, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
    cache: 'no-store',
  })
  if (!response.ok) throw new Error(`Redis request failed (${response.status})`)
  const data = await response.json()
  return data.result as string | number | null
}

type Ctx = { params: Promise<{ slug: string }> }

async function resolveSlug(ctx: Ctx) {
  const { slug } = await ctx.params
  // Only real posts get a counter, so nobody can create arbitrary keys.
  return /^[a-z0-9-]+$/.test(slug) && getPost(slug) ? slug : null
}

export async function GET(_request: Request, ctx: Ctx) {
  if (!url || !token) return NextResponse.json({ enabled: false, count: 0 })
  const slug = await resolveSlug(ctx)
  if (!slug) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  try {
    const count = Number(await redis(['GET', `blog:likes:${slug}`])) || 0
    return NextResponse.json({ enabled: true, count })
  } catch {
    return NextResponse.json({ enabled: false, count: 0 })
  }
}

export async function POST(request: Request, ctx: Ctx) {
  if (!url || !token) return NextResponse.json({ enabled: false, count: 0 })
  const slug = await resolveSlug(ctx)
  if (!slug) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    // Store a salted hash, never the raw address.
    const visitor = createHash('sha256')
      .update(`${ip}:${process.env.LIKES_SALT ?? 'portfolio'}`)
      .digest('hex')
      .slice(0, 32)

    // One like per visitor per post per day (NX = only set if absent).
    const firstToday = await redis(['SET', `blog:liked:${slug}:${visitor}`, '1', 'NX', 'EX', ONE_DAY])
    const count =
      firstToday === 'OK'
        ? Number(await redis(['INCR', `blog:likes:${slug}`]))
        : Number(await redis(['GET', `blog:likes:${slug}`])) || 0

    return NextResponse.json({ enabled: true, count })
  } catch {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
