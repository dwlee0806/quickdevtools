import Link from 'next/link'
import { Zap, Shield, Heart } from 'lucide-react'

const quickLinks = [
  { label: 'JSON Formatter', href: '/tools/developer/json-formatter' },
  { label: 'Base64 Encoder', href: '/tools/developer/base64-encoder-decoder' },
  { label: 'Color Converter', href: '/tools/color/color-converter' },
  { label: 'Word Counter', href: '/tools/text/word-counter' },
]

const resourceLinks = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
]

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border dark:border-border-dark">
      {/* Subtle gradient top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Zap className="w-4.5 h-4.5 text-primary" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg tracking-tight text-text dark:text-text-dark">
                Quick<span className="text-primary">Dev</span>Tools
              </span>
            </Link>
            <p className="text-sm text-text-muted dark:text-text-muted-dark max-w-sm leading-relaxed mb-5">
              Free, fast developer tools that run entirely in your browser. No sign-ups, no servers, no tracking of your data.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20">
              <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                Your data never leaves your browser
              </span>
            </div>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="text-sm font-semibold text-text dark:text-text-dark mb-4">
              Popular Tools
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted dark:text-text-muted-dark hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-text dark:text-text-dark mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {resourceLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted dark:text-text-muted-dark hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border dark:border-border-dark flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-text-muted dark:text-text-muted-dark">
            &copy; {new Date().getFullYear()} QuickDevTools. All rights reserved.
          </p>
          <p className="text-xs text-text-muted dark:text-text-muted-dark flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-400" /> for developers worldwide
          </p>
        </div>
      </div>
    </footer>
  )
}
