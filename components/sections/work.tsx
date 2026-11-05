import { Reveal } from '@/components/reveal'
import { RagChatbotCard } from '@/components/projects/rag-chatbot-card'
import { DocumentExtractionCard } from '@/components/projects/document-extraction-card'
import { LocalRagCard } from '@/components/projects/local-rag-card'
import { QaCopilotCard } from '@/components/projects/qa-copilot-card'
import { LeafDeficiencyCard } from '@/components/projects/leaf-deficiency-card'
import { DropoutPredictionCard } from '@/components/projects/dropout-prediction-card'
import { SymptomCheckerCard } from '@/components/projects/symptom-checker-card'
import { ProjectArchive } from '@/components/project-archive'
import { eyebrow, sectionPad } from '@/lib/site'

export function Work() {
  return (
      <section id="builds" className={`mx-auto max-w-6xl ${sectionPad}`}>
        <Reveal className="mb-12">
          <p className={`mb-4 ${eyebrow}`}>Selected work</p>
          <h2 className="text-3xl tracking-[-0.03em] text-ink sm:text-5xl">Built for the real world.</h2>
        </Reveal>

        <Reveal>
        <p className={`mb-5 ${eyebrow}`}>AI systems</p>
        <div className="flex flex-col gap-5">
          <RagChatbotCard />
          <DocumentExtractionCard />
          <LocalRagCard />
          <QaCopilotCard />
        </div>
        </Reveal>

        <Reveal>
        <p className={`mb-5 mt-20 ${eyebrow}`}>Machine learning projects</p>
        <div className="grid gap-4 md:grid-cols-3">
          <LeafDeficiencyCard />
          <DropoutPredictionCard />
          <SymptomCheckerCard />
        </div>
        </Reveal>

        <Reveal>
          <ProjectArchive />
        </Reveal>
      </section>
  )
}
