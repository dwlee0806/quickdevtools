'use client'

import dynamic from 'next/dynamic'

const toolComponents: Record<string, React.ComponentType> = {
  'json-formatter': dynamic(() => import('./JsonFormatter')),
  'base64-encoder-decoder': dynamic(() => import('./Base64Tool')),
  'url-encoder-decoder': dynamic(() => import('./UrlEncoderDecoder')),
  'jwt-decoder': dynamic(() => import('./JwtDecoder')),
  'uuid-generator': dynamic(() => import('./UuidGenerator')),
  'hash-generator': dynamic(() => import('./HashGenerator')),
  'color-converter': dynamic(() => import('./ColorConverter')),
  'color-palette-generator': dynamic(() => import('./ColorPaletteGenerator')),
  'css-gradient-generator': dynamic(() => import('./CssGradientGenerator')),
  'word-counter': dynamic(() => import('./WordCounter')),
  'case-converter': dynamic(() => import('./CaseConverter')),
  'lorem-ipsum-generator': dynamic(() => import('./LoremIpsumGenerator')),
  'image-converter': dynamic(() => import('./ImageConverter')),
  'csv-json-converter': dynamic(() => import('./CsvJsonConverter')),
  'unix-timestamp-converter': dynamic(() => import('./UnixTimestampConverter')),
}

export default function ToolRenderer({ slug }: { slug: string }) {
  const Component = toolComponents[slug]
  if (!Component) return <p className="text-text-muted">Tool not found</p>
  return <Component />
}
