import { notFound } from 'next/navigation'
import { getFAQ } from '@/lib/wordpress'

import FAQQuestion from '@/components/FAQs/FAQQuestion'
import FAQAnswer from '@/components/FAQs/FAQAnswer'
import FAQRelatedContent from '@/components/FAQs/FAQRelatedContent'

import BreadcrumbSchema from '@/components/SEO/BreadCrumbSchema'
import { createBreadcrumbs } from '@/lib/breadcrumbs'

import { generateSEO } from '@/lib/seo'

import FAQSchema from '@/components/SEO/FAQSchema'

interface FAQPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: FAQPageProps) {
  const { slug } = await params

  const faq = await getFAQ(slug)

  if (!faq) {
    return {}
  }

  return generateSEO({
    title: faq.seoTitle || faq.title,
    description: faq.metaDescription,
    canonicalUrl: faq.canonicalUrl,
    noIndex: faq.noIndex,
    ogTitle: faq.ogTitle,
    ogDescription: faq.ogDescription,
    socialImage: faq.socialImage,
  })
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { slug } = await params

  const faq = await getFAQ(slug)

  if (!faq) {
    notFound()
  }

  return (
    <main>
      <BreadcrumbSchema
        items={createBreadcrumbs(
          'FAQs',
          'faqs',
          faq.breadcrumbLabel || faq.question || faq.title,
        )}
      />

      <FAQSchema faq={faq} />

      <FAQQuestion faq={faq} />

      <FAQAnswer faq={faq} />

      <FAQRelatedContent faq={faq} />
    </main>
  )
}
