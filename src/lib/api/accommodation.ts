import { fetchAPI } from './core/fetch-api'
import { fetchByIds } from './core/fetch-by-ids'

import { transformAccommodation } from '../transformers/accommodation'
import { transformDestination } from '../transformers/destination'

import { Accommodation } from '@/types/accommodation'

import { AccommodationPage } from '@/types/pages/accommodation-page'

export async function getAccommodations(): Promise<Accommodation[]> {
  const accommodations = await fetchAPI(
    'accommodation?per_page=100&_embed',
  )

  return (Array.isArray(accommodations) ? accommodations : []).map(
    transformAccommodation,
  )
}

export async function getAccommodation(
  slug: string,
): Promise<AccommodationPage | null> {
  try {
    const data = await fetchAPI(`accommodation?slug=${slug}&_embed`)
    const accommodation = Array.isArray(data) ? data[0] : null

    if (!accommodation) {
      return null
    }

    const accommodationData = transformAccommodation(accommodation)

    const destinationId = accommodationData.destination || null

    const destination = destinationId
      ? await fetchByIds('destination', [destinationId]).then((items) =>
        items.length > 0 ? transformDestination(items[0]) : null,
      )
      : null

    return {
      ...accommodationData,

      relationships: {
        destination,
      },
    }
  } catch (error) {
    console.warn(`[getAccommodation] Error fetching accommodation ${slug}:`, error)
    return null
  }
}
