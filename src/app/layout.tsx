import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { Providers } from './providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Banana Knowledge Hub | Das komplette Bananen-Wissen',
    template: '%s | Banana Knowledge Hub',
  },
  description: 'Die umfassendste Wissensplattform rund um die Banane. Botanik, Ernährung, Anbau, Sorten, Geschichte & Kurioses. Wissenschaftlich fundiert, visuell aufbereitet, kostenlos.',
  keywords: ['Banane', 'Wissen', 'Botanik', 'Ernährung', 'Anbau', 'Sorten', 'Geschichte', 'Cavendish', 'Obst'],
  authors: [{ name: 'Banana Knowledge Hub' }],
  creator: 'Banana Knowledge Hub',
  publisher: 'Banana Knowledge Hub',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://banana-knowledge-hub.com',
    siteName: 'Banana Knowledge Hub',
    title: 'Banana Knowledge Hub | Das komplette Bananen-Wissen',
    description: 'Die umfassendste Wissensplattform rund um die Banane. Wissenschaftlich fundiert, visuell aufbereitet, kostenlos.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Banana Knowledge Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Banana Knowledge Hub',
    description: 'Die umfassendste Wissensplattform rund um die Banane.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFEF7' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const fontClass = geistSans.variable + ' ' + geistMono.variable + ' scroll-smooth'
  return (
    <html lang='de' className={fontClass} suppressHydrationWarning>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link rel='dns-prefetch' href='https://fonts.googleapis.com' />
        <link rel='dns-prefetch' href='https://fonts.gstatic.com' />
      </head>
      <body className='bg-background text-foreground antialiased'>
        <Providers>
          <Header />
          <main id='main-content' className='min-h-screen pt-18'>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
