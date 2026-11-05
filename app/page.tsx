import { About } from '@/components/sections/about'
import { Education } from '@/components/sections/education'
import { Contact } from '@/components/sections/contact'
import { Hero } from '@/components/sections/hero'
import { Skills } from '@/components/sections/skills'
import { Work } from '@/components/sections/work'
import { Reveal } from '@/components/reveal'
import { CursorGlow } from '@/components/cursor-glow'
import { ScrollProgress } from '@/components/scroll-progress'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { SocialRail } from '@/components/social-rail'
import { getAllPosts } from '@/lib/blog'
import { WorkExperience } from '@/components/work-experience'

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-canvas text-ink">
      <SiteNav showBlog={getAllPosts().length > 0} />
      <ScrollProgress />
      <CursorGlow />
      <Hero />
      <Work />
      <Reveal>
        <WorkExperience />
      </Reveal>
      <Education />
      <Skills />
      <About />
      <Contact />
      <SiteFooter />
      <SocialRail />
    </main>
  )
}
