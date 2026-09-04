import { fetchAPI } from './core/fetch-api'
import { fetchByIds } from './core/fetch-by-ids'

import { transformTravelGuide } from '../transformers/travel-guide'
import { transformDestination } from '../transformers/destination'
import { transformExperience } from '../transformers/experience'
import { transformTour } from '../transformers/tour'
import { transformItinerary } from '../transformers/itinerary'

import { TravelGuide } from '@/types/travel-guide'

import { TravelGuidePage } from '@/types/pages/travel-guide-page'

export async function getTravelGuides(): Promise<TravelGuide[]> {
  const travelGuides = await fetchAPI('travel-guide?_embed')

  return travelGuides.map(transformTravelGuide)
}

export async function getTravelGuide(
  slug: string,
): Promise<TravelGuidePage | null> {
  const url =
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}` +
    `/wp-json/wp/v2/travel-guide?slug=${slug}&_embed`

  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching travel guide: ${slug}`)
  }

  const data = await res.json()
  const travelGuide = data[0]

  if (!travelGuide) {
    return null
  }

  const travelGuideData = transformTravelGuide(travelGuide)

  const [
    relatedDestinations,
    relatedExperiences,
    relatedTours,
    relatedItineraries,
  ] = await Promise.all([
    travelGuideData.relatedDestinations.length
      ? fetchByIds('destination', travelGuideData.relatedDestinations).then(
          (items) => items.map(transformDestination),
        )
      : Promise.resolve([]),

    travelGuideData.relatedExperiences.length
      ? fetchByIds('experience', travelGuideData.relatedExperiences).then(
          (items) => items.map(transformExperience),
        )
      : Promise.resolve([]),

    travelGuideData.relatedTours.length
      ? fetchByIds('tour', travelGuideData.relatedTours).then((items) =>
          items.map(transformTour),
        )
      : Promise.resolve([]),

    travelGuideData.relatedItineraries.length
      ? fetchByIds('itinerary', travelGuideData.relatedItineraries).then(
          (items) => items.map(transformItinerary),
        )
      : Promise.resolve([]),
  ])

  return {
    ...travelGuideData,

    relationships: {
      relatedDestinations,
      relatedExperiences,
      relatedTours,
      relatedItineraries,
    },
  }
}
