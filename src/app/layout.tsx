import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CookieConsent from '@/components/layout/CookieConsent'

export const metadata: Metadata = {
  title: {
    default: 'QuickDevTools - Free Online Developer Tools | JSON, Base64, Color & More',
    template: '%s | QuickDevTools',
  },
  description: 'Free online developer tools built for speed and privacy. JSON formatter, Base64 encoder, color converter, UUID generator, and more. All tools run 100% in your browser — no data ever leaves your device.',
  keywords: [
    'developer tools',
    'online tools',
    'json formatter',
    'base64 encode',
    'color converter',
    'free tools',
    'web developer tools',
    'url encoder',
    'jwt decoder',
    'uuid generator',
    'hash generator',
    'csv to json',
    'browser tools',
    'privacy-first tools',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'QuickDevTools',
    title: 'QuickDevTools - Free Online Developer Tools',
    description: 'Fast, free, and private developer tools that run entirely in your browser. No sign-up required.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuickDevTools - Free Online Developer Tools',
    description: 'Fast, free, and private developer tools that run entirely in your browser.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="gradient-mesh text-text dark:text-text-dark min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
