'use client'

import { useState, useCallback } from 'react'
import CopyButton from '@/components/ui/CopyButton'

type Delimiter = ',' | '\t' | ';'

function csvToJson(csv: string, delimiter: string): string {
  const lines = csv.split('\n').filter((line) => line.trim() !== '')
  if (lines.length === 0) return '[]'

  const headers = parseCsvLine(lines[0], delimiter)
  const result = lines.slice(1).map((line) => {
    const values = parseCsvLine(line, delimiter)
    const obj: Record<string, string> = {}
    headers.forEach((header, i) => {
      obj[header.trim()] = (values[i] || '').trim()
    })
    return obj
  })

  return JSON.stringify(result, null, 2)
}

function parseCsvLine(line: string, delimiter: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        current += char
      }
    } else {
      if (char === '"') {
        inQuotes = true
      } else if (char === delimiter) {
        result.push(current)
        current = ''
      } else {
        current += char
      }
    }
  }
  result.push(current)
  return result
}

function jsonToCsv(json: string, delimiter: string): string {
  const data = JSON.parse(json)
  if (!Array.isArray(data) || data.length === 0) return ''

  const headers = Object.keys(data[0])
  const escapeField = (field: string): string => {
    const str = String(field ?? '')
    if (str.includes(delimiter) || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`
    }
    return str
  }

  const headerRow = headers.map(escapeField).join(delimiter)
  const rows = data.map((row: Record<string, unknown>) =>
    headers.map((h) => escapeField(String(row[h] ?? ''))).join(delimiter)
  )

  return [headerRow, ...rows].join('\n')
}

const delimiterOptions: { value: Delimiter; label: string }[] = [
  { value: ',', label: 'Comma (,)' },
  { value: '\t', label: 'Tab' },
  { value: ';', label: 'Semicolon (;)' },
]

export default function CsvJsonConverter() {
  const [csvInput, setCsvInput] = useState('')
  const [jsonInput, setJsonInput] = useState('')
  const [delimiter, setDelimiter] = useState<Delimiter>(',')
  const [error, setError] = useState('')

  const handleCsvToJson = useCallback(() => {
    setError('')
    if (!csvInput.trim()) {
      setJsonInput('')
      return
    }
    try {
      const result = csvToJson(csvInput, delimiter)
      setJsonInput(result)
    } catch (e) {
      const message = e instanceof Error ? e.message : 'CSV parsing failed'
      setError(message)
    }
  }, [csvInput, delimiter])

  const handleJsonToCsv = useCallback(() => {
    setError('')
    if (!jsonInput.trim()) {
      setCsvInput('')
      return
    }
    try {
      const result = jsonToCsv(jsonInput, delimiter)
      setCsvInput(result)
    } catch (e) {
      const message = e instanceof Error ? e.message : 'JSON parsing failed'
      setError(message)
    }
  }, [jsonInput, delimiter])

  return (
    <div className="space-y-4">
      {/* Delimiter Selector */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-text dark:text-text-dark">Delimiter:</label>
        <div className="flex gap-2">
          {delimiterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setDelimiter(opt.value)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                delimiter === opt.value
                  ? 'bg-primary/10 text-primary'
                  : 'border border-border dark:border-border-dark text-text-muted dark:text-text-muted-dark hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conversion Buttons (centered) */}
      <div className="flex justify-center gap-3">
        <button
          onClick={handleCsvToJson}
          className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark transition-colors font-medium text-sm"
        >
          CSV → JSON
        </button>
        <button
          onClick={handleJsonToCsv}
          className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark transition-colors font-medium text-sm"
        >
          JSON → CSV
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
          <p className="text-sm text-red-700 dark:text-red-400 font-mono break-all">{error}</p>
        </div>
      )}

      {/* Side-by-side textareas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CSV */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text dark:text-text-dark">CSV</label>
            {csvInput && <CopyButton text={csvInput} />}
          </div>
          <textarea
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            placeholder="name,age,email&#10;John,30,john@example.com&#10;Jane,25,jane@example.com"
            className="tool-textarea custom-scrollbar w-full h-64 rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-3 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-text-muted/50 dark:placeholder:text-text-muted-dark/50"
            spellCheck={false}
          />
        </div>

        {/* JSON */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text dark:text-text-dark">JSON</label>
            {jsonInput && <CopyButton text={jsonInput} />}
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='[&#10;  { "name": "John", "age": "30" },&#10;  { "name": "Jane", "age": "25" }&#10;]'
            className="tool-textarea custom-scrollbar w-full h-64 rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-3 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-text-muted/50 dark:placeholder:text-text-muted-dark/50"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  )
}
