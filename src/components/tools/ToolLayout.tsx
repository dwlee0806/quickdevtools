'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, Shield, ArrowRight } from 'lucide-react'
import { ToolMeta, categoryLabels } from '@/types/tools'
import { getRelatedTools } from '@/lib/tools-registry'

interface ToolLayoutProps {
  tool: ToolMeta
  children: React.ReactNode
}

export default function ToolLayout({ tool, children }: ToolLayoutProps) {
  const related = getRelatedTools(tool.slug)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <motion.nav
        className="flex items-center gap-1.5 text-sm text-text-muted dark:text-text-muted-dark mb-8"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          href="/"
          className="hover:text-primary transition-colors font-medium"
        >
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          href={`/#${tool.category}`}
          className="hover:text-primary transition-colors font-medium"
        >
          {categoryLabels[tool.category]}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-text dark:text-text-dark font-medium">{tool.name}</span>
      </motion.nav>

      {/* Tool Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-text dark:text-text-dark mb-3 tracking-tight">
          {tool.name}
        </h1>
        <p className="text-text-muted dark:text-text-muted-dark text-lg leading-relaxed">
          {tool.description}
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20">
          <Shield className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
            All processing happens in your browser
          </span>
        </div>
      </motion.div>

      {/* Tool Container */}
      <motion.div
        className="glass-card rounded-2xl p-6 mb-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {children}
      </motion.div>

      {/* Related Tools */}
      {related.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-text dark:text-text-dark mb-5">
            Related Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {related.map(t => (
              <Link
                key={t.slug}
                href={`/tools/${t.category}/${t.slug}`}
                className="group flex items-center gap-3 p-3.5 rounded-xl glass-card hover:glow-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-primary/15 to-accent/10 text-primary text-xs font-mono font-bold shrink-0 group-hover:scale-105 transition-transform">
                  {t.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-text dark:text-text-dark group-hover:text-primary transition-colors truncate">
                    {t.name}
                  </p>
                  <p className="text-xs text-text-muted dark:text-text-muted-dark truncate">
                    {t.description}
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-text-muted dark:text-text-muted-dark opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </Link>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  )
}
