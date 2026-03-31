'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Image as ImageIcon, Download, RefreshCw, X, ArrowRight, Info } from 'lucide-react'

type OutputFormat = 'image/png' | 'image/jpeg' | 'image/webp'

interface ImageInfo {
  name: string
  size: number
  width: number
  height: number
  type: string
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const formatLabels: Record<OutputFormat, string> = {
  'image/png': 'PNG',
  'image/jpeg': 'JPEG',
  'image/webp': 'WebP',
}

const formatExtensions: Record<OutputFormat, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
}

function getQualityLabel(q: number): { label: string; color: string } {
  if (q >= 90) return { label: 'Excellent', color: 'text-green-500' }
  if (q >= 70) return { label: 'Good', color: 'text-accent' }
  if (q >= 40) return { label: 'Medium', color: 'text-warm' }
  return { label: 'Low', color: 'text-red-500' }
}

export default function ImageConverter() {
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('image/png')
  const [quality, setQuality] = useState(90)
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null)
  const [convertedSize, setConvertedSize] = useState<number | null>(null)
  const [converting, setConverting] = useState(false)
  const [error, setError] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const sourceImageRef = useRef<HTMLImageElement | null>(null)

  const loadImage = useCallback((file: File) => {
    setError('')
    setConvertedUrl(null)
    setConvertedSize(null)

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.')
      return
    }

    const MAX_SIZE_MB = 20
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File size must be under ${MAX_SIZE_MB} MB.`)
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      const img = new Image()
      img.onload = () => {
        setImageInfo({
          name: file.name,
          size: file.size,
          width: img.width,
          height: img.height,
          type: file.type,
        })
        setPreviewUrl(dataUrl)
        sourceImageRef.current = img
      }
      img.onerror = () => {
        setError('Failed to load image.')
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) loadImage(file)
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) loadImage(file)
    },
    [loadImage]
  )

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleConvert = useCallback(() => {
    if (!sourceImageRef.current) return
    setConverting(true)
    setError('')

    try {
      const img = sourceImageRef.current
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        setError('Canvas not supported in this browser.')
        setConverting(false)
        return
      }

      if (outputFormat === 'image/jpeg') {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      ctx.drawImage(img, 0, 0)

      const qualityValue = outputFormat === 'image/png' ? undefined : quality / 100

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError('Conversion failed.')
            setConverting(false)
            return
          }
          const url = URL.createObjectURL(blob)
          setConvertedUrl(url)
          setConvertedSize(blob.size)
          setConverting(false)
        },
        outputFormat,
        qualityValue
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Conversion failed'
      setError(message)
      setConverting(false)
    }
  }, [outputFormat, quality])

  const handleDownload = () => {
    if (!convertedUrl || !imageInfo) return
    const baseName = imageInfo.name.replace(/\.[^.]+$/, '')
    const ext = formatExtensions[outputFormat]
    const a = document.createElement('a')
    a.href = convertedUrl
    a.download = `${baseName}.${ext}`
    a.click()
  }

  const handleReset = () => {
    setImageInfo(null)
    setPreviewUrl(null)
    setConvertedUrl(null)
    setConvertedSize(null)
    setError('')
    sourceImageRef.current = null
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const showQualitySlider = outputFormat !== 'image/png'
  const qualityInfo = getQualityLabel(quality)

  const sizeSaved = imageInfo && convertedSize !== null
    ? ((1 - convertedSize / imageInfo.size) * 100)
    : null

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <AnimatePresence mode="wait">
        {!previewUrl ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragOver
                ? 'border-primary bg-primary/5 scale-[1.01] shadow-lg shadow-primary/10'
                : 'border-border dark:border-border-dark hover:border-primary/50 hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <motion.div
              animate={isDragOver ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Upload className="w-7 h-7 text-primary" />
              </div>
            </motion.div>
            <p className="text-sm font-medium text-text dark:text-text-dark">
              Drop an image here or <span className="text-primary">click to browse</span>
            </p>
            <p className="text-xs text-text-muted dark:text-text-muted-dark mt-2">
              Supports PNG, JPEG, WebP, GIF, BMP, SVG (max 20 MB)
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Image loaded - show content */}
            <div className="space-y-5">
              {/* Reset button */}
              <div className="flex justify-end">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-text-muted dark:text-text-muted-dark hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Remove Image
                </button>
              </div>

              {/* Side-by-side Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Original */}
                <div className="glass-card rounded-2xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-border/50 dark:border-border-dark/50 flex items-center justify-between">
                    <span className="text-xs font-semibold text-text-muted dark:text-text-muted-dark uppercase tracking-wider">
                      Original
                    </span>
                    <span className="text-xs text-text-muted dark:text-text-muted-dark font-mono">
                      {formatFileSize(imageInfo!.size)}
                    </span>
                  </div>
                  <div className="p-3 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%3E%3Crect%20width%3D%228%22%20height%3D%228%22%20fill%3D%22%23f0f0f0%22/%3E%3Crect%20x%3D%228%22%20y%3D%228%22%20width%3D%228%22%20height%3D%228%22%20fill%3D%22%23f0f0f0%22/%3E%3C/svg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%3E%3Crect%20width%3D%228%22%20height%3D%228%22%20fill%3D%22%23333%22/%3E%3Crect%20x%3D%228%22%20y%3D%228%22%20width%3D%228%22%20height%3D%228%22%20fill%3D%22%23333%22/%3E%3C/svg%3E')]">
                    <img
                      src={previewUrl}
                      alt="Original"
                      className="max-w-full max-h-56 mx-auto object-contain"
                    />
                  </div>
                </div>

                {/* Converted */}
                <div className="glass-card rounded-2xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-border/50 dark:border-border-dark/50 flex items-center justify-between">
                    <span className="text-xs font-semibold text-text-muted dark:text-text-muted-dark uppercase tracking-wider">
                      Converted
                    </span>
                    {convertedSize !== null && (
                      <span className="text-xs font-mono text-text-muted dark:text-text-muted-dark">
                        {formatFileSize(convertedSize)}
                      </span>
                    )}
                  </div>
                  <div className="p-3 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%3E%3Crect%20width%3D%228%22%20height%3D%228%22%20fill%3D%22%23f0f0f0%22/%3E%3Crect%20x%3D%228%22%20y%3D%228%22%20width%3D%228%22%20height%3D%228%22%20fill%3D%22%23f0f0f0%22/%3E%3C/svg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%3E%3Crect%20width%3D%228%22%20height%3D%228%22%20fill%3D%22%23333%22/%3E%3Crect%20x%3D%228%22%20y%3D%228%22%20width%3D%228%22%20height%3D%228%22%20fill%3D%22%23333%22/%3E%3C/svg%3E')]">
                    {convertedUrl ? (
                      <img
                        src={convertedUrl}
                        alt="Converted"
                        className="max-w-full max-h-56 mx-auto object-contain"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-56 text-text-muted/40 dark:text-text-muted-dark/40">
                        <div className="text-center">
                          <ImageIcon className="w-10 h-10 mx-auto mb-2" />
                          <p className="text-xs">Convert to preview</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* File Info Card */}
              <div className="glass-card rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-text-muted dark:text-text-muted-dark" />
                  <span className="text-xs font-semibold text-text-muted dark:text-text-muted-dark uppercase tracking-wider">
                    File Info
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Name', value: imageInfo!.name },
                    { label: 'Type', value: imageInfo!.type.split('/')[1].toUpperCase() },
                    { label: 'Size', value: formatFileSize(imageInfo!.size) },
                    { label: 'Dimensions', value: `${imageInfo!.width} x ${imageInfo!.height}` },
                  ].map((item) => (
                    <div key={item.label} className="text-center sm:text-left">
                      <p className="text-xs text-text-muted dark:text-text-muted-dark mb-0.5">{item.label}</p>
                      <p className="text-sm font-mono text-text dark:text-text-dark truncate" title={item.value}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Output Format */}
                <div>
                  <label className="block text-sm font-medium text-text dark:text-text-dark mb-2">
                    Output Format
                  </label>
                  <div className="flex gap-1.5 p-1 bg-surface-secondary dark:bg-surface-secondary-dark rounded-xl border border-border dark:border-border-dark">
                    {(Object.keys(formatLabels) as OutputFormat[]).map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => {
                          setOutputFormat(fmt)
                          setConvertedUrl(null)
                          setConvertedSize(null)
                        }}
                        className={`relative flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                          outputFormat === fmt
                            ? 'bg-primary text-white shadow-md shadow-primary/25'
                            : 'text-text-muted dark:text-text-muted-dark hover:text-text dark:hover:text-text-dark'
                        }`}
                      >
                        {formatLabels[fmt]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quality Slider */}
                <div>
                  <label className="block text-sm font-medium text-text dark:text-text-dark mb-2">
                    Quality
                  </label>
                  {showQualitySlider ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-text dark:text-text-dark">{quality}%</span>
                        <span className={`text-sm font-medium ${qualityInfo.color}`}>{qualityInfo.label}</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={100}
                        value={quality}
                        onChange={(e) => {
                          setQuality(Number(e.target.value))
                          setConvertedUrl(null)
                          setConvertedSize(null)
                        }}
                        className="w-full accent-primary h-2 rounded-full"
                      />
                      <div className="flex justify-between text-xs text-text-muted dark:text-text-muted-dark">
                        <span>Small file</span>
                        <span>Best quality</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-20 rounded-xl bg-surface-secondary dark:bg-surface-secondary-dark border border-border dark:border-border-dark">
                      <p className="text-sm text-text-muted dark:text-text-muted-dark">
                        PNG uses lossless compression
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Convert & Download */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleConvert}
                  disabled={converting}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {converting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  {converting ? 'Converting...' : 'Convert'}
                </button>

                <AnimatePresence>
                  {convertedUrl && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={handleDownload}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-xl font-medium hover:bg-primary/10 transition-all active:scale-[0.98]"
                    >
                      <Download className="w-4 h-4" />
                      Download {formatLabels[outputFormat]}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Size Comparison */}
              <AnimatePresence>
                {convertedSize !== null && imageInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="glass-card rounded-2xl p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-center flex-1">
                        <p className="text-xs text-text-muted dark:text-text-muted-dark mb-1">Original</p>
                        <p className="text-lg font-bold text-text dark:text-text-dark font-mono">
                          {formatFileSize(imageInfo.size)}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-text-muted dark:text-text-muted-dark mx-4 shrink-0" />
                      <div className="text-center flex-1">
                        <p className="text-xs text-text-muted dark:text-text-muted-dark mb-1">Converted</p>
                        <p className="text-lg font-bold text-text dark:text-text-dark font-mono">
                          {formatFileSize(convertedSize)}
                        </p>
                      </div>
                      <div className="text-center flex-1 ml-4">
                        <p className="text-xs text-text-muted dark:text-text-muted-dark mb-1">Saved</p>
                        <p className={`text-lg font-bold font-mono ${
                          sizeSaved !== null && sizeSaved > 0 ? 'text-green-500' : sizeSaved !== null && sizeSaved < 0 ? 'text-red-500' : 'text-text dark:text-text-dark'
                        }`}>
                          {sizeSaved !== null ? (sizeSaved > 0 ? `-${sizeSaved.toFixed(1)}%` : `+${Math.abs(sizeSaved).toFixed(1)}%`) : '0%'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4"
          >
            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
