export type ToolCategory = 'developer' | 'color' | 'text' | 'converter'

export interface ToolMeta {
  slug: string
  category: ToolCategory
  name: string
  description: string
  keywords: string[]
  icon: string
}

export const categoryLabels: Record<ToolCategory, string> = {
  developer: 'Developer Tools',
  color: 'Color & Design',
  text: 'Text Tools',
  converter: 'Converters',
}

export const categoryIcons: Record<ToolCategory, string> = {
  developer: '{ }',
  color: '🎨',
  text: 'Aa',
  converter: '⇄',
}
