'use client'

import { Upload, ScanSearch, Droplet, Code2, Server, Brain, FileCode, Palette, Braces } from 'lucide-react'

import { ProjectCard } from '@/components/project-card'
import { LeafDeficiencyVisual } from '@/components/projects/leaf-deficiency-visual'

export function LeafDeficiencyCard() {
  return (
    <ProjectCard
      number="05"
      metric="Image classification + diagnosis"
      title="Nutrient Deficiency Detection for Black Pepper Leaf"
      glow="var(--glow-accent)"
      tagline="A web app that identifies black pepper leaves from a photo, diagnoses the specific nutrient deficiency, and recommends a fix - all from a single image upload."
      visual={<LeafDeficiencyVisual />}
      steps={[
        {
          icon: Upload,
          title: 'Classify the image',
          description:
            'User uploads a leaf photo; a TensorFlow model first confirms whether it is actually a black pepper leaf before continuing.',
        },
        {
          icon: ScanSearch,
          title: 'Detect the deficiency',
          description:
            'A second model analyzes visible symptoms on the leaf to identify which specific nutrient deficiency is present.',
        },
        {
          icon: Droplet,
          title: 'Recommend a fix',
          description:
            'The system returns a plain-language diagnosis along with practical steps to mitigate the deficiency.',
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