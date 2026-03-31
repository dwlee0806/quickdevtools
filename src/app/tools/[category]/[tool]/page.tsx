import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { tools, getToolBySlug } from '@/lib/tools-registry'
import ToolLayout from '@/components/tools/ToolLayout'
import ToolRenderer from '@/components/tools/ToolRenderer'

interface PageProps {
  params: Promise<{ category: string; tool: string }>
}

export async function generateStaticParams() {
  return tools.map(t => ({
    category: t.category,
    tool: t.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tool: slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) return {}

  return {
    title: `${tool.name} - Free Online Tool`,
    description: tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: `${tool.name} | QuickDevTools`,
      description: tool.description,
      type: 'website',
    },
  }
}

export default async function ToolPage({ params }: PageProps) {
  const { tool: slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  return (
    <ToolLayout tool={tool}>
      <ToolRenderer slug={tool.slug} />
    </ToolLayout>
  )
}
