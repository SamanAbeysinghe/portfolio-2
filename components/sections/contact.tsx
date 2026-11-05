'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

import { contactEmail, eyebrow } from '@/lib/site'

export function Contact() {
  const [contactStatus, setContactStatus] = useState('')
  const [contactError, setContactError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const currentForm = event.currentTarget
    const form = new FormData(currentForm)
    const name = String(form.get('name') || '').trim()
    const email = String(form.get('email') || '').trim()
    const message = String(form.get('message') || '').trim()

    if (!name || !email || !message) {
      setContactError(true)
      setContactStatus('Add your name, email, and a message to continue.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setContactError(true)
      setContactStatus('That email address does not look right.')
      return
    }

    setIsSubmitting(true)
    setContactError(false)
    setContactStatus('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website: String(form.get('website') || '') }),
      })

      if (!response.ok) throw new Error('Request failed')

      setContactStatus("Message sent - I'll get back to you soon.")
      currentForm.reset()
    } catch {
      setContactError(true)
      setContactStatus("Couldn't send that - please try emailing me directly instead.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
      <section id="contact" className="relative border-t border-hairline bg-canvas-raised">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 lg:grid-cols-[1fr_420px] lg:px-8 lg:py-36">
          <div className="max-w-3xl">
            <p className={`mb-6 ${eyebrow}`}>Contact</p>
            <h2 className="text-4xl tracking-[-0.04em] text-ink sm:text-6xl">
              Have a hard problem<span className="text-ink-faint">?</span>
              <br />
              <span className="text-ink-subtle">Let&apos;s make it useful.</span>
            </h2>
            <p className="mt-8 max-w-[56ch] text-base leading-7 text-ink-muted">
              Tell me what you&apos;re building, where you&apos;re stuck, or what you want to explore. I
              reply at the email address you provide.
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-8 inline-flex items-center text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {contactEmail}
              <ArrowUpRight className="ml-2 size-4" />
            </a>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="rounded-2xl border border-hairline bg-surface p-5 shadow-[var(--shadow-card)] sm:p-7"
          >
            <div className="flex flex-col gap-5">
              {/* honeypot: hidden from people, filled in by bots */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              <label className="flex flex-col gap-2 text-xs text-ink-muted">
                Name
                <input
                  required
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  className="rounded-lg border border-hairline bg-canvas px-3 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent"
                />
              </label>
              <label className="flex flex-col gap-2 text-xs text-ink-muted">
                Email
                <input
                  required
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="rounded-lg border border-hairline bg-canvas px-3 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent"
                />
              </label>
              <label className="flex flex-col gap-2 text-xs text-ink-muted">
                Message
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="What can I help you build?"
                  className="resize-none rounded-lg border border-hairline bg-canvas px-3 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent"
                />
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-invert px-4 py-3 text-sm font-medium text-invert-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Sending…' : 'Send message'}
                {!isSubmitting && <ArrowUpRight className="ml-1 inline size-4" />}
              </button>
              {contactStatus && (
                <p
                  aria-live="polite"
                  className={`text-xs leading-5 ${contactError ? 'text-amber-400' : 'text-accent'}`}
                >
                  {contactStatus}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
  )
}
