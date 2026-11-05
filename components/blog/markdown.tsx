import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

const components: Components = {
  h2: (props) => <h2 className="mb-4 mt-12 text-2xl tracking-[-0.02em] text-ink" {...props} />,
  h3: (props) => <h3 className="mb-3 mt-8 text-lg text-ink" {...props} />,
  p: (props) => <p className="my-5 leading-7 text-ink-muted" {...props} />,
  a: ({ href = '', ...props }) => {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        className="text-accent underline underline-offset-4 transition-opacity hover:opacity-80"
        {...props}
      />
    )
  },
  ul: (props) => (
    <ul className="my-5 list-disc space-y-2 pl-6 leading-7 text-ink-muted marker:text-ink-faint" {...props} />
  ),
  ol: (props) => (
    <ol className="my-5 list-decimal space-y-2 pl-6 leading-7 text-ink-muted marker:text-ink-faint" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="my-6 border-l-2 border-accent/50 pl-4 italic text-ink-muted" {...props} />
  ),
  hr: () => <hr className="my-10 border-hairline" />,
  strong: (props) => <strong className="font-medium text-ink" {...props} />,
  // inline code; fenced blocks reset these styles through the <pre> wrapper below
  code: (props) => (
    <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.88em] text-ink" {...props} />
  ),
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl border border-hairline bg-surface p-4 font-mono text-[13px] leading-6 text-ink-muted [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-ink-muted"
      {...props}
    />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props) => <th className="border-b border-hairline-strong px-3 py-2 font-medium text-ink" {...props} />,
  td: (props) => <td className="border-b border-hairline px-3 py-2 text-ink-muted" {...props} />,
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ alt = '', ...props }) => <img alt={alt} className="my-6 rounded-xl border border-hairline" {...props} />,
}

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  )
}
