'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronDown, Shield, ArrowRight, BookOpen, Target, HelpCircle, FileText } from 'lucide-react'
import { ToolMeta, categoryLabels } from '@/types/tools'
import { getRelatedTools } from '@/lib/tools-registry'
import { toolContent, ToolContent } from '@/lib/tool-content'

interface ToolLayoutProps {
  tool: ToolMeta
  children: React.ReactNode
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border/50 dark:border-border-dark/50 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="text-sm font-medium text-text dark:text-text-dark pr-4 group-hover:text-primary transition-colors">
          {q}
        </span>
        <ChevronDown className={`w-4 h-4 text-text-muted dark:text-text-muted-dark shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-text-muted dark:text-text-muted-dark leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ToolLayout({ tool, children }: ToolLayoutProps) {
  const related = getRelatedTools(tool.slug)
  const content: ToolContent | undefined = toolContent[tool.slug]

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <motion.nav
        className="flex items-center gap-1.5 text-sm text-text-muted dark:text-text-muted-dark mb-8"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/#${tool.category}`} className="hover:text-primary transition-colors font-medium">
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

      {/* ===== EDUCATIONAL CONTENT (AdSense value) ===== */}
      {content && (
        <div className="space-y-12 mb-14">
          {/* How to Use */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-text dark:text-text-dark">{content.howToUse.title}</h2>
            </div>
            <div className="space-y-3">
              {content.howToUse.steps.map((s, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-text dark:text-text-dark">{s.step}</p>
                    <p className="text-sm text-text-muted dark:text-text-muted-dark mt-0.5">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Use Cases */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <Target className="w-4 h-4 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-text dark:text-text-dark">Common Use Cases</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {content.useCases.map((uc, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl glass-card">
                  <span className="text-primary mt-0.5">&#10003;</span>
                  <p className="text-sm text-text-muted dark:text-text-muted-dark">{uc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Educational Article */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-warm/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-warm" />
              </div>
              <h2 className="text-xl font-bold text-text dark:text-text-dark">{content.relatedArticle.title}</h2>
            </div>
            <div className="text-sm text-text-muted dark:text-text-muted-dark leading-relaxed whitespace-pre-line">
              {content.relatedArticle.content}
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-text dark:text-text-dark">Frequently Asked Questions</h2>
            </div>
            <div className="glass-card rounded-2xl px-5">
              {content.faq.map((f, i) => (
                <FaqItem key={i} q={f.question} a={f.answer} />
              ))}
            </div>
          </motion.section>
        </div>
      )}

      {/* Related Tools */}
      {related.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl font-bold text-text dark:text-text-dark mb-5">Related Tools</h2>
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
                  <p className="text-sm font-semibold text-text dark:text-text-dark group-hover:text-primary transition-colors truncate">{t.name}</p>
                  <p className="text-xs text-text-muted dark:text-text-muted-dark truncate">{t.description}</p>
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
