'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hash, Shield, FileText, Check, X, Trash2, Upload, Loader2, Search } from 'lucide-react'
import CopyButton from '@/components/ui/CopyButton'

interface HashResult {
  algorithm: string
  hash: string
  color: string
  icon: React.ReactNode
}

function md5(input: string): string {
  function safeAdd(x: number, y: number): number {
    const lsw = (x & 0xffff) + (y & 0xffff)
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xffff)
  }

  function bitRotateLeft(num: number, cnt: number): number {
    return (num << cnt) | (num >>> (32 - cnt))
  }

  function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
  }

  function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t)
  }

  function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
  }

  function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn(b ^ c ^ d, a, b, x, s, t)
  }

  function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t)
  }

  function binlMD5(x: number[], len: number): number[] {
    x[len >> 5] |= 0x80 << len % 32
    x[(((len + 64) >>> 9) << 4) + 14] = len

    let a = 1732584193
    let b = -271733879
    let c = -1732584194
    let d = 271733878

    for (let i = 0; i < x.length; i += 16) {
      const olda = a
      const oldb = b
      const oldc = c
      const oldd = d

      a = md5ff(a, b, c, d, x[i] || 0, 7, -680876936)
      d = md5ff(d, a, b, c, x[i + 1] || 0, 12, -389564586)
      c = md5ff(c, d, a, b, x[i + 2] || 0, 17, 606105819)
      b = md5ff(b, c, d, a, x[i + 3] || 0, 22, -1044525330)
      a = md5ff(a, b, c, d, x[i + 4] || 0, 7, -176418897)
      d = md5ff(d, a, b, c, x[i + 5] || 0, 12, 1200080426)
      c = md5ff(c, d, a, b, x[i + 6] || 0, 17, -1473231341)
      b = md5ff(b, c, d, a, x[i + 7] || 0, 22, -45705983)
      a = md5ff(a, b, c, d, x[i + 8] || 0, 7, 1770035416)
      d = md5ff(d, a, b, c, x[i + 9] || 0, 12, -1958414417)
      c = md5ff(c, d, a, b, x[i + 10] || 0, 17, -42063)
      b = md5ff(b, c, d, a, x[i + 11] || 0, 22, -1990404162)
      a = md5ff(a, b, c, d, x[i + 12] || 0, 7, 1804603682)
      d = md5ff(d, a, b, c, x[i + 13] || 0, 12, -40341101)
      c = md5ff(c, d, a, b, x[i + 14] || 0, 17, -1502002290)
      b = md5ff(b, c, d, a, x[i + 15] || 0, 22, 1236535329)

      a = md5gg(a, b, c, d, x[i + 1] || 0, 5, -165796510)
      d = md5gg(d, a, b, c, x[i + 6] || 0, 9, -1069501632)
      c = md5gg(c, d, a, b, x[i + 11] || 0, 14, 643717713)
      b = md5gg(b, c, d, a, x[i] || 0, 20, -373897302)
      a = md5gg(a, b, c, d, x[i + 5] || 0, 5, -701558691)
      d = md5gg(d, a, b, c, x[i + 10] || 0, 9, 38016083)
      c = md5gg(c, d, a, b, x[i + 15] || 0, 14, -660478335)
      b = md5gg(b, c, d, a, x[i + 4] || 0, 20, -405537848)
      a = md5gg(a, b, c, d, x[i + 9] || 0, 5, 568446438)
      d = md5gg(d, a, b, c, x[i + 14] || 0, 9, -1019803690)
      c = md5gg(c, d, a, b, x[i + 3] || 0, 14, -187363961)
      b = md5gg(b, c, d, a, x[i + 8] || 0, 20, 1163531501)
      a = md5gg(a, b, c, d, x[i + 13] || 0, 5, -1444681467)
      d = md5gg(d, a, b, c, x[i + 2] || 0, 9, -51403784)
      c = md5gg(c, d, a, b, x[i + 7] || 0, 14, 1735328473)
      b = md5gg(b, c, d, a, x[i + 12] || 0, 20, -1926607734)

      a = md5hh(a, b, c, d, x[i + 5] || 0, 4, -378558)
      d = md5hh(d, a, b, c, x[i + 8] || 0, 11, -2022574463)
      c = md5hh(c, d, a, b, x[i + 11] || 0, 16, 1839030562)
      b = md5hh(b, c, d, a, x[i + 14] || 0, 23, -35309556)
      a = md5hh(a, b, c, d, x[i + 1] || 0, 4, -1530992060)
      d = md5hh(d, a, b, c, x[i + 4] || 0, 11, 1272893353)
      c = md5hh(c, d, a, b, x[i + 7] || 0, 16, -155497632)
      b = md5hh(b, c, d, a, x[i + 10] || 0, 23, -1094730640)
      a = md5hh(a, b, c, d, x[i + 13] || 0, 4, 681279174)
      d = md5hh(d, a, b, c, x[i] || 0, 11, -358537222)
      c = md5hh(c, d, a, b, x[i + 3] || 0, 16, -722521979)
      b = md5hh(b, c, d, a, x[i + 6] || 0, 23, 76029189)
      a = md5hh(a, b, c, d, x[i + 9] || 0, 4, -640364487)
      d = md5hh(d, a, b, c, x[i + 12] || 0, 11, -421815835)
      c = md5hh(c, d, a, b, x[i + 15] || 0, 16, 530742520)
      b = md5hh(b, c, d, a, x[i + 2] || 0, 23, -995338651)

      a = md5ii(a, b, c, d, x[i] || 0, 6, -198630844)
      d = md5ii(d, a, b, c, x[i + 7] || 0, 10, 1126891415)
      c = md5ii(c, d, a, b, x[i + 14] || 0, 15, -1416354905)
      b = md5ii(b, c, d, a, x[i + 5] || 0, 21, -57434055)
      a = md5ii(a, b, c, d, x[i + 12] || 0, 6, 1700485571)
      d = md5ii(d, a, b, c, x[i + 3] || 0, 10, -1894986606)
      c = md5ii(c, d, a, b, x[i + 10] || 0, 15, -1051523)
      b = md5ii(b, c, d, a, x[i + 1] || 0, 21, -2054922799)
      a = md5ii(a, b, c, d, x[i + 8] || 0, 6, 1873313359)
      d = md5ii(d, a, b, c, x[i + 15] || 0, 10, -30611744)
      c = md5ii(c, d, a, b, x[i + 6] || 0, 15, -1560198380)
      b = md5ii(b, c, d, a, x[i + 13] || 0, 21, 1309151649)
      a = md5ii(a, b, c, d, x[i + 4] || 0, 6, -145523070)
      d = md5ii(d, a, b, c, x[i + 11] || 0, 10, -1120210379)
      c = md5ii(c, d, a, b, x[i + 2] || 0, 15, 718787259)
      b = md5ii(b, c, d, a, x[i + 9] || 0, 21, -343485551)

      a = safeAdd(a, olda)
      b = safeAdd(b, oldb)
      c = safeAdd(c, oldc)
      d = safeAdd(d, oldd)
    }
    return [a, b, c, d]
  }

  function rstrMD5(s: string): string {
    const bytes = new TextEncoder().encode(s)
    const bitLen = bytes.length * 8
    const words: number[] = []
    for (let i = 0; i < bytes.length; i++) {
      words[i >> 2] |= bytes[i] << (i % 4) * 8
    }
    const binl = binlMD5(words, bitLen)
    let result = ''
    for (let i = 0; i < binl.length * 4; i++) {
      result += String.fromCharCode((binl[i >> 2] >> (i % 4) * 8) & 0xff)
    }
    return result
  }

  function rstr2hex(input: string): string {
    const hexTab = '0123456789abcdef'
    let output = ''
    for (let i = 0; i < input.length; i++) {
      const x = input.charCodeAt(i)
      output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f)
    }
    return output
  }

  return rstr2hex(rstrMD5(input))
}

