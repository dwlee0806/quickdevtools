'use client'

import { motion } from 'framer-motion'
import {
  Shield,
  Zap,
  UserX,
  Lock,
  Globe,
  Code2,
  Server,
  Eye,
  Heart,
  Sparkles,
  MonitorSmartphone,
  Fingerprint,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0, 0, 0.2, 1] as const },
  }),
}

const stats = [
  { value: '15+', label: 'Developer Tools', icon: <Code2 className="w-5 h-5" /> },
  { value: '0', label: 'Data Uploaded', icon: <Server className="w-5 h-5" /> },
  { value: '100%', label: 'Free Forever', icon: <Globe className="w-5 h-5" /> },
  { value: '0', label: 'Accounts Required', icon: <UserX className="w-5 h-5" /> },
]

const principles = [
  {
    icon: <Fingerprint className="w-7 h-7" />,
    title: 'Your Data Stays Private',
    description:
      'Every single tool on QuickDevTools processes your data entirely within your browser using JavaScript. Your JSON payloads, encoded strings, color values, and image files never touch our servers. There is no backend processing, no temporary file storage, and no analytics on your input data. When you close the tab, your data is gone — exactly as it should be.',
  },
  {
    icon: <UserX className="w-7 h-7" />,
    title: 'No Sign-up Required',
    description:
      'We believe developer tools should be frictionless. You should not have to create an account, verify your email, or hand over personal information just to format a JSON string. Every tool is immediately accessible the moment you land on the page. No modals, no login walls, no "free tier" limitations.',
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: 'Lightning Fast',
    description:
      'Because all processing happens client-side, there are no server round-trips, no upload wait times, and no bandwidth constraints. Your data is processed at the speed of your own machine. A 10MB JSON file formats instantly. A Base64 decode completes in milliseconds. The result is an experience that feels native, not web-based.',
  },
]

const techStack = [
  { name: 'Next.js', role: 'Framework' },
  { name: 'TypeScript', role: 'Type Safety' },
  { name: 'Tailwind CSS', role: 'Styling' },
  { name: 'Framer Motion', role: 'Animations' },
]

