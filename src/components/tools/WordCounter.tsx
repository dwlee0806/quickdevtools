'use client'

import { useState, useMemo } from 'react'

export default function WordCounter() {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
    const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
    const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
    const readingTimeMin = words / 200
    const speakingTimeMin = words / 130

    const formatTime = (minutes: number): string => {
      if (minutes < 1) {
        const seconds = Math.ceil(minutes * 60)
        return seconds === 0 ? '0 sec' : `${seconds} sec`
      }
      const mins = Math.floor(minutes)
      const secs = Math.round((minutes - mins) * 60)
      if (secs === 0) return `${mins} min`
      return `${mins} min ${secs} sec`
    }

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime: formatTime(readingTimeMin),
      speakingTime: formatTime(speakingTimeMin),
    }
  }, [text])

  const statItems = [
    { label: 'Characters', value: stats.characters.toLocaleString() },
    { label: 'Characters (no spaces)', value: stats.charactersNoSpaces.toLocaleString() },
    { label: 'Words', value: stats.words.toLocaleString() },
    { label: 'Sentences', value: stats.sentences.toLocaleString() },
    { label: 'Paragraphs', value: stats.paragraphs.toLocaleString() },
    { label: 'Reading Time', value: stats.readingTime },
    { label: 'Speaking Time', value: stats.speakingTime },
  ]

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark p-3 text-center"
          >
            <p className="text-xl font-bold text-text dark:text-text-dark">{item.value}</p>
            <p className="text-xs text-text-muted dark:text-text-muted-dark mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Textarea */}
      <div>
        <label className="block text-sm font-medium text-text dark:text-text-dark mb-1.5">
          Enter your text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="tool-textarea custom-scrollbar w-full h-64 rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-3 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-text-muted/50 dark:placeholder:text-text-muted-dark/50"
          spellCheck={false}
        />
      </div>
    </div>
  )
}
