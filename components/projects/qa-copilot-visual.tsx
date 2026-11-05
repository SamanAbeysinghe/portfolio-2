import { CheckCircle2, AlertTriangle, Clock } from 'lucide-react'

const queue = [
  { title: 'Login rejects an unregistered email', status: 'Approved', tone: 'ok' },
  { title: 'Reset link expires after one hour', status: 'Edited', tone: 'ok' },
  { title: 'Verify the page works', status: 'Flagged: vague expected result', tone: 'warn' },
  { title: 'Sign-in with wrong password fails', status: 'Pending review', tone: 'wait' },
] as const

// Real similarity scores measured while calibrating duplicate detection.
const similarity = [
  { label: 'Reordered words', score: 0.96 },
  { label: 'Paraphrase', score: 0.88 },
  { label: 'Related, different test', score: 0.8 },
  { label: 'Different feature', score: 0.59 },
]

export function QaCopilotVisual({ className = '' }: { className?: string }) {
  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      <div className="rounded-xl border border-hairline bg-canvas-raised p-3">
        <p className="mb-2 font-mono text-[9px] tracking-[0.14em] text-ink-subtle">AI DRAFTS · HUMAN REVIEWS</p>
        <div className="flex flex-col gap-1.5">
          {queue.map((item) => {
            const Icon = item.tone === 'ok' ? CheckCircle2 : item.tone === 'warn' ? AlertTriangle : Clock
            const color = item.tone === 'ok' ? 'text-accent' : item.tone === 'warn' ? 'text-amber-400' : 'text-ink-faint'
            return (
              <div key={item.title} className="rounded-lg border border-hairline bg-canvas/60 px-2 py-1.5">
                <p className="text-[10.5px] leading-tight text-ink-muted">{item.title}</p>
                <p className={`mt-0.5 flex items-center gap-1 font-mono text-[9px] ${color}`}>
                  <Icon className="size-2.5 shrink-0" strokeWidth={2} />
                  {item.status}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="rounded-xl border border-hairline bg-canvas-raised p-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-mono text-[9px] tracking-[0.14em] text-ink-subtle">DUPLICATE CHECK</p>
          <span className="font-mono text-[9px] text-ink-faint">embeddings</span>
        </div>
        <div className="flex flex-col gap-2">
          {similarity.map((row) => (
            <div key={row.label}>
              <div className="flex items-center justify-between text-[10px] text-ink-muted">
                <span>{row.label}</span>
                <span className="font-mono text-ink-faint">{row.score.toFixed(2)}</span>
              </div>
              <div className="mt-1 h-1 rounded bg-hairline">
                <div
                  className={`h-1 rounded ${row.score >= 0.9 ? 'bg-amber-400' : row.score >= 0.84 ? 'bg-accent' : 'bg-ink-faint/60'}`}
                  style={{ width: `${row.score * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2.5 font-mono text-[9px] leading-4 text-ink-faint">
          ≥ 0.90 dropped · 0.84–0.90 kept &amp; flagged
        </p>
      </div>
    </div>
  )
}
