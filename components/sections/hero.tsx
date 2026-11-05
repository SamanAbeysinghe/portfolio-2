import { ArrowUpRight, Download } from 'lucide-react'

import { AvatarPhoto } from '@/components/avatar-photo'
import { HeroStatus } from '@/components/hero-status'
import { NetworkBackground } from '@/components/network-background'
import { RotatingWord } from '@/components/rotating-word'
import { GithubIcon } from '@/components/social-icons'
import { cvHref, socialLinks } from '@/lib/site'

export function Hero() {
  return (
      <section id="top" className="relative mx-auto max-w-6xl px-6 pb-24 pt-32 lg:px-8 lg:pb-32 lg:pt-44">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <NetworkBackground />
        </div>
        <div
          className="pointer-events-none absolute -left-40 top-20 size-[28rem] rounded-full blur-[130px]"
          style={{ background: 'var(--glow-accent)' }}
          aria-hidden
        />

<div className="relative grid items-center gap-14 lg:grid-cols-[1fr_300px]">
          <div>
            <div className="mb-10 flex items-center gap-4 lg:mb-8">
              <AvatarPhoto size={64} className="ring-2 ring-accent/30 ring-offset-2 ring-offset-canvas lg:hidden" />
              <div>
                <p className="text-lg font-medium text-ink">Saman Abeysinghe</p>
                <p className="text-sm text-ink-faint">AI Engineer · Sri Lanka</p>
              </div>
            </div>

            <h1 className="max-w-3xl text-balance text-[2.5rem] font-medium leading-[1.05] tracking-[-0.04em] text-ink sm:text-6xl lg:text-[4.25rem]">
              I build production AI systems
              <span className="mt-2 block whitespace-nowrap text-[1.4rem] sm:text-4xl lg:text-[2.6rem]">
                <span className="text-ink-faint">for </span>
                <RotatingWord />
              </span>
            </h1>

            <p className="mt-8 max-w-[54ch] text-base leading-7 text-ink-muted lg:text-lg lg:leading-8">
              I turn messy documents and private knowledge into reliable AI systems. Currently an AI
              Engineer at Cenango, building with LLMs, RAG and multi-agent architectures.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#builds"
                className="group inline-flex items-center rounded-full bg-invert px-5 py-3 text-sm font-medium text-invert-ink transition-opacity hover:opacity-90"
              >
                View selected work
                <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
              </a>
              <a
                href="#contact"
                className="rounded-full border border-hairline-strong px-5 py-3 text-sm text-ink-muted transition-colors hover:border-ink hover:text-ink"
              >
                Start a conversation
              </a>
              <a
                href={cvHref}
                download
                className="inline-flex items-center gap-2 rounded-full px-3 py-3 text-sm text-ink-muted transition-colors hover:text-ink"
              >
                <Download className="size-4" strokeWidth={1.75} />
                Download CV
              </a>
              <a
                href={socialLinks[0].href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-3 py-3 text-sm text-ink-muted transition-colors hover:text-ink"
              >
                <GithubIcon className="size-4" strokeWidth={1.75} />
                GitHub
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-2 border-t border-hairline pt-6">
              {['AI Engineer @ Cenango', 'BSc (Hons) Computer Engineering', 'Published at SLAAI-ICAI 2024'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-hairline px-3 py-1.5 font-mono text-xs text-ink-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden flex-col items-center gap-8 lg:flex">
            <AvatarPhoto size={260} className="ring-2 ring-accent/30 ring-offset-4 ring-offset-canvas" />
            <HeroStatus />
          </div>
        </div>
      </section>
  )
}
