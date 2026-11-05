'use client'

import { useEffect, useRef, useState } from 'react'

type Role = {
  title: string
  period?: string
  bullets: string[]
}

type Position = {
  org: string
  period: string
  current: boolean
  roles: Role[]
}

// Newest first.
const positions: Position[] = [
  {
    org: 'Cenango (Pvt) Ltd',
    period: '2025 – now',
    current: true,
    roles: [
      {
        title: 'AI Engineer',
        bullets: ['Developing AI-powered systems built on LLMs, RAG, and multi-agent architectures.'],
      },
    ],
  },
  {
    org: 'The Open University of Sri Lanka',
    period: '2023 – 2025',
    current: false,
    roles: [
      {
        title: 'Temporary Demonstrator',
        period: '2025',
        bullets: [
          'Conducted laboratory sessions across Microprocessors & Interfacing, Object Oriented Programming, Software Development for Engineers, and Computer Technology.',
        ],
      },
      {
        title: 'Visiting Technician',
        period: '2024',
        bullets: [
          'Conducted laboratory sessions for the Microprocessors & Interfacing course.',
          'Worked with micro-controller programming and simulation software.',
        ],
      },
      {
        title: 'Software Engineer Trainee',
        period: '2023 – 2024',
        bullets: [
          'Implemented backend services using Spring Boot.',
          'Managed and maintained a PostgreSQL database.',
          'Wrote C++ code to program micro-controllers.',
        ],
      },
    ],
  },
  {
    org: 'NERDC',
    period: '2022',
    current: false,
    roles: [
      {
        title: 'Research Engineer Trainee',
        bullets: [
          'Implemented C++ programs to handle micro-controller based projects.',
          'Used simulation software to run and validate simulations.',
        ],
      },
    ],
  },
]

export function WorkExperience() {
  const listRef = useRef<HTMLOListElement>(null)
  const [progress, setProgress] = useState(0)
  const [litCount, setLitCount] = useState(0)

  // The timeline line fills as you read down it; each dot lights when the line reaches it.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const list = listRef.current
      if (!list) return
      const rect = list.getBoundingClientRect()
      const probe = window.innerHeight * 0.55
      const filled = Math.min(rect.height, Math.max(0, probe - rect.top))
      setProgress(rect.height > 0 ? filled / rect.height : 0)
      let lit = 0
      list.querySelectorAll<HTMLElement>(':scope > li').forEach((li) => {
        if (li.offsetTop <= filled) lit += 1
      })
      setLitCount(lit)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
        <div>
          <p className="font-mono text-xs tracking-[0.18em] text-ink-subtle">Experience</p>
          <p className="mt-4 max-w-[22ch] text-sm leading-6 text-ink-muted">
            From micro-controllers and research labs to production AI systems.
          </p>
        </div>

        <ol ref={listRef} className="relative border-l border-hairline pl-8">
          <span
            className="pointer-events-none absolute -left-px top-0 w-px bg-accent/70"
            style={{ height: `${progress * 100}%` }}
            aria-hidden
          />
          {positions.map((position, index) => (
            <li key={position.org} className="relative pb-14 last:pb-0">
              <span
                className={`absolute -left-[calc(2rem+4.5px)] top-1.5 size-2 rounded-full transition-colors duration-300 ${
                  position.current ? 'bg-accent' : index < litCount ? 'bg-accent/60' : 'bg-ink-faint'
                }`}
              />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className={`font-mono text-xs ${position.current ? 'text-accent' : 'text-ink-faint'}`}>
                  {position.period}
                </span>
                {position.current && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] text-accent">
                    <span className="size-1.5 animate-pulse rounded-full bg-accent" />
                    Currently working
                  </span>
                )}
              </div>

              <h3 className="mt-2 text-xl text-ink">{position.org}</h3>

              <div className="mt-4 space-y-6">
                {position.roles.map((role) => (
                  <div key={role.title}>
                    <p className="flex flex-wrap items-baseline gap-x-3 text-[15px] text-ink">
                      {role.title}
                      {role.period && <span className="font-mono text-xs text-ink-faint">{role.period}</span>}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {role.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2.5 text-sm leading-6 text-ink-muted">
                          <span className="mt-[9px] size-1 shrink-0 rounded-full bg-ink-faint" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
