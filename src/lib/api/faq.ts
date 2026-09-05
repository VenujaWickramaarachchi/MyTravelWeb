import { fetchAPI } from './core/fetch-api'
import { fetchByIds } from './core/fetch-by-ids'

import { transformFAQ } from '../transformers/faq'
import { transformTour } from '../transformers/tour'
import { transformDestination } from '../transformers/destination'
import { transformExperience } from '../transformers/experience'

import { FAQ } from '@/types/faq'

export async function getFAQs(): Promise<FAQ[]> {
  const faqs = await fetchAPI('faq?_embed')

  return faqs.map(transformFAQ)
}

export async function getFAQ(slug: string) {
  const url =
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}` +
    `/wp-json/wp/v2/faq?slug=${slug}&_embed`

  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching FAQ: ${slug}`)
  }

  const data = await res.json()
  const faq = data[0]

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
}
