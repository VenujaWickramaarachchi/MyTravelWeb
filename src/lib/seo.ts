import type { Metadata } from 'next'

interface SEOData {
  title?: string | null
  description?: string | null
  canonicalUrl?: string | null
  noIndex?: boolean
  ogTitle?: string | null
  ogDescription?: string | null
  socialImage?: {
    url?: string | null
  } | null
}

export function generateSEO(data: SEOData): Metadata {
  const title = data.title || ''
  const description = data.description || ''

  return {
    title,
    description,

    robots: data.noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,

    alternates: data.canonicalUrl
      ? {
          canonical: data.canonicalUrl,
        }
      : undefined,

    openGraph: {
      title: data.ogTitle || title,
      description: data.ogDescription || description,
      images: data.socialImage?.url
        ? [
            {
              url: data.socialImage.url,
            },
          ]
        : undefined,
    },
  }
}
