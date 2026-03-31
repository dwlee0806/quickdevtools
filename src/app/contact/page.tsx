'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, MessageSquare, Bug, Lightbulb, CheckCircle } from 'lucide-react'

const categories = [
  { value: 'feedback', label: 'General Feedback', icon: MessageSquare },
  { value: 'bug', label: 'Bug Report', icon: Bug },
  { value: 'feature', label: 'Feature Request', icon: Lightbulb },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', category: 'feedback', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`[QuickDevTools] ${form.category}: ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nCategory: ${form.category}\n\n${form.message}`)
    window.location.href = `mailto:quickdevtools.contact@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-text dark:text-text-dark mb-3">Contact Us</h1>
        <p className="text-text-muted dark:text-text-muted-dark mb-8">
          Have a question, found a bug, or want to request a new tool?
          We&apos;d love to hear from you.
        </p>

        {/* Direct email */}
        <div className="glass-card rounded-2xl p-5 mb-8 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-text dark:text-text-dark">Email us directly</p>
            <a
              href="mailto:quickdevtools.contact@gmail.com"
              className="text-primary hover:underline text-sm"
            >
              quickdevtools.contact@gmail.com
            </a>
          </div>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-8 text-center"
          >
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-text dark:text-text-dark mb-2">
              Thank you for reaching out!
            </h2>
            <p className="text-text-muted dark:text-text-muted-dark">
              Your email client should have opened with the message. If it didn&apos;t,
              please email us directly at{' '}
              <a href="mailto:quickdevtools.contact@gmail.com" className="text-primary hover:underline">
                quickdevtools.contact@gmail.com
              </a>
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: '', email: '', category: 'feedback', message: '' }) }}
              className="mt-4 px-4 py-2 text-sm text-primary hover:bg-primary/10 rounded-xl transition-colors"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text dark:text-text-dark mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-secondary-dark text-text dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text dark:text-text-dark mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-secondary-dark text-text dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text dark:text-text-dark mb-1.5">
                Category
              </label>
              <div className="flex gap-2">
                {categories.map(cat => {
                  const Icon = cat.icon
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setForm({ ...form, category: cat.value })}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        form.category === cat.value
                          ? 'bg-primary text-white shadow-md shadow-primary/25'
                          : 'border border-border dark:border-border-dark text-text-muted dark:text-text-muted-dark hover:border-primary/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {cat.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text dark:text-text-dark mb-1.5">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-secondary-dark text-text dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
                placeholder="Describe your feedback, bug, or idea..."
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        )}
      </motion.div>
    </div>
  )
}
