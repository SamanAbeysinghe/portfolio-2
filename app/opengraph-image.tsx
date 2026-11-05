import { ImageResponse } from 'next/og'

export const alt = 'Saman Abeysinghe - AI Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#0a0a0a',
          color: '#f4f4f5',
        }}
      >
        <div style={{ display: 'flex', fontSize: 32, color: '#60a5fa' }}>/dev.ai</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -3 }}>Saman Abeysinghe</div>
          <div style={{ marginTop: 16, fontSize: 40, color: '#a1a1aa' }}>
            AI Engineer · LLMs, RAG, Document AI, Computer Vision
          </div>
        </div>
      </div>
    ),
    size,
  )
}
