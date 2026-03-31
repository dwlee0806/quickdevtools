import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about QuickDevTools — free, private, and fast online developer tools built for speed. All processing happens in your browser with zero data collection.',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
