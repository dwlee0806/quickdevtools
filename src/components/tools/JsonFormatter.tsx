'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Braces, Minimize2, CheckCircle, Copy, Trash2, FileJson, ChevronRight, ChevronDown, Hash, Type } from 'lucide-react'
import CopyButton from '@/components/ui/CopyButton'

type TabSize = 2 | 4
type ViewMode = 'formatted' | 'tree'

interface TreeNodeProps {
  keyName: string | null
  value: unknown
  depth: number
  isLast: boolean
}

function getValueColor(value: unknown): string {
  if (value === null) return 'text-text-muted dark:text-text-muted-dark'
  if (typeof value === 'string') return 'text-green-600 dark:text-green-400'
  if (typeof value === 'number') return 'text-accent'
  if (typeof value === 'boolean') return 'text-warm'
  return 'text-text dark:text-text-dark'
}

function TreeNode({ keyName, value, depth, isLast }: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(depth < 2)
  const isExpandable = value !== null && typeof value === 'object'
  const entries = isExpandable
    ? Array.isArray(value)
      ? value.map((v, i) => [String(i), v] as [string, unknown])
      : Object.entries(value as Record<string, unknown>)
    : []

  const toggle = () => {
    if (isExpandable) setIsOpen((prev) => !prev)
  }

  const renderValue = () => {
    if (value === null) return <span className="text-text-muted dark:text-text-muted-dark italic">null</span>
    if (typeof value === 'string') return <span className="text-green-600 dark:text-green-400">&quot;{value}&quot;</span>
    if (typeof value === 'number') return <span className="text-accent">{String(value)}</span>
    if (typeof value === 'boolean') return <span className="text-warm">{String(value)}</span>
    return null
  }

  return (
    <div style={{ paddingLeft: depth > 0 ? 16 : 0 }}>
      <div
        className={`flex items-start gap-1 py-0.5 ${isExpandable ? 'cursor-pointer hover:bg-primary/5 rounded' : ''}`}
        onClick={toggle}
      >
        {isExpandable ? (
          <span className="text-text-muted dark:text-text-muted-dark mt-0.5 shrink-0">
            {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </span>
        ) : (
          <span className="w-3.5 shrink-0" />
        )}
        <span className="font-mono text-sm leading-relaxed">
          {keyName !== null && (
            <>
              <span className="text-primary font-medium">&quot;{keyName}&quot;</span>
              <span className="text-text-muted dark:text-text-muted-dark">: </span>
            </>
          )}
          {isExpandable ? (
            <>
              <span className="text-text-muted dark:text-text-muted-dark">
                {Array.isArray(value) ? '[' : '{'}
              </span>
              {!isOpen && (
                <span className="text-text-muted/60 dark:text-text-muted-dark/60 text-xs ml-1">
                  {entries.length} {entries.length === 1 ? 'item' : 'items'}
                  <span className="ml-1">{Array.isArray(value) ? ']' : '}'}</span>
                </span>
              )}
            </>
          ) : (
            <>
              {renderValue()}
              {!isLast && <span className="text-text-muted dark:text-text-muted-dark">,</span>}
            </>
          )}
        </span>
      </div>
      {isExpandable && isOpen && (
        <div>
          {entries.map(([k, v], i) => (
            <TreeNode
              key={k}
              keyName={Array.isArray(value) ? null : k}
              value={v}
              depth={depth + 1}
              isLast={i === entries.length - 1}
            />
          ))}
          <div style={{ paddingLeft: 16 }}>
            <span className="font-mono text-sm text-text-muted dark:text-text-muted-dark">
              {Array.isArray(value) ? ']' : '}'}
              {!isLast && ','}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

function SyntaxHighlightedJson({ json }: { json: string }) {
  const lines = json.split('\n')

  const highlightLine = (line: string) => {
    const parts: React.ReactNode[] = []
    let remaining = line
    let partIdx = 0

    while (remaining.length > 0) {
      // Match key: "key":
      const keyMatch = remaining.match(/^(\s*)"([^"]+)"(:)/)
      if (keyMatch) {
        parts.push(<span key={partIdx++}>{keyMatch[1]}</span>)
        parts.push(<span key={partIdx++} className="text-primary font-medium">&quot;{keyMatch[2]}&quot;</span>)
        parts.push(<span key={partIdx++} className="text-text-muted dark:text-text-muted-dark">{keyMatch[3]}</span>)
        remaining = remaining.slice(keyMatch[0].length)
        continue
      }

      // Match string value: "..."
      const strMatch = remaining.match(/^(\s*)"((?:[^"\\]|\\.)*)"(,?)/)
      if (strMatch) {
        parts.push(<span key={partIdx++}>{strMatch[1]}</span>)
        parts.push(<span key={partIdx++} className="text-green-600 dark:text-green-400">&quot;{strMatch[2]}&quot;</span>)
        if (strMatch[3]) parts.push(<span key={partIdx++} className="text-text-muted dark:text-text-muted-dark">{strMatch[3]}</span>)
        remaining = remaining.slice(strMatch[0].length)
        continue
      }

      // Match number
      const numMatch = remaining.match(/^(\s*)(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)(,?)/)
      if (numMatch) {
        parts.push(<span key={partIdx++}>{numMatch[1]}</span>)
        parts.push(<span key={partIdx++} className="text-accent">{numMatch[2]}</span>)
        if (numMatch[3]) parts.push(<span key={partIdx++} className="text-text-muted dark:text-text-muted-dark">{numMatch[3]}</span>)
        remaining = remaining.slice(numMatch[0].length)
        continue
      }

      // Match boolean/null
      const boolMatch = remaining.match(/^(\s*)(true|false|null)(,?)/)
      if (boolMatch) {
        parts.push(<span key={partIdx++}>{boolMatch[1]}</span>)
        parts.push(
          <span key={partIdx++} className={boolMatch[2] === 'null' ? 'text-text-muted dark:text-text-muted-dark italic' : 'text-warm'}>
            {boolMatch[2]}
          </span>
        )
        if (boolMatch[3]) parts.push(<span key={partIdx++} className="text-text-muted dark:text-text-muted-dark">{boolMatch[3]}</span>)
        remaining = remaining.slice(boolMatch[0].length)
        continue
      }

      // Brackets/braces
      const bracketMatch = remaining.match(/^(\s*)([\[\]{}])(,?)/)
      if (bracketMatch) {
        parts.push(<span key={partIdx++}>{bracketMatch[1]}</span>)
        parts.push(<span key={partIdx++} className="text-text-muted dark:text-text-muted-dark">{bracketMatch[2]}</span>)
        if (bracketMatch[3]) parts.push(<span key={partIdx++} className="text-text-muted dark:text-text-muted-dark">{bracketMatch[3]}</span>)
        remaining = remaining.slice(bracketMatch[0].length)
        continue
      }

      // Fallback - consume one char
      parts.push(<span key={partIdx++}>{remaining[0]}</span>)
      remaining = remaining.slice(1)
    }

    return parts
  }

  return (
    <div className="font-mono text-sm leading-relaxed">
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span className="select-none text-text-muted/40 dark:text-text-muted-dark/40 w-10 text-right pr-3 shrink-0">
            {i + 1}
          </span>
          <span className="text-text dark:text-text-dark whitespace-pre">{highlightLine(line)}</span>
        </div>
      ))}
    </div>
  )
}

