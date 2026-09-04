import { fetchAPI } from './core/fetch-api'
import { fetchByIds } from './core/fetch-by-ids'

import { transformAccommodation } from '../transformers/accommodation'
import { transformDestination } from '../transformers/destination'

import { Accommodation } from '@/types/accommodation'

import { AccommodationPage } from '@/types/pages/accommodation-page'

export async function getAccommodations(): Promise<Accommodation[]> {
  const accommodations = await fetchAPI('accommodation?_embed')

  return accommodations.map(transformAccommodation)
}

export async function getAccommodation(
  slug: string,
): Promise<AccommodationPage | null> {
  const url =
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}` +
    `/wp-json/wp/v2/accommodation?slug=${slug}&_embed`

  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching accommodation: ${slug}`)
  }

  const data = await res.json()
  const accommodation = data[0]

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
}
