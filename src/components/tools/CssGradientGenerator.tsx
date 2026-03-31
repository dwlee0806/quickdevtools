'use client'

import { useState, useMemo } from 'react'
import CopyButton from '@/components/ui/CopyButton'

type GradientType = 'linear' | 'radial'

interface GradientState {
  type: GradientType
  color1: string
  color2: string
  angle: number
}

interface PresetGradient {
  name: string
  color1: string
  color2: string
  type: GradientType
  angle: number
}

const presets: PresetGradient[] = [
  { name: 'Sunset', color1: '#f97316', color2: '#ec4899', type: 'linear', angle: 135 },
  { name: 'Ocean', color1: '#06b6d4', color2: '#3b82f6', type: 'linear', angle: 135 },
  { name: 'Forest', color1: '#22c55e', color2: '#14b8a6', type: 'linear', angle: 135 },
  { name: 'Purple Haze', color1: '#8b5cf6', color2: '#ec4899', type: 'linear', angle: 135 },
  { name: 'Night Sky', color1: '#1e3a8a', color2: '#7c3aed', type: 'linear', angle: 180 },
  { name: 'Warm Glow', color1: '#f59e0b', color2: '#ef4444', type: 'radial', angle: 0 },
  { name: 'Mint Fresh', color1: '#a7f3d0', color2: '#6ee7b7', type: 'linear', angle: 90 },
  { name: 'Peach', color1: '#fecaca', color2: '#fbbf24', type: 'linear', angle: 45 },
]

export default function CssGradientGenerator() {
  const [gradient, setGradient] = useState<GradientState>({
    type: 'linear',
    color1: '#6366f1',
    color2: '#ec4899',
    angle: 135,
  })

  const cssCode = useMemo(() => {
    if (gradient.type === 'linear') {
      return `background: linear-gradient(${gradient.angle}deg, ${gradient.color1}, ${gradient.color2});`
    }
    return `background: radial-gradient(circle, ${gradient.color1}, ${gradient.color2});`
  }, [gradient])

  const gradientStyle = useMemo(() => {
    if (gradient.type === 'linear') {
      return `linear-gradient(${gradient.angle}deg, ${gradient.color1}, ${gradient.color2})`
    }
    return `radial-gradient(circle, ${gradient.color1}, ${gradient.color2})`
  }, [gradient])

  const applyPreset = (preset: PresetGradient) => {
    setGradient({
      type: preset.type,
      color1: preset.color1,
      color2: preset.color2,
      angle: preset.angle,
    })
  }

  return (
    <div className="space-y-6">
      {/* Gradient Preview */}
      <div
        className="w-full h-48 sm:h-64 rounded-2xl border border-border dark:border-border-dark"
        style={{ background: gradientStyle }}
      />

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Left Column: Type & Colors */}
        <div className="space-y-4">
          {/* Gradient Type */}
          <div>
            <label className="block text-sm font-medium text-text dark:text-text-dark mb-1.5">
              Gradient Type
            </label>
            <div className="flex gap-2">
              {(['linear', 'radial'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setGradient((prev) => ({ ...prev, type }))}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors capitalize ${
                    gradient.type === type
                      ? 'bg-primary text-white'
                      : 'border border-border dark:border-border-dark text-text-muted dark:text-text-muted-dark hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Color Pickers */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text dark:text-text-dark mb-1.5">
                Start Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={gradient.color1}
                  onChange={(e) => setGradient((prev) => ({ ...prev, color1: e.target.value }))}
                  className="w-10 h-10 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={gradient.color1}
                  onChange={(e) => {
                    const val = e.target.value
                    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
                      setGradient((prev) => ({ ...prev, color1: val }))
                    }
                  }}
                  className="flex-1 rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text dark:text-text-dark mb-1.5">
                End Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={gradient.color2}
                  onChange={(e) => setGradient((prev) => ({ ...prev, color2: e.target.value }))}
                  className="w-10 h-10 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={gradient.color2}
                  onChange={(e) => {
                    const val = e.target.value
                    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
                      setGradient((prev) => ({ ...prev, color2: val }))
                    }
                  }}
                  className="flex-1 rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
          </div>

          {/* Angle Slider */}
          {gradient.type === 'linear' && (
            <div>
              <label className="block text-sm font-medium text-text dark:text-text-dark mb-1.5">
                Angle: {gradient.angle}deg
              </label>
              <input
                type="range"
                min={0}
                max={360}
                value={gradient.angle}
                onChange={(e) => setGradient((prev) => ({ ...prev, angle: Number(e.target.value) }))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-text-muted dark:text-text-muted-dark">
                <span>0deg</span>
                <span>180deg</span>
                <span>360deg</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Presets */}
        <div>
          <label className="block text-sm font-medium text-text dark:text-text-dark mb-1.5">
            Presets
          </label>
          <div className="grid grid-cols-2 gap-2">
            {presets.map((preset) => {
              const bg = preset.type === 'linear'
                ? `linear-gradient(${preset.angle}deg, ${preset.color1}, ${preset.color2})`
                : `radial-gradient(circle, ${preset.color1}, ${preset.color2})`
              return (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="rounded-lg overflow-hidden border border-border dark:border-border-dark hover:border-primary/50 transition-colors"
                >
                  <div className="h-10" style={{ background: bg }} />
                  <div className="px-2 py-1 text-xs text-text-muted dark:text-text-muted-dark text-center">
                    {preset.name}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Generated CSS */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm font-medium text-text dark:text-text-dark">CSS Code</label>
          <CopyButton text={cssCode} />
        </div>
        <div className="rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark p-3">
          <code className="font-mono text-sm text-text dark:text-text-dark break-all">
            {cssCode}
          </code>
        </div>
      </div>
    </div>
  )
}
