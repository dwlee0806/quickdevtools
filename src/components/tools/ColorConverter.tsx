'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Pipette, Copy, Check, Plus, Accessibility, X } from 'lucide-react'
import CopyButton from '@/components/ui/CopyButton'

interface ColorState {
  hex: string
  rgb: { r: number; g: number; b: number }
  hsl: { h: number; s: number; l: number }
  hsb: { h: number; s: number; b: number }
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleaned = hex.replace('#', '')
  if (cleaned.length !== 6) return null
  const num = parseInt(cleaned, 16)
  if (isNaN(num)) return null
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255
  const max = Math.max(rNorm, gNorm, bNorm)
  const min = Math.min(rNorm, gNorm, bNorm)
  const l = (max + min) / 2
  let h = 0
  let s = 0

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    if (max === rNorm) {
      h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6
    } else if (max === gNorm) {
      h = ((bNorm - rNorm) / d + 2) / 6
    } else {
      h = ((rNorm - gNorm) / d + 4) / 6
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const hNorm = h / 360
  const sNorm = s / 100
  const lNorm = l / 100

  if (sNorm === 0) {
    const val = Math.round(lNorm * 255)
    return { r: val, g: val, b: val }
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    const tt = t < 0 ? t + 1 : t > 1 ? t - 1 : t
    if (tt < 1 / 6) return p + (q - p) * 6 * tt
    if (tt < 1 / 2) return q
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6
    return p
  }

  const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm
  const p = 2 * lNorm - q

  return {
    r: Math.round(hue2rgb(p, q, hNorm + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, hNorm) * 255),
    b: Math.round(hue2rgb(p, q, hNorm - 1 / 3) * 255),
  }
}

function rgbToHsb(r: number, g: number, b: number): { h: number; s: number; b: number } {
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255
  const max = Math.max(rNorm, gNorm, bNorm)
  const min = Math.min(rNorm, gNorm, bNorm)
  const d = max - min
  let h = 0
  const s = max === 0 ? 0 : d / max
  const brightness = max

  if (max !== min) {
    if (max === rNorm) {
      h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6
    } else if (max === gNorm) {
      h = ((bNorm - rNorm) / d + 2) / 6
    } else {
      h = ((rNorm - gNorm) / d + 4) / 6
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    b: Math.round(brightness * 100),
  }
}

function hsbToRgb(h: number, s: number, b: number): { r: number; g: number; b: number } {
  const sNorm = s / 100
  const bNorm = b / 100
  const k = (n: number) => (n + h / 60) % 6
  const f = (n: number) => bNorm * (1 - sNorm * Math.max(0, Math.min(k(n), 4 - k(n), 1)))
  return {
    r: Math.round(f(5) * 255),
    g: Math.round(f(3) * 255),
    b: Math.round(f(1) * 255),
  }
}

function getRelativeLuminance(r: number, g: number, b: number): number {
  const srgb = [r, g, b].map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2]
}

function getContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

const COLOR_NAMES: Record<string, string> = {
  '#000000': 'Black', '#ffffff': 'White', '#ff0000': 'Red', '#00ff00': 'Lime',
  '#0000ff': 'Blue', '#ffff00': 'Yellow', '#00ffff': 'Cyan', '#ff00ff': 'Magenta',
  '#808080': 'Gray', '#c0c0c0': 'Silver', '#800000': 'Maroon', '#808000': 'Olive',
  '#008000': 'Green', '#800080': 'Purple', '#008080': 'Teal', '#000080': 'Navy',
  '#ff6347': 'Tomato', '#ff7f50': 'Coral', '#ffa500': 'Orange', '#ffd700': 'Gold',
  '#ff69b4': 'Hot Pink', '#ff1493': 'Deep Pink', '#dc143c': 'Crimson',
  '#6366f1': 'Indigo', '#06b6d4': 'Cyan', '#f59e0b': 'Amber',
  '#4ade80': 'Green', '#f472b6': 'Pink', '#a78bfa': 'Violet',
  '#fb923c': 'Orange', '#38bdf8': 'Sky Blue', '#34d399': 'Emerald',
  '#e879f9': 'Fuchsia', '#facc15': 'Yellow', '#2dd4bf': 'Teal',
}

function getColorName(hex: string): string {
  const exactMatch = COLOR_NAMES[hex.toLowerCase()]
  if (exactMatch) return exactMatch

  const rgb = hexToRgb(hex)
  if (!rgb) return 'Unknown'
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b)

