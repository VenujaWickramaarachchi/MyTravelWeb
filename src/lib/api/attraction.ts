import { fetchAPI } from './core/fetch-api'
import { fetchByIds } from './core/fetch-by-ids'

import { transformAttraction } from '../transformers/attraction'
import { transformDestination } from '../transformers/destination'
import { transformExperience } from '../transformers/experience'
import { transformTour } from '../transformers/tour'

import { Attraction } from '@/types/attraction'
import { AttractionPage } from '@/types/pages/attraction-page'

export async function getAttractions(): Promise<Attraction[]> {
  const attractions = await fetchAPI(
    'attraction?per_page=100&_embed',
  )

  return (Array.isArray(attractions) ? attractions : []).map(
    transformAttraction,
  )
}

export async function getAttraction(
  slug: string,
): Promise<AttractionPage | null> {
  try {
    const data = await fetchAPI(`attraction?slug=${slug}&_embed`)
    const attraction = Array.isArray(data) ? data[0] : null

    if (!attraction) {
      return null
    }

    const attractionData = transformAttraction(attraction)

  // Destination
  // Destination
  const destination = attractionData.destination
    ? await fetchByIds('destination', [attractionData.destination]).then(
      (items) => (items.length > 0 ? transformDestination(items[0]) : null),
    )
    : null

  // Related Experiences
  const relatedExperiences = attractionData.relatedExperiences.length
    ? await fetchByIds('experience', attractionData.relatedExperiences).then(
      (items) => items.map(transformExperience),
    )
    : []

  // Nearby Attractions
  const nearbyAttractions = attractionData.nearbyAttractions.length
    ? await fetchByIds('attraction', attractionData.nearbyAttractions).then(
      (items) => items.map(transformAttraction),
    )
    : []

  // Related Tours
  const relatedTours = attractionData.relatedTours.length
    ? await fetchByIds('tour', attractionData.relatedTours).then((items) =>
      items.map(transformTour),
    )
    : []

  return {
    ...attractionData,

    relationships: {
      destination,
      relatedExperiences,
      nearbyAttractions,
      relatedTours,
    },
  }
} catch (error) {
  console.warn(`[getAttraction] Error fetching attraction ${slug}:`, error)
  return null
}
}
