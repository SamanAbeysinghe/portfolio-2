import Image from 'next/image'
import { Mail } from 'lucide-react'

import { Reveal } from '@/components/reveal'
import { contactEmail, eyebrow } from '@/lib/site'

const focusAreas = [
  {
    title: 'Document intelligence',
    detail: 'reading unstructured, handwritten documents with YOLO and Claude, then checking them against business rules.',
  },
  {
    title: 'RAG systems',
    detail: 'from multi-tenant chat widgets on AWS to fully offline assistants for private data.',
  },
  {
    title: 'AI-assisted testing',
    detail: 'a local-LLM QA platform that drafts test cases, checks its own output, and measures whether the AI helps.',
  },
  {
    title: 'Applied machine learning',
    detail: 'classification and prediction models in TensorFlow, including published research.',
  },
]

export function About() {
  return (
    <section id="about" className="border-y border-hairline bg-canvas-raised">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal className="grid gap-12 lg:grid-cols-[1fr_340px] lg:items-center lg:gap-16">
          <div>
            <p className={eyebrow}>About me</p>
            <h2 className="mt-4 max-w-lg text-3xl tracking-[-0.02em] text-ink sm:text-4xl">
              The engineer behind the builds.
            </h2>
            <div className="mt-6 max-w-lg space-y-4 text-sm leading-7 text-ink-muted">
              <p>
                I&apos;m Saman, an AI engineer based in Sri Lanka. I spend most of my time
                turning research-grade ideas - retrieval, computer vision, fine-tuned
                models - into systems that hold up in production: multi-tenant, observable,
                and built to fail gracefully.
              </p>
              <p>
                Outside client work, I build things I&apos;m personally curious about - local-first
                AI tools, document intelligence pipelines, anything sitting at the edge of
                what&apos;s practical to ship today.
              </p>
            </div>

            <ul className="mt-8 max-w-lg space-y-4 border-t border-hairline pt-6">
              {focusAreas.map((area) => (
                <li key={area.title} className="text-sm leading-6">
                  <span className="text-ink">{area.title}</span>
                  <span className="text-ink-muted"> - {area.detail}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 max-w-lg text-sm leading-7 text-ink-muted">
              Away from the keyboard I volunteer as Director of the IT division at SEDS Sri Lanka
              (Students for the Exploration and Development of Space) and as a member of Zero Plastic
              Planet.
            </p>

            <a
              href={`mailto:${contactEmail}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-sm text-ink transition-colors hover:border-hairline-strong hover:bg-surface-hover"
            >
              <Mail className="size-4 text-accent" strokeWidth={1.75} />
              {contactEmail}
            </a>
          </div>

          <div className="relative isolate mx-auto w-full max-w-[300px] lg:max-w-none">
            <div
              className="pointer-events-none absolute -inset-10 -z-20 rounded-[3rem] blur-3xl"
              style={{ background: 'var(--glow-accent)' }}
              aria-hidden
            />
            {/* soft bloom: a blurred, oversized copy of the same photo bleeding outward */}
            <Image
              src="/about-photo.jpg"
              alt=""
              aria-hidden
              width={719}
              height={899}
              className="photo-fade-mask absolute inset-0 -z-10 h-full w-full scale-110 object-cover opacity-50 blur-2xl"
            />
            {/* sharp portrait, edges dissolving into the canvas */}
            <Image
              src="/about-photo.jpg"
              alt="Saman Abeysinghe"
              width={719}
              height={899}
              className="photo-fade-mask relative z-0 h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
