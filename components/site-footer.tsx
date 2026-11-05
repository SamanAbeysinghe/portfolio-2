import { ChevronDown, Mail } from 'lucide-react'

import { contactEmail, socialLinks } from '@/lib/site'

export function SiteFooter() {
  return (
      <footer className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-8 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between lg:px-8">
      <span>&copy; {new Date().getFullYear()} Saman Abeysinghe. All rights reserved.</span>
        <div className="flex items-center gap-5">
          <a href="#top" className="transition-colors hover:text-ink">
            Back to top
            <ChevronDown className="ml-1 inline size-3 rotate-180" />
          </a>
          <div className="flex items-center gap-4">
            {[...socialLinks, { label: 'Email', href: `mailto:${contactEmail}`, Icon: Mail }].map(
              ({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  aria-label={label}
                  className="text-ink-faint transition-colors hover:text-ink"
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                </a>
              ),
            )}
          </div>
        </div>
      </footer>
  )
}
