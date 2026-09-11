import { getFAQs } from '@/lib/api/faq'
import { getFAQCategories } from '@/lib/api/taxonomy'
import { filterFAQs } from '@/lib/filters/faq-filters'

import FAQFilters from '@/components/entities/FAQs/FAQFilters'
import FAQResults from '@/components/entities/FAQs/FAQResults'
import FAQListSchema from '@/components/SEO/FAQListSchema'

import { generateSEO } from '@/lib/seo'

import type { FAQFilterParams } from '@/types/filter-types'

export async function generateMetadata() {
  return generateSEO({
    seoTitle: 'Frequently Asked Questions | Viora Lanka',
    metaDescription:
      'Find answers to common questions about travelling to Sri Lanka, including the best time to visit, destinations, tours and travel planning.',
    canonicalUrl: 'https://vioralanka.com/faqs',
  })
}

interface FAQsPageProps {
  searchParams: Promise<FAQFilterParams>
}

export default async function FAQsPage({
  searchParams,
}: FAQsPageProps) {
  const filters = await searchParams

  const [faqs, faqCategories] = await Promise.all([
    getFAQs(),
    getFAQCategories().catch(() => []),
  ])

  const filteredFAQs = filterFAQs(faqs, filters)

  const initialFAQs = filteredFAQs.slice(0, 12)

  const total = filteredFAQs.length
  const totalPages = Math.ceil(total / 12)

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <FAQListSchema faqs={filteredFAQs} />

      <header className="space-y-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep">
          Planning Assistance
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-ink tracking-tight">
          Frequently Asked Questions
        </h1>

        <p className="text-base sm:text-lg text-ink/75 leading-relaxed pt-2 max-w-2xl mx-auto">
          Find clear answers to essential questions about Sri Lanka entry rules,
          best seasons, travel logistics, safety, visa requirements, and private
          tour planning.
        </p>
      </header>

      <FAQFilters
        filters={filters}
        faqCategories={faqCategories}
      />

      <FAQResults
        initialFAQs={initialFAQs}
        initialTotal={total}
        initialTotalPages={totalPages}
        filters={filters}
      />
    </main>
  )
}