async function computeHash(algorithm: string, data: ArrayBuffer): Promise<string> {
  const hashBuffer = await crypto.subtle.digest(algorithm, data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

function md5FromArrayBuffer(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  const text = Array.from(bytes).map((b) => String.fromCharCode(b)).join('')
  return md5(text)
}

function detectHashType(hash: string): string | null {
  const cleaned = hash.trim().toLowerCase()
  if (!/^[0-9a-f]+$/.test(cleaned)) return null
  switch (cleaned.length) {
    case 32: return 'MD5'
    case 40: return 'SHA-1'
    case 64: return 'SHA-256'
    case 128: return 'SHA-512'
    default: return null
  }
}

const algorithmColors: Record<string, { border: string; bg: string; text: string }> = {
  'MD5': { border: 'border-warm/30', bg: 'bg-warm/5', text: 'text-warm' },
  'SHA-1': { border: 'border-accent/30', bg: 'bg-accent/5', text: 'text-accent' },
  'SHA-256': { border: 'border-primary/30', bg: 'bg-primary/5', text: 'text-primary' },
  'SHA-512': { border: 'border-green-500/30', bg: 'bg-green-500/5', text: 'text-green-500' },
}

export default function HashGenerator() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<HashResult[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [compareHash, setCompareHash] = useState('')
  const [showCompare, setShowCompare] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  const detectedType = compareHash ? detectHashType(compareHash) : null

  const generateHashesFromBuffer = useCallback(async (buffer: ArrayBuffer, isTextMode: boolean, textInput: string) => {
    setIsLoading(true)
    setError('')
    setResults([])

    try {
      const md5Hash = isTextMode ? md5(textInput) : md5FromArrayBuffer(buffer)
      const [sha1, sha256, sha512] = await Promise.all([
        computeHash('SHA-1', buffer),
        computeHash('SHA-256', buffer),
        computeHash('SHA-512', buffer),
      ])

      setResults([
        { algorithm: 'MD5', hash: md5Hash, color: 'warm', icon: <Hash className="w-4 h-4" /> },
        { algorithm: 'SHA-1', hash: sha1, color: 'accent', icon: <Shield className="w-4 h-4" /> },
        { algorithm: 'SHA-256', hash: sha256, color: 'primary', icon: <Shield className="w-4 h-4" /> },
        { algorithm: 'SHA-512', hash: sha512, color: 'green', icon: <Shield className="w-4 h-4" /> },
      ])
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Hash generation failed'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleGenerate = async () => {
    if (!input) return
    const encoder = new TextEncoder()
    const buffer = encoder.encode(input).buffer as ArrayBuffer
    setFileName(null)
    await generateHashesFromBuffer(buffer, true, input)
  }

  const handleFileInput = useCallback(async (file: File) => {
    setFileName(file.name)
    setInput('')
    setError('')
    setResults([])

    try {
      const buffer = await file.arrayBuffer()
      await generateHashesFromBuffer(buffer, false, '')
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to read file'
      setError(message)
    }
  }, [generateHashesFromBuffer])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFileInput(file)
    },
    [handleFileInput]
  )

  const handleClear = () => {
    setInput('')
    setResults([])
    setError('')
    setFileName(null)
    setCompareHash('')
    setShowCompare(false)
  }

  const compareMatchResult = useCallback((resultHash: string): boolean | null => {
    if (!compareHash.trim()) return null
    return resultHash.toLowerCase() === compareHash.trim().toLowerCase()
  }, [compareHash])

  return (
    <div className="space-y-5">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          onClick={handleGenerate}
          disabled={isLoading || (!input && !fileName)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Hash className="w-4 h-4" />}
          {isLoading ? 'Generating...' : 'Generate Hashes'}
        </button>
        <label className="inline-flex items-center gap-2 px-4 py-2.5 border border-border dark:border-border-dark text-text-muted dark:text-text-muted-dark rounded-xl font-medium text-sm hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark transition-all cursor-pointer active:scale-[0.98]">
          <Upload className="w-4 h-4" />
          Hash File
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFileInput(file)
            }}
          />
        </label>
        <button
          onClick={() => setShowCompare((prev) => !prev)}
          className={`inline-flex items-center gap-2 px-4 py-2.5 border rounded-xl font-medium text-sm transition-all active:scale-[0.98] ${
            showCompare
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border dark:border-border-dark text-text-muted dark:text-text-muted-dark hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark'
          }`}
        >
          <Search className="w-4 h-4" />
          Compare
        </button>
        <button
          onClick={handleClear}
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-border dark:border-border-dark text-text-muted dark:text-text-muted-dark rounded-xl font-medium text-sm hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark transition-all active:scale-[0.98]"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>
      </div>

      {/* Compare Hash */}
      <AnimatePresence>
        {showCompare && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-4 h-4 text-primary" />
                <label className="text-sm font-medium text-text dark:text-text-dark">
                  Compare Hash
                </label>
                {detectedType && (
                  <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                    Detected: {detectedType}
                  </span>
                )}
              </div>
              <input
                type="text"
                value={compareHash}
                onChange={(e) => setCompareHash(e.target.value)}
                placeholder="Paste a hash to compare against results..."
                className="w-full rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-text-muted/50 dark:placeholder:text-text-muted-dark/50"
                spellCheck={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area - Drag & Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
        onDragLeave={() => setIsDragOver(false)}
        className={`relative rounded-xl transition-all ${
          isDragOver ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900' : ''
        }`}
      >
        {fileName ? (
          <div className="glass-card rounded-xl p-6 text-center">
            <FileText className="w-10 h-10 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium text-text dark:text-text-dark">{fileName}</p>
            <p className="text-xs text-text-muted dark:text-text-muted-dark mt-1">
              File loaded - hashes generated below
            </p>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-text dark:text-text-dark mb-1.5">
              Input Text
            </label>
            <textarea
              value={input}
              onChange={(e) => { setInput(e.target.value); setFileName(null) }}
              placeholder="Enter text to hash, or drag & drop a file here..."
              className="tool-textarea custom-scrollbar w-full h-40 rounded-xl border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-3 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-text-muted/50 dark:placeholder:text-text-muted-dark/50"
              spellCheck={false}
            />
          </div>
        )}
        {isDragOver && (
          <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-dashed border-primary z-10">
            <div className="text-center">
              <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-primary">Drop file to hash</p>
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4"
          >
            <p className="text-sm text-red-700 dark:text-red-400 font-mono break-all">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center py-8"
          >
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
              <span className="text-sm text-text-muted dark:text-text-muted-dark">Generating hashes...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {results.length > 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-3"
          >
            {results.map((result, idx) => {
              const colors = algorithmColors[result.algorithm]
              const matchResult = compareMatchResult(result.hash)
              const isMatchTarget = detectedType === result.algorithm

              return (
                <motion.div
                  key={result.algorithm}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  className={`rounded-xl border ${colors.border} ${colors.bg} p-4 transition-all ${
                    matchResult === true ? 'ring-2 ring-green-500/50' : matchResult === false && isMatchTarget ? 'ring-2 ring-red-500/50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={colors.text}>{result.icon}</span>
                      <span className={`text-xs font-semibold uppercase tracking-wider ${colors.text}`}>
                        {result.algorithm}
                      </span>
                      {result.algorithm === 'MD5' && (
                        <span className="text-xs text-text-muted dark:text-text-muted-dark">
                          (JS impl.)
                        </span>
                      )}
                      {matchResult === true && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3" /> Match
                        </span>
                      )}
                      {matchResult === false && isMatchTarget && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded-full">
                          <X className="w-3 h-3" /> No match
                        </span>
                      )}
                    </div>
                    <CopyButton text={result.hash} />
                  </div>
                  <code className="block font-mono text-sm text-text dark:text-text-dark break-all select-all leading-relaxed">
                    {result.hash}
                  </code>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
