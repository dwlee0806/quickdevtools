'use client'

import { useState } from 'react'
import CopyButton from '@/components/ui/CopyButton'

export default function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleEncode = () => {
    setError('')
    if (!input) {
      setOutput('')
      return
    }
    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(input)
      const binary = Array.from(data)
        .map((byte) => String.fromCharCode(byte))
        .join('')
      setOutput(btoa(binary))
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Encoding failed'
      setError(message)
      setOutput('')
    }
  }

  const handleDecode = () => {
    setError('')
    if (!input) {
      setOutput('')
      return
    }
    try {
      const binary = atob(input.trim())
      const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
      const decoder = new TextDecoder('utf-8', { fatal: true })
      setOutput(decoder.decode(bytes))
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Decoding failed'
      setError(`Invalid Base64 input: ${message}`)
      setOutput('')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleEncode}
          className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark transition-colors font-medium text-sm"
        >
          Encode
        </button>
        <button
          onClick={handleDecode}
          className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark transition-colors font-medium text-sm"
        >
          Decode
        </button>
        <button
          onClick={handleClear}
          className="border border-border dark:border-border-dark text-text-muted dark:text-text-muted-dark rounded-lg px-4 py-2 hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark transition-colors font-medium text-sm"
        >
          Clear
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-text dark:text-text-dark mb-1.5">
          Input
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to encode, or Base64 string to decode"
          className="tool-textarea custom-scrollbar w-full h-48 rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-3 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-text-muted/50 dark:placeholder:text-text-muted-dark/50"
          spellCheck={false}
        />
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
          <p className="text-sm text-red-700 dark:text-red-400 font-mono break-all">
            {error}
          </p>
        </div>
      )}

      {output && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text dark:text-text-dark">
              Output
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
