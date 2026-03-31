'use client'

import { useState, useCallback } from 'react'
import CopyButton from '@/components/ui/CopyButton'

type BulkCount = 1 | 5 | 10 | 25 | 50

function generateUuidV4(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join('-')
}

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([])
  const [bulkCount, setBulkCount] = useState<BulkCount>(1)

  const handleGenerate = useCallback(() => {
    const newUuids = Array.from({ length: bulkCount }, () => generateUuidV4())
    setUuids(newUuids)
  }, [bulkCount])

  const handleClear = () => {
    setUuids([])
  }

  const allUuidsText = uuids.join('\n')

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleGenerate}
          className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark transition-colors font-medium text-sm"
        >
          Generate
        </button>
        <button
          onClick={handleClear}
          className="border border-border dark:border-border-dark text-text-muted dark:text-text-muted-dark rounded-lg px-4 py-2 hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark transition-colors font-medium text-sm"
        >
          Clear
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm text-text-muted dark:text-text-muted-dark">Count:</span>
          <select
            value={bulkCount}
            onChange={(e) => setBulkCount(Number(e.target.value) as BulkCount)}
            className="rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark px-2 py-1.5 text-sm"
          >
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 px-3 py-2">
        <p className="text-xs text-blue-700 dark:text-blue-400">
          Generates cryptographically random UUID v4 values using the Web Crypto API (crypto.randomUUID or crypto.getRandomValues).
        </p>
      </div>

      {uuids.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text dark:text-text-dark">
              Generated UUID{uuids.length > 1 ? 's' : ''} ({uuids.length})
            </label>
            {uuids.length > 1 && <CopyButton text={allUuidsText} label="Copy All" />}
          </div>
          <div className="space-y-2">
            {uuids.map((uuid, index) => (
              <div
                key={`${uuid}-${index}`}
                className="flex items-center gap-2 rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark p-3"
              >
                <code className="flex-1 font-mono text-sm text-text dark:text-text-dark break-all select-all">
                  {uuid}
                </code>
                <CopyButton text={uuid} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
