import { notFound } from 'next/navigation'
import { getFAQ } from '@/lib/wordpress'

import FAQQuestion from '@/components/FAQs/FAQQuestion'
import FAQAnswer from '@/components/FAQs/FAQAnswer'
import FAQRelatedContent from '@/components/FAQs/FAQRelatedContent'

import Breadcrumbs from '@/components/Shared/Breadcrumbs'
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
    seoTitle: faq.seoTitle || faq.title,
    metaDescription: faq.metaDescription,
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

  const breadcrumbs = createBreadcrumbs(
    'FAQs',
    'faqs',
    faq.breadcrumbLabel || faq.question || faq.title,
  )

  return (
    <main className="min-h-screen bg-paper pb-24">
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faq={faq} />

      <div className="max-w-4xl mx-auto px-6 pt-10">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-12">
        <FAQQuestion faq={faq} />
        <FAQAnswer faq={faq} />
        <FAQRelatedContent faq={faq} />
      </div>
    </main>
  )
}
