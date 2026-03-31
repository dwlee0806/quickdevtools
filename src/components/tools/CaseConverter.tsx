'use client'

import { useState, useCallback } from 'react'
import CopyButton from '@/components/ui/CopyButton'

type CaseType =
  | 'upper'
  | 'lower'
  | 'title'
  | 'sentence'
  | 'camel'
  | 'pascal'
  | 'snake'
  | 'kebab'
  | 'constant'

function toWords(text: string): string[] {
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_\-]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

function toUpperCase(text: string): string {
  return text.toUpperCase()
}

function toLowerCase(text: string): string {
  return text.toLowerCase()
}

function toTitleCase(text: string): string {
  return text.replace(/\w\S*/g, (word) =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  )
}

function toSentenceCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/(^\s*|[.!?]\s+)(\w)/g, (match, sep, char) => sep + char.toUpperCase())
}

function toCamelCase(text: string): string {
  const words = toWords(text)
  if (words.length === 0) return ''
  return words
    .map((w, i) => {
      const lower = w.toLowerCase()
      return i === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1)
    })
    .join('')
}

function toPascalCase(text: string): string {
  const words = toWords(text)
  return words
    .map((w) => {
      const lower = w.toLowerCase()
      return lower.charAt(0).toUpperCase() + lower.slice(1)
    })
    .join('')
}

function toSnakeCase(text: string): string {
  return toWords(text).map((w) => w.toLowerCase()).join('_')
}

function toKebabCase(text: string): string {
  return toWords(text).map((w) => w.toLowerCase()).join('-')
}

function toConstantCase(text: string): string {
  return toWords(text).map((w) => w.toUpperCase()).join('_')
}

const converters: Record<CaseType, (text: string) => string> = {
  upper: toUpperCase,
  lower: toLowerCase,
  title: toTitleCase,
  sentence: toSentenceCase,
  camel: toCamelCase,
  pascal: toPascalCase,
  snake: toSnakeCase,
  kebab: toKebabCase,
  constant: toConstantCase,
}

const caseButtons: { type: CaseType; label: string }[] = [
  { type: 'upper', label: 'UPPERCASE' },
  { type: 'lower', label: 'lowercase' },
  { type: 'title', label: 'Title Case' },
  { type: 'sentence', label: 'Sentence case' },
  { type: 'camel', label: 'camelCase' },
  { type: 'pascal', label: 'PascalCase' },
  { type: 'snake', label: 'snake_case' },
  { type: 'kebab', label: 'kebab-case' },
  { type: 'constant', label: 'CONSTANT_CASE' },
]

export default function CaseConverter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [activeCase, setActiveCase] = useState<CaseType | null>(null)

  const handleConvert = useCallback(
    (caseType: CaseType) => {
      if (!input.trim()) {
        setOutput('')
        setActiveCase(null)
        return
      }
      setActiveCase(caseType)
      setOutput(converters[caseType](input))
    },
    [input]
  )

  const charCount = input.length

  return (
    <div className="space-y-4">
      {/* Input */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm font-medium text-text dark:text-text-dark">Input</label>
          <span className="text-xs text-text-muted dark:text-text-muted-dark">
            {charCount.toLocaleString()} characters
          </span>
        </div>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            if (activeCase) {
              setOutput(converters[activeCase](e.target.value))
            }
          }}
          placeholder="Enter text to convert..."
          className="tool-textarea custom-scrollbar w-full h-48 rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-3 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-text-muted/50 dark:placeholder:text-text-muted-dark/50"
          spellCheck={false}
        />
      </div>

      {/* Case Buttons */}
      <div className="flex flex-wrap gap-2">
        {caseButtons.map((btn) => (
          <button
            key={btn.type}
            onClick={() => handleConvert(btn.type)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              activeCase === btn.type
                ? 'bg-primary text-white'
                : 'border border-border dark:border-border-dark text-text-muted dark:text-text-muted-dark hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark hover:text-text dark:hover:text-text-dark'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Output */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text dark:text-text-dark">
              Output
              {activeCase && (
                <span className="ml-2 text-xs text-text-muted dark:text-text-muted-dark font-normal">
                  ({caseButtons.find((b) => b.type === activeCase)?.label})
                </span>
              )}
            </label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            className="tool-textarea custom-scrollbar w-full h-48 rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-3 font-mono text-sm resize-y focus:outline-none"
          />
        </div>
      )}
    </div>
  )
}