export default function AboutPage() {
  return (
    <div className="relative">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16">
        {/* Decorative orbs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute top-40 right-[15%] w-56 h-56 bg-accent/10 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8">
              <Heart className="w-3.5 h-3.5" />
              Our Story
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
          >
            <span className="text-text dark:text-text-dark">Built for Developers,</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
              by Developers
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-text-muted dark:text-text-muted-dark max-w-2xl mx-auto leading-relaxed"
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
          >
            QuickDevTools is a free collection of essential developer utilities that respect your time, your privacy, and your workflow.
          </motion.p>
        </div>
      </section>

      {/* ===== MISSION STATEMENT ===== */}
      <section className="max-w-3xl mx-auto px-4 pb-16 md:pb-20">
        <motion.div
          className="space-y-5 text-base md:text-lg text-text-muted dark:text-text-muted-dark leading-relaxed"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.p custom={0} variants={fadeUp}>
            Every developer knows the frustration. You need to quickly format a JSON response, decode a Base64 string, or convert a color value &mdash; and you end up on a site buried in pop-up ads, cookie consent banners stacked three deep, and a sign-up wall before you can even paste your data. We built QuickDevTools because we were tired of it too.
          </motion.p>
          <motion.p custom={1} variants={fadeUp}>
            QuickDevTools started as a personal toolkit &mdash; a handful of utilities a developer built for daily use. The idea was simple: create tools that load instantly, work without an internet connection once cached, and never send a single byte of user data anywhere. No tracking pixels, no third-party analytics scripts harvesting your behavior, and absolutely no server-side processing of your inputs.
          </motion.p>
          <motion.p custom={2} variants={fadeUp}>
            Today, QuickDevTools offers over 15 carefully crafted tools spanning JSON formatting, encoding and decoding, color manipulation, text utilities, and data conversion. Each tool is built with the same philosophy: do one thing exceptionally well, keep the interface clean, and never compromise on privacy. We would rather have fewer features done right than a bloated kitchen-sink app that frustrates more than it helps.
          </motion.p>
        </motion.div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="max-w-5xl mx-auto px-4 pb-16 md:pb-24">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          custom={0}
          variants={fadeUp}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-text dark:text-text-dark mb-3">
            How It Works
          </h2>
          <p className="text-text-muted dark:text-text-muted-dark max-w-xl mx-auto">
            Our client-side processing philosophy means your data never leaves your device.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((principle, i) => (
            <motion.div
              key={principle.title}
              className="relative p-6 rounded-2xl glass-card hover:glow-sm transition-all duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              custom={i}
              variants={fadeUp}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0" />

              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 text-primary mb-5">
                {principle.icon}
              </div>
              <h3 className="text-lg font-bold text-text dark:text-text-dark mb-3">
                {principle.title}
              </h3>
              <p className="text-sm text-text-muted dark:text-text-muted-dark leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="max-w-5xl mx-auto px-4 pb-16 md:pb-24">
        <motion.div
          className="relative overflow-hidden rounded-2xl p-8 md:p-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
        >
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/15 to-primary/20 p-[1px]">
            <div className="absolute inset-[1px] rounded-2xl bg-surface dark:bg-surface-dark" />
          </div>

          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-text dark:text-text-dark text-center mb-10">
              QuickDevTools by the Numbers
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i + 1}
                  variants={fadeUp}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mx-auto mb-3">
                    {stat.icon}
                  </div>
                  <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-text-muted dark:text-text-muted-dark font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== TECHNOLOGY SECTION ===== */}
      <section className="max-w-4xl mx-auto px-4 pb-16 md:pb-24">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          custom={0}
          variants={fadeUp}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-text dark:text-text-dark mb-3">
            Built with Modern Technology
          </h2>
          <p className="text-text-muted dark:text-text-muted-dark max-w-xl mx-auto">
            We use a carefully selected stack to deliver the fastest, most reliable experience possible.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
        >
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              className="p-5 rounded-2xl glass-card text-center hover:glow-sm transition-all duration-300"
              custom={i}
              variants={fadeUp}
            >
              <p className="text-lg font-bold text-text dark:text-text-dark mb-1">
                {tech.name}
              </p>
              <p className="text-xs text-text-muted dark:text-text-muted-dark font-medium uppercase tracking-wider">
                {tech.role}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-sm text-text-muted dark:text-text-muted-dark text-center mt-8 max-w-2xl mx-auto leading-relaxed"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
        >
          Every tool is a standalone React component rendered with Next.js for optimal performance and SEO.
          TypeScript ensures type safety across the entire codebase, while Tailwind CSS and Framer Motion
          deliver a polished, responsive interface with smooth animations. The entire application is deployed
          on a global edge network for sub-100ms load times worldwide.
        </motion.p>
      </section>

      {/* ===== CREATOR / TEAM SECTION ===== */}
      <section className="max-w-4xl mx-auto px-4 pb-16 md:pb-24">
        <motion.div
          className="relative overflow-hidden rounded-2xl p-8 md:p-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
        >
          {/* Background texture */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px]" />
            <div className="absolute top-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-[60px]" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
            {/* Avatar placeholder */}
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent text-white">
                <Sparkles className="w-9 h-9" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-text dark:text-text-dark">
                The Story Behind QuickDevTools
              </h2>
              <div className="space-y-3 text-text-muted dark:text-text-muted-dark leading-relaxed">
                <p>
                  QuickDevTools was built by a developer who got tired of slow, ad-bloated tool sites that treated users as products rather than people. Every time you needed a simple utility &mdash; decode a JWT, generate a UUID, or convert a CSV &mdash; you were greeted with intrusive ads, mandatory account creation, and tools that uploaded your potentially sensitive data to unknown servers.
                </p>
                <p>
                  The mission was clear: build a suite of essential developer tools that are genuinely free, genuinely private, and genuinely fast. No venture capital funding chasing growth metrics. No freemium upsells. No dark patterns. Just clean, reliable tools that respect both your time and your data.
                </p>
                <p>
                  Every design decision at QuickDevTools prioritizes the user experience. The interface is deliberately minimal &mdash; not because we cut corners, but because we believe the best tool is one that gets out of your way. You came here to format JSON, not to navigate a labyrinth of menus and popups. We intend to keep it that way.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== PRIVACY COMMITMENT ===== */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <motion.div
          className="relative overflow-hidden rounded-2xl p-8 md:p-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/15 to-primary/20 p-[1px]">
            <div className="absolute inset-[1px] rounded-2xl bg-surface dark:bg-surface-dark" />
          </div>

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-text dark:text-text-dark mb-4">
              Our Privacy Promise
            </h2>
            <p className="text-text-muted dark:text-text-muted-dark max-w-xl mx-auto leading-relaxed mb-8">
              We do not collect, store, or transmit any data you input into our tools. There are no user accounts,
              no usage analytics on tool inputs, and no server-side processing. Your browser does all the work,
              and your data stays on your device. Period.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <div className="flex items-center gap-2 text-sm text-text-muted dark:text-text-muted-dark">
                <Lock className="w-4 h-4 text-emerald-500" />
                <span>End-to-end client-side processing</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-muted dark:text-text-muted-dark">
                <Eye className="w-4 h-4 text-emerald-500" />
                <span>Zero data collection on inputs</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-muted dark:text-text-muted-dark">
                <MonitorSmartphone className="w-4 h-4 text-emerald-500" />
                <span>Works offline once cached</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
