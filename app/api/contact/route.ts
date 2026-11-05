import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX = { name: 100, email: 200, message: 5000 }

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = String(body?.name ?? '').trim()
    const email = String(body?.email ?? '').trim()
    const message = String(body?.message ?? '').trim()

    // Honeypot: real visitors never fill this in. Pretend success so bots learn nothing.
    if (body?.website) return NextResponse.json({ ok: true })

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }
    if (
      !EMAIL_PATTERN.test(email) ||
      name.length > MAX.name ||
      email.length > MAX.email ||
      message.length > MAX.message
    ) {
      return NextResponse.json({ error: 'Invalid input.' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'saman.amk@gmail.com',
      replyTo: email,
      // strip line breaks so the name can't inject extra headers into the subject
      subject: `Portfolio inquiry from ${name.replace(/[\r\n]+/g, ' ')}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
