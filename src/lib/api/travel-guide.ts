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
  const travelGuides = await fetchAPI(
    'travel-guide?per_page=100&_embed',
  )

  return (Array.isArray(travelGuides) ? travelGuides : []).map(
    transformTravelGuide,
  )
}

export async function getTravelGuide(
  slug: string,
): Promise<TravelGuidePage | null> {
  try {
    const data = await fetchAPI(`travel-guide?slug=${slug}&_embed`)
    const travelGuide = Array.isArray(data) ? data[0] : null

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
} catch (error) {
  console.warn(`[getTravelGuide] Error fetching travel guide ${slug}:`, error)
  return null
}
}
