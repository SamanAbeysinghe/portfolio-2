'use client'

import { MessageSquareText, Brain, Globe, Code2, Server, FileCode, Palette, Braces } from 'lucide-react'

import { ProjectCard } from '@/components/project-card'
import { SymptomCheckerVisual } from '@/components/projects/symptom-checker-visual'

export function SymptomCheckerCard() {
  return (
    <ProjectCard
      number="07"
      metric="Symptom parsing + condition lookup"
      title="AI-Powered Health Symptom Checker"
      glow="var(--glow-cyan)"
      tagline="Takes freeform symptom text, extracts the relevant keywords, predicts the likely condition, then automatically pulls in details and medication info about it."
      visual={<SymptomCheckerVisual />}
      steps={[
        {
          icon: MessageSquareText,
          title: 'Parse symptoms',
          description:
            'Patient describes their symptoms in plain text through an HTML interface; the system extracts them into individual keyword terms.',
        },
        {
          icon: Brain,
          title: 'Predict the condition',
          description:
            'Keywords are passed to a pre-trained ML model served through Flask, which predicts the most likely condition.',
        },
        {
          icon: Globe,
          title: 'Enrich with details',
          description:
            'The frontend automatically scrapes relevant information about the predicted condition - description and medication - and presents it to the patient.',
        },
      ]}
      tags={['Python', 'Flask', 'TensorFlow', 'HTML', 'CSS', 'JavaScript']}
      tagIcons={{
        'Python': Code2,
        'Flask': Server,
        'TensorFlow': Brain,
        'HTML': FileCode,
        'CSS': Palette,
        'JavaScript': Braces,
      }}
    />
  )
}