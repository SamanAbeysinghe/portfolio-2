import { Reveal } from '@/components/reveal'
import { eyebrow, skillGroups } from '@/lib/site'

export function Skills() {
  return (
      <section id="skills" className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <Reveal>
          <p className={eyebrow}>Engineering stack</p>
          <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p className="text-sm text-ink">{group.label}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-hairline px-3 py-1.5 font-mono text-xs text-ink-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          </Reveal>
        </div>
      </section>
  )
}
