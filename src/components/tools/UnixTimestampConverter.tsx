'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import CopyButton from '@/components/ui/CopyButton'

function getRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const absDiff = Math.abs(diffMs)
  const isFuture = diffMs < 0

  const seconds = Math.floor(absDiff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  let relative = ''
  if (seconds < 60) {
    relative = `${seconds} second${seconds !== 1 ? 's' : ''}`
  } else if (minutes < 60) {
    relative = `${minutes} minute${minutes !== 1 ? 's' : ''}`
  } else if (hours < 24) {
    relative = `${hours} hour${hours !== 1 ? 's' : ''}`
  } else if (days < 30) {
    relative = `${days} day${days !== 1 ? 's' : ''}`
  } else if (months < 12) {
    relative = `${months} month${months !== 1 ? 's' : ''}`
  } else {
    relative = `${years} year${years !== 1 ? 's' : ''}`
  }

  return isFuture ? `in ${relative}` : `${relative} ago`
}

function formatLocalTime(date: Date): string {
  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
}

function formatUTC(date: Date): string {
  return date.toUTCString()
}

function formatISO(date: Date): string {
  return date.toISOString()
}

export default function UnixTimestampConverter() {
  const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000))
  const [timestampInput, setTimestampInput] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [timestampResult, setTimestampResult] = useState<Date | null>(null)
  const [dateTimestampResult, setDateTimestampResult] = useState<number | null>(null)
  const [timestampError, setTimestampError] = useState('')
  const [dateError, setDateError] = useState('')
  const [inputMode, setInputMode] = useState<'seconds' | 'milliseconds'>('seconds')

  // Live updating current timestamp
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleTimestampToDate = useCallback(() => {
    setTimestampError('')
    setTimestampResult(null)
    const value = timestampInput.trim()
    if (!value) return

    const num = Number(value)
    if (isNaN(num)) {
      setTimestampError('Please enter a valid number')
      return
    }

    // Auto-detect: if > 10^12, treat as milliseconds; otherwise seconds
    const ms = inputMode === 'milliseconds' ? num : num * 1000
    const date = new Date(ms)

    if (isNaN(date.getTime())) {
      setTimestampError('Invalid timestamp')
      return
    }

    setTimestampResult(date)
  }, [timestampInput, inputMode])

  const handleDateToTimestamp = useCallback(() => {
    setDateError('')
    setDateTimestampResult(null)
    const value = dateInput.trim()
    if (!value) return

    const date = new Date(value)
    if (isNaN(date.getTime())) {
      setDateError('Invalid date format. Try: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS')
      return
    }

    const ts = inputMode === 'milliseconds'
      ? date.getTime()
      : Math.floor(date.getTime() / 1000)
    setDateTimestampResult(ts)
  }, [dateInput, inputMode])

  const timestampResultFormats = useMemo(() => {
    if (!timestampResult) return null
    return {
      local: formatLocalTime(timestampResult),
      utc: formatUTC(timestampResult),
      iso: formatISO(timestampResult),
      relative: getRelativeTime(timestampResult),
    }
  }, [timestampResult])

  const dateResultFormats = useMemo(() => {
    if (dateTimestampResult === null) return null
    const date = new Date(inputMode === 'milliseconds' ? dateTimestampResult : dateTimestampResult * 1000)
    return {
      timestamp: String(dateTimestampResult),
      local: formatLocalTime(date),
      utc: formatUTC(date),
      iso: formatISO(date),
      relative: getRelativeTime(date),
    }
  }, [dateTimestampResult, inputMode])

  return (
    <div className="space-y-6">
      {/* Current Timestamp */}
      <div className="rounded-xl border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark p-4 text-center">
        <p className="text-xs text-text-muted dark:text-text-muted-dark mb-1">
          Current Unix Timestamp
        </p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl font-bold font-mono text-text dark:text-text-dark tabular-nums">
            {currentTimestamp}
          </span>
          <CopyButton text={String(currentTimestamp)} />
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex items-center justify-center gap-2">
        <label className="text-sm text-text-muted dark:text-text-muted-dark">Mode:</label>
        {(['seconds', 'milliseconds'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setInputMode(mode)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors capitalize ${
              inputMode === mode
                ? 'bg-primary/10 text-primary'
                : 'border border-border dark:border-border-dark text-text-muted dark:text-text-muted-dark hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Timestamp → Date */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-text dark:text-text-dark">
            Timestamp → Date
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={timestampInput}
              onChange={(e) => setTimestampInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTimestampToDate()}
              placeholder={inputMode === 'seconds' ? '1711900800' : '1711900800000'}
              className="flex-1 rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-text-muted/50 dark:placeholder:text-text-muted-dark/50"
            />
            <button
              onClick={handleTimestampToDate}
              className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark transition-colors font-medium text-sm shrink-0"
            >
              Convert
            </button>
          </div>

          {timestampError && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-2">
              <p className="text-xs text-red-700 dark:text-red-400">{timestampError}</p>
            </div>
          )}

          {timestampResultFormats && (
            <div className="rounded-xl border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark p-3 space-y-2">
              {[
                { label: 'Local Time', value: timestampResultFormats.local },
                { label: 'UTC', value: timestampResultFormats.utc },
                { label: 'ISO 8601', value: timestampResultFormats.iso },
                { label: 'Relative', value: timestampResultFormats.relative },
              ].map((item) => (
                <div key={item.label} className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs text-text-muted dark:text-text-muted-dark">{item.label}</p>
                    <p className="text-sm font-mono text-text dark:text-text-dark break-all">
                      {item.value}
                    </p>
                  </div>
                  <CopyButton text={item.value} label="" className="shrink-0 !px-1.5 !py-1" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Date → Timestamp */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-text dark:text-text-dark">
            Date → Timestamp
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleDateToTimestamp()}
              placeholder="2026-03-31T12:00:00"
              className="flex-1 rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-text-muted/50 dark:placeholder:text-text-muted-dark/50"
            />
            <button
              onClick={handleDateToTimestamp}
              className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark transition-colors font-medium text-sm shrink-0"
            >
              Convert
            </button>
          </div>

          {dateError && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-2">
              <p className="text-xs text-red-700 dark:text-red-400">{dateError}</p>
            </div>
          )}

          {dateResultFormats && (
            <div className="rounded-xl border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark p-3 space-y-2">
              {[
                { label: `Timestamp (${inputMode})`, value: dateResultFormats.timestamp },
                { label: 'Local Time', value: dateResultFormats.local },
                { label: 'UTC', value: dateResultFormats.utc },
                { label: 'ISO 8601', value: dateResultFormats.iso },
                { label: 'Relative', value: dateResultFormats.relative },
              ].map((item) => (
                <div key={item.label} className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs text-text-muted dark:text-text-muted-dark">{item.label}</p>
                    <p className="text-sm font-mono text-text dark:text-text-dark break-all">
                      {item.value}
                    </p>
                  </div>
                  <CopyButton text={item.value} label="" className="shrink-0 !px-1.5 !py-1" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
