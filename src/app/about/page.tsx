import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'About QuickDevTools - Free online tools for developers and designers.',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text dark:text-text-dark mb-6">About QuickDevTools</h1>

      <div className="prose dark:prose-invert max-w-none space-y-4 text-text-muted dark:text-text-muted-dark">
        <p>
          QuickDevTools is a collection of free, fast, and privacy-focused online tools
          built for developers, designers, and anyone who works with data.
        </p>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">Why QuickDevTools?</h2>

        <ul className="space-y-2 list-disc pl-6">
          <li>
            <strong className="text-text dark:text-text-dark">100% Client-Side</strong> — All processing happens in your browser.
            No data is ever sent to our servers.
          </li>
          <li>
            <strong className="text-text dark:text-text-dark">Free Forever</strong> — Every tool is completely free to use,
            with no sign-up required.
          </li>
          <li>
            <strong className="text-text dark:text-text-dark">Fast & Clean</strong> — No bloat, no popups, no dark patterns.
            Just the tools you need.
          </li>
          <li>
            <strong className="text-text dark:text-text-dark">Open & Transparent</strong> — What you see is what you get.
            Simple tools that do one thing well.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-text dark:text-text-dark mt-8">Contact</h2>
        <p>
          Have feedback, a bug report, or a tool request? We&apos;d love to hear from you.
        </p>
      </div>
    </div>
  )
}
