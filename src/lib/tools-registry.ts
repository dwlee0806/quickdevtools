import { ToolMeta } from '@/types/tools'

export const tools: ToolMeta[] = [
  // Developer Tools
  {
    slug: 'json-formatter',
    category: 'developer',
    name: 'JSON Formatter & Validator',
    description: 'Format, beautify, and validate JSON data instantly. Supports minification, tree view, and syntax highlighting.',
    keywords: ['json formatter', 'json beautifier', 'json validator', 'json viewer', 'json pretty print'],
    icon: '{ }',
  },
  {
    slug: 'base64-encoder-decoder',
    category: 'developer',
    name: 'Base64 Encode / Decode',
    description: 'Encode text to Base64 or decode Base64 strings back to plain text. Supports UTF-8 and binary data.',
    keywords: ['base64 encode', 'base64 decode', 'base64 converter', 'base64 online'],
    icon: 'B64',
  },
  {
    slug: 'url-encoder-decoder',
    category: 'developer',
    name: 'URL Encode / Decode',
    description: 'Encode or decode URLs and query strings. Handles special characters and Unicode.',
    keywords: ['url encode', 'url decode', 'percent encoding', 'uri encode'],
    icon: '%20',
  },
  {
    slug: 'jwt-decoder',
    category: 'developer',
    name: 'JWT Decoder',
    description: 'Decode and inspect JSON Web Tokens. View header, payload, and expiration details without a secret key.',
    keywords: ['jwt decoder', 'jwt parser', 'jwt viewer', 'json web token'],
    icon: 'JWT',
  },
  {
    slug: 'uuid-generator',
    category: 'developer',
    name: 'UUID Generator',
    description: 'Generate random UUIDs (v4) instantly. Copy single or bulk UUIDs for your projects.',
    keywords: ['uuid generator', 'guid generator', 'random uuid', 'uuid v4'],
    icon: 'ID',
  },
  {
    slug: 'hash-generator',
    category: 'developer',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text input. Compare hashes instantly.',
    keywords: ['hash generator', 'md5 hash', 'sha256', 'sha512', 'checksum'],
    icon: '#',
  },
  // Color & Design Tools
  {
    slug: 'color-converter',
    category: 'color',
    name: 'Color Converter',
    description: 'Convert colors between HEX, RGB, HSL, and HSB formats. Pick colors visually with an interactive color picker.',
    keywords: ['color converter', 'hex to rgb', 'rgb to hex', 'color picker', 'hsl converter'],
    icon: '🎨',
  },
  {
    slug: 'color-palette-generator',
    category: 'color',
    name: 'Color Palette Generator',
    description: 'Generate beautiful color palettes with harmonious color schemes. Export as CSS, Tailwind, or image.',
    keywords: ['color palette', 'color scheme generator', 'color harmony', 'palette generator'],
    icon: '🎭',
  },
  {
    slug: 'css-gradient-generator',
    category: 'color',
    name: 'CSS Gradient Generator',
    description: 'Create beautiful CSS gradients visually. Copy the generated CSS code for linear and radial gradients.',
    keywords: ['css gradient', 'gradient generator', 'linear gradient', 'radial gradient', 'css background'],
    icon: '🌈',
  },
  // Text Tools
  {
    slug: 'word-counter',
    category: 'text',
    name: 'Word & Character Counter',
    description: 'Count words, characters, sentences, and paragraphs in your text. Estimate reading and speaking time.',
    keywords: ['word counter', 'character counter', 'letter counter', 'text length', 'reading time'],
    icon: '123',
  },
  {
    slug: 'case-converter',
    category: 'text',
    name: 'Case Converter',
    description: 'Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more.',
    keywords: ['case converter', 'uppercase', 'lowercase', 'title case', 'camelcase', 'snake case'],
    icon: 'Aa',
  },
  {
    slug: 'lorem-ipsum-generator',
    category: 'text',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text in paragraphs, sentences, or words. Perfect for mockups and design.',
    keywords: ['lorem ipsum', 'placeholder text', 'dummy text', 'lipsum generator'],
    icon: 'Li',
  },
  // Converter Tools
  {
    slug: 'image-converter',
    category: 'converter',
    name: 'Image Format Converter',
    description: 'Convert images between PNG, JPG, WebP, and more formats. All processing happens in your browser.',
    keywords: ['image converter', 'png to jpg', 'jpg to png', 'webp converter', 'image format'],
    icon: '🖼️',
  },
  {
    slug: 'csv-json-converter',
    category: 'converter',
    name: 'CSV ↔ JSON Converter',
    description: 'Convert CSV data to JSON and JSON arrays to CSV format. Handles headers and nested data.',
    keywords: ['csv to json', 'json to csv', 'csv converter', 'data converter'],
    icon: '📊',
  },
  {
    slug: 'unix-timestamp-converter',
    category: 'converter',
    name: 'Unix Timestamp Converter',
    description: 'Convert Unix timestamps to human-readable dates and vice versa. Supports seconds and milliseconds.',
    keywords: ['unix timestamp', 'epoch converter', 'timestamp to date', 'date to timestamp'],
    icon: '⏱️',
  },
]

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return tools.find(t => t.slug === slug)
}

export function getToolsByCategory(category: string): ToolMeta[] {
  return tools.filter(t => t.category === category)
}

export function getRelatedTools(slug: string, limit = 4): ToolMeta[] {
  const tool = getToolBySlug(slug)
  if (!tool) return []
  const sameCat = tools.filter(t => t.category === tool.category && t.slug !== slug)
  const others = tools.filter(t => t.category !== tool.category && t.slug !== slug)
  return [...sameCat, ...others].slice(0, limit)
}
