'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Zap,
  Shield,
  UserX,
  Braces,
  Palette,
  Type,
  ArrowRightLeft,
  ChevronDown,
  Lock,
  Globe,
  Cpu,
  Search,
  MousePointerClick,
  Rocket,
  BellOff,
  KeyRound,
  MonitorSmartphone,
  Sparkles,
  ArrowRight,
  Ban,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import { tools } from '@/lib/tools-registry'
import { ToolCategory, categoryLabels } from '@/types/tools'

const categories: ToolCategory[] = ['developer', 'color', 'text', 'converter']

const categoryIconMap: Record<ToolCategory, React.ReactNode> = {
  developer: <Braces className="w-5 h-5" />,
  color: <Palette className="w-5 h-5" />,
  text: <Type className="w-5 h-5" />,
  converter: <ArrowRightLeft className="w-5 h-5" />,
}

const trustBadges = [
  {
    icon: <Cpu className="w-5 h-5" />,
    label: '100% Client-Side',
    description: 'All processing in your browser',
  },
  {
    icon: <UserX className="w-5 h-5" />,
    label: 'No Sign-up',
    description: 'Use instantly, no account needed',
  },
  {
    icon: <Globe className="w-5 h-5" />,
    label: 'Free Forever',
    description: 'No paywalls or hidden limits',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] as const } },
}

const floatingIcons = [
  { icon: '{ }', x: '10%', y: '20%', delay: 0, size: 'text-2xl' },
  { icon: '#', x: '85%', y: '15%', delay: 0.5, size: 'text-xl' },
  { icon: 'B64', x: '75%', y: '70%', delay: 1, size: 'text-sm' },
  { icon: '%', x: '15%', y: '75%', delay: 1.5, size: 'text-lg' },
  { icon: 'ID', x: '90%', y: '50%', delay: 0.8, size: 'text-sm' },
  { icon: 'Aa', x: '5%', y: '50%', delay: 1.2, size: 'text-lg' },
]

const howItWorksSteps = [
  {
    icon: <Search className="w-7 h-7" />,
    step: '01',
    title: 'Choose a Tool',
    description: 'Browse our curated collection of developer utilities organized by category.',
  },
  {
    icon: <MousePointerClick className="w-7 h-7" />,
    step: '02',
    title: 'Use Instantly',
    description: 'No sign-up, no upload, no waiting. Paste your data and start working immediately.',
  },
  {
    icon: <Rocket className="w-7 h-7" />,
    step: '03',
    title: 'Get Results',
    description: 'Fast, private results processed entirely in your browser. Copy and go.',
  },
]

const comparisonCards = [
  {
    icon: <BellOff className="w-6 h-6" />,
    title: 'No Pop-ups',
    ours: 'Clean, distraction-free interface',
    theirs: 'Intrusive ads covering half the screen',
  },
  {
    icon: <KeyRound className="w-6 h-6" />,
    title: 'No Sign-up Walls',
    ours: 'Every tool works instantly, no account needed',
    theirs: '"Create a free account to continue"',
  },
  {
    icon: <MonitorSmartphone className="w-6 h-6" />,
    title: 'Your Data, Your Browser',
    ours: 'All processing happens locally on your device',
    theirs: 'Your data uploaded to unknown servers',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Clean, Fast Interface',
    ours: 'Minimal design, loads in under a second',
    theirs: 'Bloated pages with 10+ second load times',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0, 0, 0.2, 1] as const },
  }),
}

