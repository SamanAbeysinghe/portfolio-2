import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-face',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Saman Abeysinghe - AI Engineer',
  description: 'I design and build production-ready AI applications using LLMs, RAG, computer vision, OCR, intelligent automation and modern cloud technologies.',
  keywords: 'AI Engineer, RAG Systems, LLM, Computer Vision, OCR, AI SaaS, Document Intelligence, AI Automation',
  openGraph: {
    title: 'Saman Abeysinghe - AI Engineer',
    description: 'I design and build production-ready AI applications using LLMs, RAG, computer vision, OCR, intelligent automation and modern cloud technologies.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Engineer - Production AI Systems',
    description: 'I design and build production-ready AI applications',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfbfc' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Saman Abeysinghe',
  jobTitle: 'AI Engineer',
  url: siteUrl,
  email: 'mailto:saman.amk@gmail.com',
  address: { '@type': 'PostalAddress', addressCountry: 'LK' },
  worksFor: { '@type': 'Organization', name: 'Cenango (Pvt) Ltd' },
}

// Runs before first paint, so the correct theme is on <html> with no flash.
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored || 'system';
    var dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    var root = document.documentElement;
    root.classList.toggle('dark', dark);
    root.classList.toggle('light', !dark);
    root.style.colorScheme = dark ? 'dark' : 'light';
  } catch (e) {}
})();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}