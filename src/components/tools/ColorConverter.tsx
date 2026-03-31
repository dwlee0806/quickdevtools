'use client'

import { useState, useCallback } from 'react'
import CopyButton from '@/components/ui/CopyButton'

interface ColorState {
  hex: string
  rgb: { r: number; g: number; b: number }
  hsl: { h: number; s: number; l: number }
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

const initialColor: ColorState = {
  hex: '#6366f1',
  rgb: { r: 99, g: 102, b: 241 },
  hsl: { h: 239, s: 84, l: 67 },
}

export default function ColorConverter() {
  const [color, setColor] = useState<ColorState>(initialColor)
  const [hexInput, setHexInput] = useState(initialColor.hex)
  const [rgbInput, setRgbInput] = useState({ r: '99', g: '102', b: '241' })
  const [hslInput, setHslInput] = useState({ h: '239', s: '84', l: '67' })
  const [error, setError] = useState('')

  const updateFromHex = useCallback((hex: string) => {
    setHexInput(hex)
    const rgb = hexToRgb(hex)
    if (!rgb) {
      setError('Invalid HEX value')
      return
    }
    setError('')
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    setColor({ hex: hex.startsWith('#') ? hex : `#${hex}`, rgb, hsl })
    setRgbInput({ r: String(rgb.r), g: String(rgb.g), b: String(rgb.b) })
    setHslInput({ h: String(hsl.h), s: String(hsl.s), l: String(hsl.l) })
  }, [])

  const updateFromRgb = useCallback((r: number, g: number, b: number) => {
    if ([r, g, b].some((v) => isNaN(v) || v < 0 || v > 255)) {
      setError('RGB values must be 0-255')
      return
    }
    setError('')
    const hex = rgbToHex(r, g, b)
    const hsl = rgbToHsl(r, g, b)
    setColor({ hex, rgb: { r, g, b }, hsl })
    setHexInput(hex)
    setHslInput({ h: String(hsl.h), s: String(hsl.s), l: String(hsl.l) })
  }, [])

  const updateFromHsl = useCallback((h: number, s: number, l: number) => {
    if (isNaN(h) || h < 0 || h > 360 || isNaN(s) || s < 0 || s > 100 || isNaN(l) || l < 0 || l > 100) {
      setError('HSL values: H(0-360), S(0-100), L(0-100)')
      return
    }
    setError('')
    const rgb = hslToRgb(h, s, l)
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
    setColor({ hex, rgb, hsl: { h, s, l } })
    setHexInput(hex)
    setRgbInput({ r: String(rgb.r), g: String(rgb.g), b: String(rgb.b) })
  }, [])

  const handleColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFromHex(e.target.value)
  }

  const hexString = color.hex.toUpperCase()
  const rgbString = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`
  const hslString = `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`

  return (
    <div className="space-y-6">
      {/* Color Preview & Picker */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-40 h-40 rounded-2xl border-2 border-border dark:border-border-dark shadow-inner"
            style={{ backgroundColor: color.hex }}
          />
          <label className="relative cursor-pointer">
            <input
              type="color"
              value={color.hex}
              onChange={handleColorPicker}
              className="w-20 h-10 rounded-lg cursor-pointer"
            />
            <span className="block text-xs text-text-muted dark:text-text-muted-dark text-center mt-1">
              Pick a color
            </span>
          </label>
        </div>

        {/* Format Inputs */}
        <div className="flex-1 space-y-4">
          {/* HEX */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-text dark:text-text-dark">HEX</label>
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
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-text dark:text-text-dark">RGB</label>
              <CopyButton text={rgbString} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['r', 'g', 'b'] as const).map((channel) => (
                <div key={channel}>
                  <label className="text-xs text-text-muted dark:text-text-muted-dark uppercase">{channel}</label>
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
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-text dark:text-text-dark">HSL</label>
              <CopyButton text={hslString} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {([
                { key: 'h' as const, label: 'H', max: 360 },
                { key: 's' as const, label: 'S', max: 100 },
                { key: 'l' as const, label: 'L', max: 100 },
              ]).map(({ key, label, max }) => (
                <div key={key}>
                  <label className="text-xs text-text-muted dark:text-text-muted-dark">
                    {label}{key === 'h' ? '(0-360)' : '(0-100)'}
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
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}
    </div>
  )
}
