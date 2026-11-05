import { GithubIcon, LinkedinIcon } from '@/components/social-icons'

export const cvHref = '/Saman_Abeysinghe_CV.pdf'

export const contactEmail = 'saman.amk@gmail.com'

export const navItems = [
  { label: 'Builds', id: 'builds' },
  { label: 'Experience', id: 'experience' },
  { label: 'About me', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/samanAbeysinghe', Icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/saman-abeysinghe-6460a0174', Icon: LinkedinIcon },
]

export const skillGroups = [
  { label: 'LLMs & RAG', items: ['Claude', 'AWS Bedrock', 'Voyage AI', 'Qdrant', 'ChromaDB', 'Ollama', 'Llama 3.1'] },
  { label: 'Document AI & Vision', items: ['YOLO', 'TensorFlow', 'OCR & handwriting extraction'] },
  { label: 'Backend & Cloud', items: ['Python', 'Flask', 'Spring Boot', 'PostgreSQL', 'SQLite', 'AWS SQS/SNS'] },
  { label: 'Frontend', items: ['TypeScript', 'Next.js', 'React'] },
  { label: 'Embedded', items: ['C++', 'Micro-controllers', 'Simulation tools'] },
]

export const eyebrow = 'font-mono text-xs tracking-[0.18em] text-ink-subtle'
export const sectionPad = 'px-6 py-24 lg:px-8 lg:py-32'
