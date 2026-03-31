'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Search, Moon, Sun, Menu, X, ArrowRight } from 'lucide-react'
import { tools } from '@/lib/tools-registry'

export default function Header() {
  const [dark, setDark] = useState(false)
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = stored === 'dark' || (!stored && prefersDark)
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowSearch(prev => !prev)
      }
      if (e.key === 'Escape') {
        setShowSearch(false)
        setSearch('')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (showSearch) {
      requestAnimationFrame(() => searchInputRef.current?.focus())
    }
  }, [showSearch])

  const toggleDark = useCallback(() => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }, [dark])

  const filtered = search.trim()
    ? tools.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.keywords.some(k => k.toLowerCase().includes(search.toLowerCase()))
      )
    : []

  const closeSearch = useCallback(() => {
    setShowSearch(false)
    setSearch('')
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-card shadow-lg shadow-black/5 dark:shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Zap className="w-4.5 h-4.5 text-primary" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-lg tracking-tight text-text dark:text-text-dark">
              Quick<span className="text-primary">Dev</span>Tools
            </span>
          </Link>

          {/* Desktop Actions */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => setShowSearch(true)}
              className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-border dark:border-border-dark hover:border-primary/40 bg-surface-secondary/50 dark:bg-surface-secondary-dark/50 text-text-muted dark:text-text-muted-dark text-sm transition-all hover:shadow-sm"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Search tools...</span>
              <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-surface dark:bg-surface-dark border border-border dark:border-border-dark text-[10px] font-mono font-medium text-text-muted dark:text-text-muted-dark">
                <span className="text-xs">&#8984;</span>K
              </kbd>
            </button>

            {/* Mobile Search */}
            <button
              onClick={() => setShowSearch(true)}
              className="sm:hidden p-2 rounded-xl hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark text-text-muted dark:text-text-muted-dark transition-colors"
              aria-label="Search tools"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDark}
              className="relative p-2 rounded-xl hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark text-text-muted dark:text-text-muted-dark transition-colors"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                {dark ? (
                  <motion.div
                    key="sun"
                    initial={{ scale: 0, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0, rotate: 90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="sm:hidden p-2 rounded-xl hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark text-text-muted dark:text-text-muted-dark transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="sm:hidden overflow-hidden border-t border-border dark:border-border-dark"
            >
              <div className="px-4 py-3 space-y-1">
                {(['developer', 'color', 'text', 'converter'] as const).map(cat => (
                  <Link
                    key={cat}
                    href={`/#${cat}`}
                    onClick={() => setMobileMenu(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-text dark:text-text-dark hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark transition-colors"
                  >
                    <span className="capitalize">{cat} Tools</span>
                    <ArrowRight className="w-3.5 h-3.5 text-text-muted dark:text-text-muted-dark" />
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search Overlay (Command Palette) */}
      <AnimatePresence>
        {showSearch && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[60] bg-black/40 dark:bg-black/60 backdrop-blur-sm"
              onClick={closeSearch}
            />
            <div className="fixed inset-0 z-[61] flex items-start justify-center pt-[15vh] px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -10 }}
                transition={{ duration: 0.15 }}
                className="w-full max-w-lg glass-card rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border dark:border-border-dark">
                  <Search className="w-4.5 h-4.5 text-text-muted dark:text-text-muted-dark shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search tools..."
                    className="flex-1 bg-transparent text-text dark:text-text-dark placeholder-text-muted dark:placeholder-text-muted-dark focus:outline-none text-sm"
                  />
                  <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md bg-surface-secondary dark:bg-surface-secondary-dark border border-border dark:border-border-dark text-[10px] font-mono text-text-muted dark:text-text-muted-dark">
                    ESC
                  </kbd>
                </div>

                <div className="max-h-80 overflow-y-auto custom-scrollbar">
                  {search.trim() === '' && (
                    <div className="px-4 py-8 text-center text-sm text-text-muted dark:text-text-muted-dark">
                      Start typing to search {tools.length} tools...
                    </div>
                  )}

                  {filtered.length > 0 && (
                    <div className="p-2">
                      {filtered.map((t, i) => (
                        <Link
                          key={t.slug}
                          href={`/tools/${t.category}/${t.slug}`}
                          onClick={closeSearch}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors group"
                        >
                          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-xs font-mono font-bold shrink-0">
                            {t.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-text dark:text-text-dark group-hover:text-primary transition-colors truncate">
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
                  )}

                  {search.trim() !== '' && filtered.length === 0 && (
                    <div className="px-4 py-8 text-center text-sm text-text-muted dark:text-text-muted-dark">
                      No tools found for &ldquo;{search}&rdquo;
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
