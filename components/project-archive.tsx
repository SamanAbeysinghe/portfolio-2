import { eyebrow } from '@/lib/site'

const projects = [
  { name: 'RAG-Based Chatbot for WordPress', type: 'AI system', stack: ['Claude', 'Voyage AI', 'Qdrant', 'Flask', 'AWS'] },
  { name: 'Document & Handwriting Extraction', type: 'AI system', stack: ['YOLO', 'Claude', 'Bedrock', 'Next.js', 'Flask'] },
  { name: 'Fully Local, Private RAG', type: 'AI system', stack: ['Ollama', 'ChromaDB', 'React', 'Flask'] },
  { name: 'QA Copilot: AI-Assisted Software Testing', type: 'AI system · MSc research', stack: ['Next.js', 'Flask', 'SQLite', 'Ollama'] },
  { name: 'Black Pepper Leaf Deficiency Detection', type: 'ML · published', stack: ['TensorFlow', 'Python', 'Flask'] },
  { name: 'Student Dropout Prediction', type: 'Machine learning', stack: ['TensorFlow', 'Python', 'Flask'] },
  { name: 'AI-Powered Health Symptom Checker', type: 'Machine learning', stack: ['TensorFlow', 'Python', 'Flask'] },
  { name: 'Wood Classification & Defect Detection', type: 'Computer vision', stack: ['YOLO', 'PyTorch', 'React', 'Flask'] },
  { name: 'IoT Real-Time Power Monitoring', type: 'IoT', stack: ['Spring Boot', 'Angular', 'PostgreSQL', 'C++'] },
  { name: 'Recipe Management & Cooking Website', type: 'Full-stack', stack: ['React', 'Spring Boot', 'OAuth2', 'JWT', 'MySQL'] },
  { name: 'Automated Public Space Management', type: 'Pera Innovations', stack: ['University of Peradeniya'] },
  { name: 'Processor for Matrix Operations', type: 'Hardware', stack: ['VHDL', 'FPGA'] },
]

/** Compact list of everything built, so the big cards can stay focused on the best work. */
export function ProjectArchive() {
  return (
    <div>
      <p className={`mb-5 mt-20 ${eyebrow}`}>All projects</p>
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-hairline font-mono text-[11px] text-ink-faint">
            <th className="py-3 pr-4 font-normal">Project</th>
            <th className="hidden py-3 pr-4 font-normal sm:table-cell">Type</th>
            <th className="hidden py-3 font-normal md:table-cell">Built with</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.name} className="border-b border-hairline/70 transition-colors hover:bg-surface-hover">
              <td className="py-3.5 pr-4 align-top text-ink">
                {project.name}
                <span className="mt-1 block font-mono text-[11px] text-ink-faint sm:hidden">{project.type}</span>
              </td>
              <td className="hidden py-3.5 pr-4 align-top text-ink-muted sm:table-cell">{project.type}</td>
              <td className="hidden py-3.5 align-top md:table-cell">
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-hairline px-2 py-0.5 font-mono text-[10px] text-ink-subtle"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
