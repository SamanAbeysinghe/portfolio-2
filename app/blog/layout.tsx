import { BlogHeader } from '@/components/blog/blog-header'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <BlogHeader />
      {children}
    </div>
  )
}
