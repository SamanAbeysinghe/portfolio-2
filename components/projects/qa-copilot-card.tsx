'use client'

import { FileText, ShieldCheck, UserCheck, PlayCircle, LineChart, Component, Server, Database, Cpu, Code2 } from 'lucide-react'

import { ProjectCard } from '@/components/project-card'
import { QaCopilotVisual } from '@/components/projects/qa-copilot-visual'

export function QaCopilotCard() {
  return (
    <ProjectCard
      number="04"
      variant="feature"
      metric="Human-in-the-loop AI testing"
      title="QA Copilot: AI-Assisted Software Testing"
      glow="var(--glow-violet)"
      tagline="A full-stack platform where a local Llama 3.1 model drafts test cases from user stories, automatic checks flag weak or duplicate output, people approve everything, and sprint comparison measures whether the AI actually helps. Built solo as the practical part of an MSc research project."
      visual={<QaCopilotVisual />}
      steps={[
        {
          icon: FileText,
          title: 'Draft from user stories',
          description:
            'One click turns a story and its acceptance criteria into test cases using a locally hosted model (Ollama). Output is schema-validated JSON with one retry, and every call is stored with its prompt version and latency.',
        },
        {
          icon: ShieldCheck,
          title: 'Check the AI, never trust it',
          description:
            'Quality checks flag vague or single-step tests. Semantic duplicate detection compares tests by meaning, with thresholds calibrated on measured similarity scores. Generated scripts are checked for real assertions.',
        },
        {
          icon: UserCheck,
          title: 'A person approves everything',
          description:
            'Tests land as pending review. Testers approve, edit or reject with a reason, and both the AI draft and the human edit are versioned.',
        },
        {
          icon: PlayCircle,
          title: 'Run, rank and track',
          description:
            'Record or import test runs (JUnit XML, CSV), turn failures into defects with AI severity suggestions, and build risk-ranked regression suites where every pick states its reason.',
        },
        {
          icon: LineChart,
          title: 'Measure whether AI helps',
          description:
            'Sprints run with AI on or off. A dashboard tracks four QA dimensions across 15 metrics plus how often the AI was right. The research survey is still to be run, so no effectiveness results are claimed.',
        },
      ]}
      tags={['Next.js 15', 'TypeScript', 'Flask', 'SQLite', 'Ollama (Llama 3.1 8B)', 'Embeddings', 'pytest']}
      tagIcons={{
        'Next.js 15': Component,
        'TypeScript': Code2,
        'Flask': Server,
        'SQLite': Database,
        'Ollama (Llama 3.1 8B)': Cpu,
      }}
    />
  )
}
