import { fetchAPI } from './core/fetch-api'
import { fetchByIds } from './core/fetch-by-ids'

import { transformFAQ } from '../transformers/faq'
import { transformTour } from '../transformers/tour'
import { transformDestination } from '../transformers/destination'
import { transformExperience } from '../transformers/experience'

import { FAQ } from '@/types/faq'
import { FAQPage } from '@/types/pages/faq-page'

export async function getFAQs(): Promise<FAQ[]> {
  const faqs = await fetchAPI(
    'faq?per_page=100&_embed',
  )

  return (Array.isArray(faqs) ? faqs : []).map(transformFAQ)
}

export async function getFAQ(slug: string): Promise<FAQPage | null> {
  try {
    const data = await fetchAPI(`faq?slug=${slug}&_embed`)
    const faq = Array.isArray(data) ? data[0] : null

    if (!faq) {
      return null
    }

    const faqData = transformFAQ(faq)

  const [relatedTour, relatedDestination, relatedExperience] =
    await Promise.all([
      faqData.relatedTour
        ? fetchByIds('tour', [faqData.relatedTour]).then((items) =>
          items.length > 0 ? transformTour(items[0]) : null,
        )
        : null,

      faqData.relatedDestination
        ? fetchByIds('destination', [faqData.relatedDestination]).then(
          (items) =>
            items.length > 0 ? transformDestination(items[0]) : null,
        )
        : null,

      faqData.relatedExperience
        ? fetchByIds('experience', [faqData.relatedExperience]).then((items) =>
          items.length > 0 ? transformExperience(items[0]) : null,
        )
        : null,
    ])

  return {
    ...faqData,
    relationships: {
      relatedTour,
      relatedDestination,
      relatedExperience,
    },
  }
} catch (error) {
  console.warn(`[getFAQ] Error fetching FAQ ${slug}:`, error)
  return null
}
}
