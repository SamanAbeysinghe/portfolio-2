'use client'

import { Globe, Database, Bot, MessageSquare, Code2, Server, Sparkles, Layers, Cloud, Workflow } from 'lucide-react'

import { ProjectCard } from '@/components/project-card'

export function RagChatbotCard() {
  return (
    <ProjectCard
      number="01"
      variant="feature"
      metric="Multi-tenant RAG pipeline"
      title="RAG-Based Chatbot for WordPress"
      glow="var(--glow-accent)"
      tagline="A self-serve RAG platform - connect a WordPress site and ship a production-ready AI chat widget in minutes, no code required from the customer."
      pipeline={{
        label: 'RAG pipeline',
        stages: [
          { label: 'WP Site', detail: 'user connects site' },
          { label: 'Crawl', detail: 'fetch & chunk content' },
          { label: 'Embed', detail: 'vectorise (Voyage AI)' },
          { label: 'Qdrant', detail: 'semantic vector search' },
          { label: 'Claude', detail: 'reason over context' },
          { label: 'Widget', detail: 'respond on-site' },
        ],
      }}
      steps={[
        {
          icon: Globe,
          title: 'Connect & ingest',
          description:
            'User registers on the dashboard and enters their WordPress URL. The system auto-crawls and chunks the full site content.',
        },
        {
          icon: Database,
          title: 'Embed & index',
          description:
            'Content is embedded with Voyage AI and indexed in Qdrant for fast, relevant semantic retrieval at query time.',
        },
        {
          icon: MessageSquare,
          title: 'Deploy & chat',
          description:
            'Dashboard issues a script tag that drops a Claude-powered chat widget onto the site, answering visitor questions grounded in that content - with async ingestion handled through AWS SQS/SNS.',
        },
      ]}
      tags={['Python', 'Flask', 'Claude (LLM)', 'Voyage AI (Embeddings)', 'Qdrant (Vector DB)', 'AWS Bedrock', 'SQS/SNS', 'PostgreSQL']}
      tagIcons={{
        'Python': Code2,
        'Flask': Server,
        'Claude (LLM)': Bot,
        'Voyage AI (Embeddings)': Sparkles,
        'Qdrant (Vector DB)': Layers,
        'AWS Bedrock': Cloud,
        'SQS/SNS': Workflow,
        'PostgreSQL': Database,
      }}
    />
  )
}