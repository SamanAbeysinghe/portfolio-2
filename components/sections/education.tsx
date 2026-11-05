import { ArrowUpRight } from 'lucide-react'

import { Reveal } from '@/components/reveal'
import { eyebrow } from '@/lib/site'

const doi = 'https://doi.org/10.1109/SLAAI-ICAI63667.2024.10844967'

export function Education() {
  return (
    <section id="education" className="border-t border-hairline">
      <Reveal className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[220px_1fr] lg:px-8 lg:py-24">
        <div>
          <p className={eyebrow}>Education</p>
          <p className="mt-4 max-w-[22ch] text-sm leading-6 text-ink-muted">
            Computer engineering, research and recognition.
          </p>
        </div>

        <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs text-ink-faint">2018 – 2024</p>
            <h3 className="mt-2 text-lg text-ink">BSc (Hons) in Engineering</h3>
            <p className="mt-1 text-sm leading-6 text-ink-muted">
              Specialised in Computer Engineering. Second Class Upper Division.
              <br />
              The Open University of Sri Lanka
            </p>
            <p className="mt-4 text-sm leading-6 text-ink-muted">
              <span className="text-ink">Dean&apos;s List</span> of Distinguished Students, 2020/2021
            </p>
          </div>

          <div>
            <p className="font-mono text-xs text-ink-faint">2024 · IEEE</p>
            <h3 className="mt-2 text-lg text-ink">Published research</h3>
            <p className="mt-1 text-sm leading-6 text-ink-muted">
              &ldquo;Nutrient Deficiency Detection System for Black Pepper Leaf Using Machine
              Learning&rdquo;, 8th SLAAI International Conference on Artificial Intelligence.
            </p>
            <a
              href={doi}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center text-sm text-ink-muted transition-colors hover:text-ink"
            >
              Read the paper
              <ArrowUpRight className="ml-1 size-4" />
            </a>
          </div>

          <div>
            <p className="font-mono text-xs text-ink-faint">2017</p>
            <h3 className="mt-2 text-lg text-ink">GCE Advanced Level</h3>
            <p className="mt-1 text-sm leading-6 text-ink-muted">
              Mathematics stream, St. Sylvester&apos;s College, Kandy
            </p>
          </div>

          <div>
            <p className="font-mono text-xs text-accent">In progress</p>
            <h3 className="mt-2 text-lg text-ink">AWS training &amp; certification</h3>
            <p className="mt-1 text-sm leading-6 text-ink-muted">Following AWS training and certification courses.</p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