  if (l < 10) return 'Black'
  if (l > 95) return 'White'
  if (s < 10) {
    if (l < 30) return 'Dark Gray'
    if (l < 60) return 'Gray'
    return 'Light Gray'
  }

  let name = ''
  if (h < 15 || h >= 345) name = 'Red'
  else if (h < 35) name = 'Orange'
  else if (h < 65) name = 'Yellow'
  else if (h < 160) name = 'Green'
  else if (h < 200) name = 'Cyan'
  else if (h < 260) name = 'Blue'
  else if (h < 300) name = 'Purple'
  else name = 'Pink'

  if (l < 30) return `Dark ${name}`
  if (l > 70) return `Light ${name}`
  if (s > 80) return `Vivid ${name}`
  return name
}

const initialColor: ColorState = {
  hex: '#6366f1',
  rgb: { r: 99, g: 102, b: 241 },
  hsl: { h: 239, s: 84, l: 67 },
  hsb: { h: 239, s: 59, b: 95 },
}

export default function ColorConverter() {
  const [color, setColor] = useState<ColorState>(initialColor)
  const [hexInput, setHexInput] = useState(initialColor.hex)
  const [rgbInput, setRgbInput] = useState({ r: '99', g: '102', b: '241' })
  const [hslInput, setHslInput] = useState({ h: '239', s: '84', l: '67' })
  const [hsbInput, setHsbInput] = useState({ h: '239', s: '59', b: '95' })
  const [error, setError] = useState('')
  const [recentColors, setRecentColors] = useState<string[]>([])
  const [bgHex, setBgHex] = useState('#ffffff')
  const [showContrast, setShowContrast] = useState(false)
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const colorName = useMemo(() => getColorName(color.hex), [color.hex])

  const contrastInfo = useMemo(() => {
    const fgRgb = hexToRgb(color.hex)
    const bgRgb = hexToRgb(bgHex)
    if (!fgRgb || !bgRgb) return null
    const fgLum = getRelativeLuminance(fgRgb.r, fgRgb.g, fgRgb.b)
    const bgLum = getRelativeLuminance(bgRgb.r, bgRgb.g, bgRgb.b)
    const ratio = getContrastRatio(fgLum, bgLum)
    return {
      ratio: ratio.toFixed(2),
      aaSmall: ratio >= 4.5,
      aaLarge: ratio >= 3,
      aaaSmall: ratio >= 7,
      aaaLarge: ratio >= 4.5,
    }
  }, [color.hex, bgHex])

  const addToRecent = useCallback((hex: string) => {
    setRecentColors((prev) => {
      const filtered = prev.filter((c) => c !== hex)
      return [hex, ...filtered].slice(0, 10)
    })
  }, [])

  const updateAllFromRgb = useCallback((r: number, g: number, b: number) => {
    const hex = rgbToHex(r, g, b)
    const hsl = rgbToHsl(r, g, b)
    const hsb = rgbToHsb(r, g, b)
    setColor({ hex, rgb: { r, g, b }, hsl, hsb })
    setHexInput(hex)
    setRgbInput({ r: String(r), g: String(g), b: String(b) })
    setHslInput({ h: String(hsl.h), s: String(hsl.s), l: String(hsl.l) })
    setHsbInput({ h: String(hsb.h), s: String(hsb.s), b: String(hsb.b) })
  }, [])

  const updateFromHex = useCallback((hex: string) => {
    setHexInput(hex)
    const rgb = hexToRgb(hex)
    if (!rgb) {
      setError('Invalid HEX value')
      return
    }
    setError('')
    addToRecent(hex.startsWith('#') ? hex : `#${hex}`)
    updateAllFromRgb(rgb.r, rgb.g, rgb.b)
  }, [addToRecent, updateAllFromRgb])

  const updateFromRgb = useCallback((r: number, g: number, b: number) => {
    if ([r, g, b].some((v) => isNaN(v) || v < 0 || v > 255)) {
      setError('RGB values must be 0-255')
      return
    }
    setError('')
    addToRecent(rgbToHex(r, g, b))
    updateAllFromRgb(r, g, b)
  }, [addToRecent, updateAllFromRgb])

  const updateFromHsl = useCallback((h: number, s: number, l: number) => {
    if (isNaN(h) || h < 0 || h > 360 || isNaN(s) || s < 0 || s > 100 || isNaN(l) || l < 0 || l > 100) {
      setError('HSL values: H(0-360), S(0-100), L(0-100)')
      return
    }
    setError('')
    const rgb = hslToRgb(h, s, l)
    addToRecent(rgbToHex(rgb.r, rgb.g, rgb.b))
    updateAllFromRgb(rgb.r, rgb.g, rgb.b)
  }, [addToRecent, updateAllFromRgb])

  const updateFromHsb = useCallback((h: number, s: number, b: number) => {
    if (isNaN(h) || h < 0 || h > 360 || isNaN(s) || s < 0 || s > 100 || isNaN(b) || b < 0 || b > 100) {
      setError('HSB values: H(0-360), S(0-100), B(0-100)')
      return
    }
    setError('')
    const rgb = hsbToRgb(h, s, b)
    addToRecent(rgbToHex(rgb.r, rgb.g, rgb.b))
    updateAllFromRgb(rgb.r, rgb.g, rgb.b)
  }, [addToRecent, updateAllFromRgb])

  const handleColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFromHex(e.target.value)
  }

  const handleQuickCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedItem(id)
    setTimeout(() => setCopiedItem(null), 1500)
  }

  const hexString = color.hex.toUpperCase()
  const rgbString = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`
  const hslString = `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`
  const hsbString = `hsb(${color.hsb.h}, ${color.hsb.s}%, ${color.hsb.b}%)`
  const cssVar = `--color-custom: ${color.hex};`
  const tailwindClass = `bg-[${color.hex}]`

  return (
    <div className="space-y-6">
      {/* Color Preview & Picker */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col items-center gap-3 shrink-0">
          {/* Large Preview Swatch */}
          <motion.div
            className="w-44 h-44 rounded-2xl border-2 border-border dark:border-border-dark shadow-lg relative overflow-hidden"
            style={{ backgroundColor: color.hex }}
            animate={{ backgroundColor: color.hex }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute bottom-0 inset-x-0 bg-black/40 backdrop-blur-sm px-3 py-2">
              <p className="text-white text-xs font-mono text-center">{hexString}</p>
            </div>
          </motion.div>

          {/* Color Name */}
          <div className="text-center">
            <p className="text-sm font-medium text-text dark:text-text-dark">{colorName}</p>
          </div>

          {/* Picker */}
          <label className="relative cursor-pointer group">
            <input
              type="color"
              value={color.hex}
              onChange={handleColorPicker}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-border dark:border-border-dark rounded-xl text-sm text-text-muted dark:text-text-muted-dark group-hover:border-primary group-hover:text-primary transition-colors">
              <Pipette className="w-4 h-4" />
              Pick Color
            </div>
          </label>

          {/* Quick Copy Buttons */}
          <div className="flex flex-col gap-1.5 w-full">
            {[
              { id: 'css', label: 'CSS Variable', value: cssVar },
              { id: 'tw', label: 'Tailwind', value: tailwindClass },
            ].map(({ id, label, value }) => (
              <button
                key={id}
                onClick={() => handleQuickCopy(value, id)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-lg border border-border dark:border-border-dark hover:border-primary/50 hover:bg-primary/5 transition-all text-text-muted dark:text-text-muted-dark"
              >
                {copiedItem === id ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span className="truncate">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Format Inputs */}
        <div className="flex-1 space-y-4">
          {/* HEX */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-text dark:text-text-dark flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                HEX
              </label>
              <CopyButton text={hexString} />
            </div>
            <input
              type="text"
              value={hexInput}
              onChange={(e) => {
                setHexInput(e.target.value)
                const val = e.target.value.trim()
                if (val.replace('#', '').length === 6) {
                  updateFromHex(val.startsWith('#') ? val : `#${val}`)
                }
              }}
              onBlur={() => {
                const val = hexInput.trim()
                if (val.replace('#', '').length === 6) {
                  updateFromHex(val.startsWith('#') ? val : `#${val}`)
                }
              }}
              placeholder="#6366f1"
              className="w-full rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* RGB */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-text dark:text-text-dark flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                RGB
              </label>
              <CopyButton text={rgbString} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['r', 'g', 'b'] as const).map((channel) => (
                <div key={channel}>
                  <label className="text-xs text-text-muted dark:text-text-muted-dark uppercase font-medium">{channel}</label>
                  <input
                    type="number"
                    min={0}
                    max={255}
                    value={rgbInput[channel]}
                    onChange={(e) => {
                      const newInput = { ...rgbInput, [channel]: e.target.value }
                      setRgbInput(newInput)
                      const r = parseInt(newInput.r) || 0
                      const g = parseInt(newInput.g) || 0
                      const b = parseInt(newInput.b) || 0
                      updateFromRgb(r, g, b)
                    }}
                    className="w-full rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* HSL */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-text dark:text-text-dark flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-warm" />
                HSL
              </label>
              <CopyButton text={hslString} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {([
                { key: 'h' as const, label: 'H', max: 360 },
                { key: 's' as const, label: 'S', max: 100 },
                { key: 'l' as const, label: 'L', max: 100 },
              ]).map(({ key, label, max }) => (
                <div key={key}>
                  <label className="text-xs text-text-muted dark:text-text-muted-dark font-medium">
                    {label} <span className="text-text-muted/60">(0-{max})</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={max}
                    value={hslInput[key]}
                    onChange={(e) => {
                      const newInput = { ...hslInput, [key]: e.target.value }
                      setHslInput(newInput)
                      const h = parseInt(newInput.h) || 0
                      const s = parseInt(newInput.s) || 0
                      const l = parseInt(newInput.l) || 0
                      updateFromHsl(h, s, l)
                    }}
                    className="w-full rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* HSB */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-text dark:text-text-dark flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                HSB
              </label>
              <CopyButton text={hsbString} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {([
                { key: 'h' as const, label: 'H', max: 360 },
                { key: 's' as const, label: 'S', max: 100 },
                { key: 'b' as const, label: 'B', max: 100 },
              ]).map(({ key, label, max }) => (
                <div key={key}>
                  <label className="text-xs text-text-muted dark:text-text-muted-dark font-medium">
                    {label} <span className="text-text-muted/60">(0-{max})</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={max}
                    value={hsbInput[key]}
                    onChange={(e) => {
                      const newInput = { ...hsbInput, [key]: e.target.value }
                      setHsbInput(newInput)
                      const h = parseInt(newInput.h) || 0
                      const s = parseInt(newInput.s) || 0
                      const b = parseInt(newInput.b) || 0
                      updateFromHsb(h, s, b)
                    }}
                    className="w-full rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* WCAG Contrast Checker */}
      <div>
        <button
          onClick={() => setShowContrast((prev) => !prev)}
          className={`inline-flex items-center gap-2 px-4 py-2.5 border rounded-xl font-medium text-sm transition-all active:scale-[0.98] ${
            showContrast
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border dark:border-border-dark text-text-muted dark:text-text-muted-dark hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark'
          }`}
        >
          <Accessibility className="w-4 h-4" />
          WCAG Contrast Checker
        </button>

        <AnimatePresence>
          {showContrast && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="glass-card rounded-xl p-4 mt-3 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-text-muted dark:text-text-muted-dark mb-1.5">
                      Background Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={bgHex}
                        onChange={(e) => setBgHex(e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-border dark:border-border-dark"
                      />
                      <input
                        type="text"
                        value={bgHex}
                        onChange={(e) => {
                          setBgHex(e.target.value)
                        }}
                        className="flex-1 rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  {/* Preview */}
                  <div
                    className="w-full sm:w-48 h-20 rounded-xl flex items-center justify-center text-sm font-medium border border-border dark:border-border-dark"
                    style={{ backgroundColor: bgHex, color: color.hex }}
                  >
                    Sample Text
                  </div>
                </div>

                {contrastInfo && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-text dark:text-text-dark">{contrastInfo.ratio}:1</span>
                      <span className="text-sm text-text-muted dark:text-text-muted-dark">contrast ratio</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { label: 'AA Normal', pass: contrastInfo.aaSmall },
                        { label: 'AA Large', pass: contrastInfo.aaLarge },
                        { label: 'AAA Normal', pass: contrastInfo.aaaSmall },
                        { label: 'AAA Large', pass: contrastInfo.aaaLarge },
                      ].map(({ label, pass }) => (
                        <div
                          key={label}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
                            pass
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          }`}
                        >
                          {pass ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Recent Colors */}
      <AnimatePresence>
        {recentColors.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Palette className="w-4 h-4 text-text-muted dark:text-text-muted-dark" />
              <span className="text-xs font-medium text-text-muted dark:text-text-muted-dark uppercase tracking-wider">
                Recent Colors
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentColors.map((hex) => (
                <motion.button
                  key={hex}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateFromHex(hex)}
                  className={`w-9 h-9 rounded-xl border-2 transition-all shadow-sm hover:shadow-md ${
                    color.hex === hex
                      ? 'border-primary ring-2 ring-primary/30'
                      : 'border-border dark:border-border-dark hover:border-primary/50'
                  }`}
                  style={{ backgroundColor: hex }}
                  title={hex}
                />
              ))}
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
            className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3"
          >
            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
