import { getFAQs } from '@/lib/wordpress'

import FAQItem from '@/components/content/FAQ/FAQItem'
import FAQListSchema from '@/components/SEO/FAQListSchema'

import { generateSEO } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEO({
    seoTitle: 'Frequently Asked Questions | Viora Lanka',
    metaDescription:
      'Find answers to common questions about travelling to Sri Lanka, including the best time to visit, destinations, tours and travel planning.',
    canonicalUrl: 'https://vioralanka.com/faqs',
  })
}

export default async function FAQsPage() {
  const faqs = await getFAQs()

  return (
    <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12'>
      <FAQListSchema faqs={faqs} />

      <header className='space-y-3 text-center'>
        <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep'>
          Planning Assistance
        </p>
        <h1 className='font-serif text-4xl sm:text-5xl font-normal text-ink tracking-tight'>
          Frequently Asked Questions
        </h1>
        <p className='text-base sm:text-lg text-ink/75 leading-relaxed pt-2 max-w-2xl mx-auto'>
          Find clear answers to essential questions about Sri Lanka entry rules, best seasons,
          travel logistics, safety, visa requirements, and private tour planning.
        </p>
      </header>

      <section className='space-y-5'>
        {faqs.length === 0 ? (
          <div className='p-12 text-center rounded border border-line bg-ivory/50 space-y-2'>
            <h2 className='font-serif text-xl font-medium text-ink'>No FAQs available</h2>
            <p className='text-sm text-ink/70'>We are updating our travel FAQ guide. Please contact our team directly with any questions.</p>
          </div>
        ) : (
          faqs.map((faq) => <FAQItem key={faq.id} faq={faq} />)
        )}
      </section>
    </main>
  )
}
