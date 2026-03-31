'use client'

import { useState, useCallback } from 'react'
import CopyButton from '@/components/ui/CopyButton'

type HarmonyMode = 'random' | 'analogous' | 'complementary' | 'triadic'

interface PaletteColor {
  hex: string
  locked: boolean
}

function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100
  const lNorm = l / 100
  const hue2rgb = (p: number, q: number, t: number) => {
    const tt = t < 0 ? t + 1 : t > 1 ? t - 1 : t
    if (tt < 1 / 6) return p + (q - p) * 6 * tt
    if (tt < 1 / 2) return q
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6
    return p
  }

  let r: number, g: number, b: number
  if (sNorm === 0) {
    r = g = b = lNorm
  } else {
    const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm
    const p = 2 * lNorm - q
    r = hue2rgb(p, q, h / 360 + 1 / 3)
    g = hue2rgb(p, q, h / 360)
    b = hue2rgb(p, q, h / 360 - 1 / 3)
  }

  const toHex = (n: number) => Math.round(Math.min(255, Math.max(0, n * 255))).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function randomHue(): number {
  return Math.floor(Math.random() * 360)
}

function randomSaturation(): number {
  return 50 + Math.floor(Math.random() * 40)
}

function randomLightness(): number {
  return 35 + Math.floor(Math.random() * 35)
}

function generateRandomPalette(): string[] {
  return Array.from({ length: 5 }, () =>
    hslToHex(randomHue(), randomSaturation(), randomLightness())
  )
}

function generateAnalogousPalette(): string[] {
  const baseHue = randomHue()
  const s = randomSaturation()
  return Array.from({ length: 5 }, (_, i) => {
    const offset = (i - 2) * 25
    const h = (baseHue + offset + 360) % 360
    const l = 35 + i * 8
    return hslToHex(h, s, l)
  })
}

function generateComplementaryPalette(): string[] {
  const baseHue = randomHue()
  const compHue = (baseHue + 180) % 360
  const s = randomSaturation()
  return [
    hslToHex(baseHue, s, 35),
    hslToHex(baseHue, s, 50),
    hslToHex(baseHue, s - 10, 65),
    hslToHex(compHue, s, 45),
    hslToHex(compHue, s, 60),
  ]
}

function generateTriadicPalette(): string[] {
  const baseHue = randomHue()
  const h2 = (baseHue + 120) % 360
  const h3 = (baseHue + 240) % 360
  const s = randomSaturation()
  return [
    hslToHex(baseHue, s, 40),
    hslToHex(baseHue, s, 60),
    hslToHex(h2, s, 45),
    hslToHex(h3, s, 45),
    hslToHex(h3, s, 65),
  ]
}

const generators: Record<HarmonyMode, () => string[]> = {
  random: generateRandomPalette,
  analogous: generateAnalogousPalette,
  complementary: generateComplementaryPalette,
  triadic: generateTriadicPalette,
}

const initialPalette: PaletteColor[] = [
  { hex: '#6366f1', locked: false },
  { hex: '#8b5cf6', locked: false },
  { hex: '#a78bfa', locked: false },
  { hex: '#c084fc', locked: false },
  { hex: '#e879f9', locked: false },
]

export default function ColorPaletteGenerator() {
  const [palette, setPalette] = useState<PaletteColor[]>(initialPalette)
  const [mode, setMode] = useState<HarmonyMode>('random')

  const handleGenerate = useCallback(() => {
    const newColors = generators[mode]()
    setPalette((prev) =>
      prev.map((color, i) =>
        color.locked ? color : { ...color, hex: newColors[i] }
      )
    )
  }, [mode])

  const toggleLock = useCallback((index: number) => {
    setPalette((prev) =>
      prev.map((color, i) =>
        i === index ? { ...color, locked: !color.locked } : color
      )
    )
  }, [])

  const allHexCodes = palette.map((c) => c.hex.toUpperCase()).join('\n')

  const modes: { value: HarmonyMode; label: string }[] = [
    { value: 'random', label: 'Random' },
    { value: 'analogous', label: 'Analogous' },
    { value: 'complementary', label: 'Complementary' },
    { value: 'triadic', label: 'Triadic' },
  ]

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleGenerate}
          className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark transition-colors font-medium text-sm"
        >
          Generate
        </button>

        <div className="flex items-center gap-2">
          {modes.map((m) => (
            <button
              key={m.value}
              onClick={() => setMode(m.value)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                mode === m.value
                  ? 'bg-primary/10 text-primary'
                  : 'border border-border dark:border-border-dark text-text-muted dark:text-text-muted-dark hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <CopyButton text={allHexCodes} label="Copy All" />
      </div>

      {/* Palette Display */}
      <div className="grid grid-cols-5 gap-3">
        {palette.map((color, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <button
              onClick={() => toggleLock(index)}
              className="w-full aspect-square rounded-xl border-2 transition-all relative group"
              style={{
                backgroundColor: color.hex,
                borderColor: color.locked ? '#f59e0b' : 'transparent',
              }}
              title={color.locked ? 'Click to unlock' : 'Click to lock'}
            >
              {/* Lock icon overlay */}
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {color.locked ? (
                  <svg className="w-6 h-6 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                )}
              </span>
              {/* Small lock indicator */}
              {color.locked && (
                <span className="absolute top-2 right-2">
                  <svg className="w-4 h-4 text-amber-400 drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </button>
            <div className="flex items-center gap-1">
              <span className="font-mono text-xs text-text dark:text-text-dark">
                {color.hex.toUpperCase()}
              </span>
              <CopyButton text={color.hex.toUpperCase()} label="" className="!px-1.5 !py-1" />
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-text-muted dark:text-text-muted-dark text-center">
        Click on a color swatch to lock it, then regenerate to keep locked colors.
      </p>
    </div>
  )
}