function extractErrorPosition(errorMsg: string): number | null {
  const posMatch = errorMsg.match(/position\s+(\d+)/i)
  if (posMatch) return parseInt(posMatch[1], 10)
  const colMatch = errorMsg.match(/column\s+(\d+)/i)
  if (colMatch) return parseInt(colMatch[1], 10)
  return null
}

function getErrorLineNumber(input: string, position: number): number {
  const upToPosition = input.slice(0, position)
  return upToPosition.split('\n').length
}

const SAMPLE_JSON = `{
  "name": "John Doe",
  "age": 30,
  "isActive": true,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "US"
  },
  "hobbies": ["reading", "coding", "hiking"],
  "scores": [95, 87, 92],
  "metadata": null
}`

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [tabSize, setTabSize] = useState<TabSize>(2)
  const [viewMode, setViewMode] = useState<ViewMode>('formatted')
  const [parsedData, setParsedData] = useState<unknown>(null)

  const stats = useMemo(() => {
    const text = output || input
    if (!text) return null
    return {
      chars: text.length,
      lines: text.split('\n').length,
    }
  }, [input, output])

  const errorLine = useMemo(() => {
    if (!error || !input) return null
    const pos = extractErrorPosition(error)
    if (pos === null) return null
    return getErrorLineNumber(input, pos)
  }, [error, input])

  const handleFormat = useCallback(() => {
    setError('')
    if (!input.trim()) {
      setOutput('')
      setParsedData(null)
      return
    }
    try {
      const parsed = JSON.parse(input)
      setParsedData(parsed)
      setOutput(JSON.stringify(parsed, null, tabSize))
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Invalid JSON'
      setError(message)
      setOutput('')
      setParsedData(null)
    }
  }, [input, tabSize])

  const handleMinify = useCallback(() => {
    setError('')
    if (!input.trim()) {
      setOutput('')
      setParsedData(null)
      return
    }
    try {
      const parsed = JSON.parse(input)
      setParsedData(parsed)
      setOutput(JSON.stringify(parsed))
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Invalid JSON'
      setError(message)
      setOutput('')
      setParsedData(null)
    }
  }, [input])

  const handleValidate = useCallback(() => {
    setError('')
    if (!input.trim()) {
      setOutput('')
      setParsedData(null)
      return
    }
    try {
      const parsed = JSON.parse(input)
      setParsedData(parsed)
      setOutput('Valid JSON')
      setError('')
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Invalid JSON'
      setError(message)
      setOutput('')
      setParsedData(null)
    }
  }, [input])

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError('')
    setParsedData(null)
  }

  const handleSample = () => {
    setInput(SAMPLE_JSON)
    setError('')
    setOutput('')
    setParsedData(null)
  }

  return (
    <div className="space-y-5">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          onClick={handleFormat}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
        >
          <Braces className="w-4 h-4" />
          Format
        </button>
        <button
          onClick={handleMinify}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
        >
          <Minimize2 className="w-4 h-4" />
          Minify
        </button>
        <button
          onClick={handleValidate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
        >
          <CheckCircle className="w-4 h-4" />
          Validate
        </button>
        <button
          onClick={handleSample}
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-border dark:border-border-dark text-text-muted dark:text-text-muted-dark rounded-xl font-medium text-sm hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark transition-all active:scale-[0.98]"
        >
          <FileJson className="w-4 h-4" />
          Sample
        </button>
        <button
          onClick={handleClear}
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-border dark:border-border-dark text-text-muted dark:text-text-muted-dark rounded-xl font-medium text-sm hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark transition-all active:scale-[0.98]"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>

        {/* Tab Size Toggle */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm text-text-muted dark:text-text-muted-dark">Tab:</span>
          <div className="relative flex bg-surface-secondary dark:bg-surface-secondary-dark rounded-lg p-0.5 border border-border dark:border-border-dark">
            <motion.div
              className="absolute top-0.5 bottom-0.5 bg-primary rounded-md"
              initial={false}
              animate={{ x: tabSize === 2 ? 0 : '100%', width: '50%' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
            {([2, 4] as TabSize[]).map((size) => (
              <button
                key={size}
                onClick={() => setTabSize(size)}
                className={`relative z-10 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  tabSize === size ? 'text-white' : 'text-text-muted dark:text-text-muted-dark'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm font-medium text-text dark:text-text-dark">
            Input JSON
          </label>
          {stats && (
            <div className="flex items-center gap-3 text-xs text-text-muted dark:text-text-muted-dark">
              <span className="inline-flex items-center gap-1">
                <Type className="w-3 h-3" />
                {stats.chars.toLocaleString()} chars
              </span>
              <span className="inline-flex items-center gap-1">
                <Hash className="w-3 h-3" />
                {stats.lines} lines
              </span>
            </div>
          )}
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Paste your JSON here, e.g. {"name": "John", "age": 30}'
          className="tool-textarea custom-scrollbar w-full h-48 rounded-xl border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-3 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-text-muted/50 dark:placeholder:text-text-muted-dark/50 transition-shadow"
          spellCheck={false}
        />
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4"
          >
            <p className="text-sm text-red-700 dark:text-red-400 font-mono break-all">
              {error}
            </p>
            {errorLine && (
              <p className="text-xs text-red-500 dark:text-red-400/70 mt-1.5">
                Error near line {errorLine}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Output */}
      <AnimatePresence mode="wait">
        {output && (
          <motion.div
            key={output.slice(0, 20) + viewMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-text dark:text-text-dark">
                  Output
                </label>
                {/* View Mode Toggle */}
                {parsedData !== null && output !== 'Valid JSON' && (
                  <div className="relative flex bg-surface-secondary dark:bg-surface-secondary-dark rounded-lg p-0.5 border border-border dark:border-border-dark">
                    <motion.div
                      className="absolute top-0.5 bottom-0.5 bg-primary rounded-md"
                      initial={false}
                      animate={{ x: viewMode === 'formatted' ? 0 : '100%', width: '50%' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                    {([
                      { key: 'formatted' as ViewMode, label: 'Formatted' },
                      { key: 'tree' as ViewMode, label: 'Tree' },
                    ]).map(({ key, label }) => (
                      <button
                        key={key}
                        onClick={() => setViewMode(key)}
                        className={`relative z-10 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                          viewMode === key ? 'text-white' : 'text-text-muted dark:text-text-muted-dark'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <CopyButton text={output} />
            </div>

            {output === 'Valid JSON' ? (
              <div className="glass-card rounded-xl p-6 text-center">
                <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Valid JSON
                </p>
              </div>
            ) : viewMode === 'tree' && parsedData !== null ? (
              <div className="rounded-xl border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark p-4 max-h-96 overflow-auto custom-scrollbar">
                <TreeNode keyName={null} value={parsedData} depth={0} isLast={true} />
              </div>
            ) : (
              <div className="rounded-xl border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark p-4 max-h-96 overflow-auto custom-scrollbar">
                <SyntaxHighlightedJson json={output} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
