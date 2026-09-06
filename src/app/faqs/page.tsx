import { getFAQs } from '@/lib/wordpress'

import FAQItem from '@/components/content/FAQ/FAQItem'
import FAQListSchema from '@/components/SEO/FAQListSchema'

import { generateSEO } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEO({
    title: 'Frequently Asked Questions | Viora Lanka',
    description:
      'Find answers to common questions about travelling to Sri Lanka, including the best time to visit, destinations, tours and travel planning.',
    canonicalUrl: 'https://vioralanka.com/faqs',
  })
}

export default async function FAQsPage() {
  const faqs = await getFAQs()

  return (
    <main>
      <FAQListSchema faqs={faqs} />

      <h1>Frequently Asked Questions</h1>

      <section>
        {faqs.map((faq) => (
          <FAQItem key={faq.id} faq={faq} />
        ))}
      </section>
    </main>
  )
}
