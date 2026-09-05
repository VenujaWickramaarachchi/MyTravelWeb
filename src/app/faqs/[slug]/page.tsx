import { notFound } from 'next/navigation'
import { getFAQ } from '@/lib/wordpress'

import FAQQuestion from '@/components/FAQs/FAQQuestion'
import FAQAnswer from '@/components/FAQs/FAQAnswer'
import FAQRelatedContent from '@/components/FAQs/FAQRelatedContent'

interface FAQPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { slug } = await params

  const faq = await getFAQ(slug)

  if (!faq) {
    notFound()
  }

  return (
    <main>
      <FAQQuestion faq={faq} />

      <FAQAnswer faq={faq} />

      <FAQRelatedContent faq={faq} />
    </main>
  )
}
