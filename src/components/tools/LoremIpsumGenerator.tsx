'use client'

import { useState, useCallback } from 'react'
import CopyButton from '@/components/ui/CopyButton'

type GenerateType = 'paragraphs' | 'sentences' | 'words'

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis', 'unde',
  'omnis', 'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque',
  'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo',
  'inventore', 'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta',
  'explicabo', 'nemo', 'ipsam', 'voluptas', 'aspernatur', 'aut', 'odit',
  'fugit', 'consequuntur', 'magni', 'dolores', 'eos', 'ratione', 'sequi',
  'nesciunt', 'neque', 'porro', 'quisquam', 'dolorem', 'adipisci', 'numquam',
  'eius', 'modi', 'tempora', 'magnam', 'aliquam', 'quaerat', 'minima',
  'nostrum', 'exercitationem', 'ullam', 'corporis', 'suscipit', 'laboriosam',
  'aliquid', 'commodi', 'consequatur', 'autem', 'vel', 'eum', 'iure',
  'quam', 'nihil', 'molestiae', 'illum', 'quo', 'voluptas', 'assumenda',
  'repudiandae', 'temporibus', 'quibusdam', 'officiis', 'debitis',
  'rerum', 'necessitatibus', 'saepe', 'eveniet', 'voluptates', 'repudiandae',
  'recusandae', 'itaque', 'earum', 'hic', 'tenetur', 'sapiente', 'delectus',
  'reiciendis', 'voluptatibus', 'maiores', 'alias', 'perferendis', 'doloribus',
  'asperiores', 'repellat', 'provident', 'similique', 'mollitia', 'animi',
]

const LOREM_START = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

function getRandomWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]
}

function generateSentence(): string {
  const length = 8 + Math.floor(Math.random() * 12)
  const words = Array.from({ length }, () => getRandomWord())
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  return words.join(' ') + '.'
}

function generateParagraph(): string {
  const sentenceCount = 4 + Math.floor(Math.random() * 5)
  return Array.from({ length: sentenceCount }, () => generateSentence()).join(' ')
}

export default function LoremIpsumGenerator() {
  const [type, setType] = useState<GenerateType>('paragraphs')
  const [count, setCount] = useState(3)
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [output, setOutput] = useState('')

  const handleGenerate = useCallback(() => {
    let result = ''

    if (type === 'words') {
      const words = Array.from({ length: count }, () => getRandomWord())
      if (startWithLorem && count >= 2) {
        words[0] = 'lorem'
        words[1] = count > 1 ? 'ipsum' : words[1]
      }
      result = words.join(' ')
    } else if (type === 'sentences') {
      const sentences = Array.from({ length: count }, () => generateSentence())
      if (startWithLorem && count >= 1) {
        sentences[0] = LOREM_START
      }
      result = sentences.join(' ')
    } else {
      const paragraphs = Array.from({ length: count }, () => generateParagraph())
      if (startWithLorem && count >= 1) {
        paragraphs[0] = LOREM_START + ' ' + paragraphs[0]
      }
      result = paragraphs.join('\n\n')
    }

    setOutput(result)
  }, [type, count, startWithLorem])

  const types: { value: GenerateType; label: string }[] = [
    { value: 'paragraphs', label: 'Paragraphs' },
    { value: 'sentences', label: 'Sentences' },
    { value: 'words', label: 'Words' },
  ]

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Type Selector */}
        <div className="flex gap-2">
          {types.map((t) => (
            <button
              key={t.value}
              onClick={() => setType(t.value)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                type === t.value
                  ? 'bg-primary text-white'
                  : 'border border-border dark:border-border-dark text-text-muted dark:text-text-muted-dark hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Count Input */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-text-muted dark:text-text-muted-dark">Count:</label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
            className="w-20 rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Start with Lorem checkbox */}
        <label className="flex items-center gap-2 text-sm text-text dark:text-text-dark cursor-pointer select-none">
          <input
            type="checkbox"
            checked={startWithLorem}
            onChange={(e) => setStartWithLorem(e.target.checked)}
            className="rounded border-border dark:border-border-dark accent-primary w-4 h-4"
          />
          Start with &quot;Lorem ipsum...&quot;
        </label>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark transition-colors font-medium text-sm"
        >
          Generate
        </button>
      </div>

      {/* Output */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text dark:text-text-dark">
              Generated Text
            </label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            className="tool-textarea custom-scrollbar w-full h-64 rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-secondary-dark text-text dark:text-text-dark p-3 font-mono text-sm resize-y focus:outline-none"
          />
        </div>
      )}
    </div>
  )
}
