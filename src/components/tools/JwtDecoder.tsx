'use client'

import { useState } from 'react'
import CopyButton from '@/components/ui/CopyButton'

interface DecodedJwt {
  header: string
  payload: string
  expirationDate: string | null
  isExpired: boolean | null
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  const padding = base64.length % 4
  if (padding === 2) {
    base64 += '=='
  } else if (padding === 3) {
    base64 += '='
  }
  const binary = atob(base64)
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
  return new TextDecoder('utf-8').decode(bytes)
}

function formatExpirationDate(exp: number): string {
  const date = new Date(exp * 1000)
  return date.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  })
}

export default function JwtDecoder() {
  const [input, setInput] = useState('')
  const [decoded, setDecoded] = useState<DecodedJwt | null>(null)
  const [error, setError] = useState('')

  const handleDecode = () => {
    setError('')
    setDecoded(null)

    const token = input.trim()
    if (!token) return

    const parts = token.split('.')
    if (parts.length !== 3) {
      setError('Invalid JWT format. A JWT must have exactly 3 parts separated by dots (header.payload.signature).')
      return
    }

    try {
      const headerJson = base64UrlDecode(parts[0])
      const payloadJson = base64UrlDecode(parts[1])

      const header = JSON.parse(headerJson)
      const payload = JSON.parse(payloadJson)

      let expirationDate: string | null = null
      let isExpired: boolean | null = null

      if (typeof payload.exp === 'number') {
        expirationDate = formatExpirationDate(payload.exp)
        isExpired = Date.now() > payload.exp * 1000
      }

      setDecoded({
        header: JSON.stringify(header, null, 2),
        payload: JSON.stringify(payload, null, 2),
        expirationDate,
        isExpired,
      })
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to decode JWT'
      setError(`Failed to decode JWT: ${message}`)
    }
  }

  const handleClear = () => {
    setInput('')
    setDecoded(null)
    setError('')
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
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
          JWT Token
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JWT token here, e.g. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          className="tool-textarea custom-scrollbar w-full h-32 rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-3 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-text-muted/50 dark:placeholder:text-text-muted-dark/50"
          spellCheck={false}
        />
      </div>

      <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 px-3 py-2">
        <p className="text-xs text-yellow-700 dark:text-yellow-400">
          This tool only decodes the JWT (base64). It does not verify the signature.
          Never paste tokens containing sensitive data into untrusted tools.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
          <p className="text-sm text-red-700 dark:text-red-400 font-mono break-all">
            {error}
          </p>
        </div>
      )}

      {decoded && (
        <div className="space-y-4">
          {decoded.expirationDate !== null && (
            <div
              className={`rounded-lg px-3 py-2 border ${
                decoded.isExpired
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  decoded.isExpired
                    ? 'text-red-700 dark:text-red-400'
                    : 'text-green-700 dark:text-green-400'
                }`}
              >
                {decoded.isExpired ? 'Token is EXPIRED' : 'Token is valid (not expired)'}
              </p>
              <p
                className={`text-xs mt-0.5 ${
                  decoded.isExpired
                    ? 'text-red-600 dark:text-red-500'
                    : 'text-green-600 dark:text-green-500'
                }`}
              >
                Expires: {decoded.expirationDate}
              </p>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-text dark:text-text-dark">
                Header
              </label>
              <CopyButton text={decoded.header} />
            </div>
            <textarea
              value={decoded.header}
              readOnly
              className="tool-textarea custom-scrollbar w-full h-32 rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-3 font-mono text-sm resize-y focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-text dark:text-text-dark">
                Payload
              </label>
              <CopyButton text={decoded.payload} />
            </div>
            <textarea
              value={decoded.payload}
              readOnly
              className="tool-textarea custom-scrollbar w-full h-48 rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-3 font-mono text-sm resize-y focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  )
}