export default function Home() {
  return (
    <div className="relative">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        {/* Floating background icons */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {floatingIcons.map((fi, i) => (
            <motion.div
              key={i}
              className={`absolute ${fi.size} font-mono font-bold text-primary/10 dark:text-primary/15 select-none`}
              style={{ left: fi.x, top: fi.y }}
              animate={{
                y: [0, -12, 0],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: fi.delay,
                ease: 'easeInOut',
              }}
            >
              {fi.icon}
            </motion.div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8">
              <Zap className="w-3.5 h-3.5" />
              Free &amp; Open Source
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              <span className="text-text dark:text-text-dark">Developer Tools,</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
                Lightning Fast
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-text-muted dark:text-text-muted-dark max-w-2xl mx-auto leading-relaxed mb-10">
              Free, private, and built for speed. All tools run entirely in your browser &mdash; no data ever leaves your device.
            </p>

            {/* CTA */}
            <motion.a
              href="#tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Tools
              <ChevronDown className="w-4 h-4" />
            </motion.a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {trustBadges.map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl glass-card"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary">
                  {badge.icon}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-text dark:text-text-dark">{badge.label}</p>
                  <p className="text-xs text-text-muted dark:text-text-muted-dark">{badge.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS SECTION ===== */}
      <section className="max-w-5xl mx-auto px-4 pb-20 md:pb-28">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          custom={0}
          variants={fadeUp}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-text dark:text-text-dark mb-3">
            How It Works
          </h2>
          <p className="text-text-muted dark:text-text-muted-dark max-w-lg mx-auto">
            Three simple steps. No friction, no surprises.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-[2px]" aria-hidden="true">
            <div className="w-full h-full bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-full" />
            {/* Animated pulse along the line */}
            <motion.div
              className="absolute top-0 left-0 w-8 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
              animate={{ left: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Connector arrows (mobile) */}
          <div className="md:hidden flex flex-col items-center" aria-hidden="true">
            {/* Rendered inline between step cards below */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {howItWorksSteps.map((step, i) => (
              <div key={step.step} className="contents">
                <motion.div
                  className="relative text-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-30px' }}
                  custom={i}
                  variants={fadeUp}
                >
                  {/* Step circle */}
                  <div className="relative inline-flex items-center justify-center w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 text-primary mb-5 mx-auto">
                    {step.icon}
                    {/* Step number badge */}
                    <span className="absolute -top-2 -right-2 w-7 h-7 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold shadow-lg shadow-primary/30">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-text dark:text-text-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-muted dark:text-text-muted-dark leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>

                  {/* Mobile connector arrow */}
                  {i < howItWorksSteps.length - 1 && (
                    <div className="md:hidden flex justify-center my-4" aria-hidden="true">
                      <motion.div
                        className="text-primary/30"
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5 rotate-90" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOOLS GRID SECTION ===== */}
      <section id="tools" className="max-w-6xl mx-auto px-4 pb-20">
        {categories.map((cat, catIndex) => {
          const catTools = tools.filter(t => t.category === cat)
          return (
            <motion.div
              key={cat}
              id={cat}
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
                  {categoryIconMap[cat]}
                </div>
                <h2 className="text-2xl font-bold text-text dark:text-text-dark">
                  {categoryLabels[cat]}
                </h2>
              </div>

              {/* Tool Cards */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-30px' }}
              >
                {catTools.map(tool => (
                  <motion.div key={tool.slug} variants={item}>
                    <Link
                      href={`/tools/${tool.category}/${tool.slug}`}
                      className="group block h-full p-5 rounded-2xl glass-card hover:glow-sm transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 text-primary shrink-0 font-mono text-sm font-bold group-hover:scale-105 transition-transform">
                          {tool.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-text dark:text-text-dark group-hover:text-primary transition-colors leading-snug">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-text-muted dark:text-text-muted-dark mt-1.5 line-clamp-2 leading-relaxed">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )
        })}
      </section>

      {/* ===== WHY QUICKDEVTOOLS SECTION ===== */}
      <section className="max-w-6xl mx-auto px-4 pb-20 md:pb-28">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          custom={0}
          variants={fadeUp}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-sm font-medium mb-4">
            <Ban className="w-3.5 h-3.5" />
            No Compromises
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text dark:text-text-dark mb-3">
            Why QuickDevTools?
          </h2>
          <p className="text-text-muted dark:text-text-muted-dark max-w-lg mx-auto">
            We built the tool site we always wished existed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {comparisonCards.map((card, i) => (
            <motion.div
              key={card.title}
              className="relative p-6 rounded-2xl glass-card hover:glow-sm transition-all duration-300 overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              custom={i}
              variants={fadeUp}
            >
              {/* Subtle gradient accent on hover */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 text-primary shrink-0">
                  {card.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-text dark:text-text-dark mb-3">
                    {card.title}
                  </h3>

                  {/* Ours */}
                  <div className="flex items-start gap-2.5 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-text dark:text-text-dark font-medium leading-relaxed">
                      {card.ours}
                    </p>
                  </div>

                  {/* Theirs */}
                  <div className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-red-400/70 dark:text-red-500/50 shrink-0 mt-0.5" />
                    <p className="text-sm text-text-muted dark:text-text-muted-dark leading-relaxed line-through decoration-text-muted/30">
                      {card.theirs}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== PRIVACY SECTION ===== */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <motion.div
          className="relative overflow-hidden rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/15 to-primary/20 p-[1px]">
            <div className="absolute inset-[1px] rounded-2xl bg-surface dark:bg-surface-dark" />
          </div>

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-text dark:text-text-dark mb-4">
              Your Privacy is Our Priority
            </h2>
            <p className="text-text-muted dark:text-text-muted-dark max-w-xl mx-auto leading-relaxed mb-8">
              Every tool on QuickDevTools processes data entirely in your browser using JavaScript.
              No files are uploaded. No data leaves your device. It&apos;s fast, free, and 100% private.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <div className="flex items-center gap-2 text-sm text-text-muted dark:text-text-muted-dark">
                <Lock className="w-4 h-4 text-emerald-500" />
                <span>End-to-end client-side</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-muted dark:text-text-muted-dark">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>No server uploads</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-muted dark:text-text-muted-dark">
                <UserX className="w-4 h-4 text-emerald-500" />
                <span>No data collection</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
