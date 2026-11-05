'use client'

import { UserPlus, Brain, BarChart3, Code2, Server, FileCode, Palette, Braces } from 'lucide-react'

import { ProjectCard } from '@/components/project-card'
import { DropoutPredictionVisual } from '@/components/projects/dropout-prediction-visual'

export function DropoutPredictionCard() {
  return (
    <ProjectCard
      number="06"
      metric="3-class outcome prediction"
      title="Student Dropout Prediction System"
      glow="var(--glow-violet)"
      tagline="Predicts whether a newly registered student is likely to graduate, stay enrolled, or drop out, based on their registration data."
      visual={<DropoutPredictionVisual />}
      steps={[
        {
          icon: UserPlus,
          title: 'Collect student data',
          description:
            'Newly registered student details are captured through a simple HTML, CSS, and JavaScript interface.',
        },
        {
          icon: Brain,
          title: 'Predict the outcome',
          description:
            'A TensorFlow model served through Flask classifies the student into one of three outcomes: graduate, dropout, or currently enrolled.',
        },
        {
          icon: BarChart3,
          title: 'Surface the risk',
          description:
            'Returns a full probability breakdown across all three outcomes, not just a single label, so risk can be seen at a glance.',
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