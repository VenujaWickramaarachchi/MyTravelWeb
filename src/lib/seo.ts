import type { Metadata } from 'next'

import type { SEOData } from '@/types/seo'

export function generateSEO(data: SEOData): Metadata {
  const title = data.seoTitle || ''
  const description = data.metaDescription || ''

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
