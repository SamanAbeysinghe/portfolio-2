'use client'

import { ShieldCheck, FolderSearch, Star, Cpu, Layers, Component, Server, Database } from 'lucide-react'

import { ProjectCard } from '@/components/project-card'
import { LocalRagVisual } from '@/components/projects/local-rag-visual'

export function LocalRagCard() {
  return (
    <ProjectCard
      number="03"
      variant="feature"
      metric="100% on-device inference"
      title="Fully Local, Private RAG System"
      glow="var(--glow-cyan)"
      tagline="A privacy-first RAG system for regulated environments - runs entirely on local hardware with zero internet dependency and complete data isolation."
      visual={<LocalRagVisual />}
      steps={[
        {
          icon: ShieldCheck,
          title: 'Runs fully offline',
          description:
            'Architected the entire local inference and retrieval stack - local LLM serving, embedding, and vector search - for sectors like banking and legal where data can never leave the device.',
        },
        {
          icon: FolderSearch,
          title: 'Query any document set',
          description:
            'Users manage a personal document inventory and prompt across all of it, with complete data isolation guaranteed by design.',
        },
        {
          icon: Star,
          title: 'Learns from feedback',
          description:
            'Users rate each response; ratings feed back into the system to continuously improve retrieval and answer quality.',
        },
      ]}
      tags={['Ollama (Local LLM Inference)', 'ChromaDB (Vector DB)', 'React', 'Flask', 'PostgreSQL']}
      tagIcons={{
        'Ollama (Local LLM Inference)': Cpu,
        'ChromaDB (Vector DB)': Layers,
        'React': Component,
        'Flask': Server,
        'PostgreSQL': Database,
      }}
    />
  )
}