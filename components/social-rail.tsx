import { Mail } from 'lucide-react'

import { contactEmail, socialLinks } from '@/lib/site'

export function SocialRail() {
  return (
<div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
  <div className="flex flex-col items-center gap-3">
    {[
      ...socialLinks,
      {
        label: 'Email',
        href: `mailto:${contactEmail}`,
        Icon: Mail,
      },
    ].map(({ label, href, Icon }) => (
      <a
        key={label}
        href={href}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
        aria-label={label}
        className="flex size-8 items-center justify-center rounded-full border border-hairline bg-canvas/80 text-ink-faint backdrop-blur transition-all hover:border-accent hover:text-accent"
      >
        <Icon className="size-3.5" />
      </a>
    ))}
  </div>

  <div className="h-16 w-px bg-gradient-to-b from-hairline-strong to-transparent" />
</div>
  )
}
