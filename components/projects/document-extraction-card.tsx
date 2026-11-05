'use client'

import { ScanSearch, Bot, ShieldCheck, Code2, Server, Cloud, Database, LayoutTemplate } from 'lucide-react'

import { ProjectCard } from '@/components/project-card'
import { DocumentExtractionVisual } from '@/components/projects/document-extraction-visual'

export function DocumentExtractionCard() {
  return (
    <ProjectCard
      number="02"
      variant="feature"
      metric="Computer vision + LLM extraction pipeline"
      title="Intelligent Document & Handwriting Extraction System"
      glow="var(--glow-violet)"
      tagline="Turns messy, handwritten paperwork into structured, audit-ready data - then validates every record against your own business rules automatically."
      visual={<DocumentExtractionVisual />}
      steps={[
        {
          icon: ScanSearch,
          title: 'Detect fields',
          description:
            'YOLO-based object detection localizes question and answer regions on each scanned page, even with handwritten English text.',
        },
        {
          icon: Bot,
          title: 'Extract & structure',
          description:
            'An LLM reads the detected regions and returns clean, structured Q&A pairs, alongside a full annotated-document view mapped back to the source.',
        },
        {
          icon: ShieldCheck,
          title: 'Validate & report',
          description:
            'A configurable rule engine evaluates each document against custom business logic and generates a pass/fail compliance report, with a UI to edit, search, and manage records.',
        },
      ]}
      tags={['Python', 'Next.js', 'Flask', 'Claude (LLM)', 'AWS Bedrock', 'YOLO (Object Detection)', 'PostgreSQL']}
      tagIcons={{
        'Python': Code2,
        'Next.js': LayoutTemplate,
        'Flask': Server,
        'Claude (LLM)': Bot,
        'AWS Bedrock': Cloud,
        'YOLO (Object Detection)': ScanSearch,
        'PostgreSQL': Database,
      }}
    />
  )
}