import { fetchAPI } from './core/fetch-api'
import { fetchByIds } from './core/fetch-by-ids'

import { transformAccommodation } from '../transformers/accommodation'
import { transformDestination } from '../transformers/destination'
import { transformExperience } from '../transformers/experience'
import { transformTour } from '../transformers/tour'
import { transformAttraction } from '../transformers/attraction'

import { DestinationPage } from '@/types/pages/destination-page'

function getPostObjectIds(value: any): number[] {
  if (!value) {
    return []
  }

  const items = Array.isArray(value) ? value : [value]

  return items
    .map((item: any) =>
      typeof item === 'number' ? item : (item?.ID ?? item?.id ?? null),
    )
    .filter((id: number | null): id is number => id !== null)
}

export async function getDestinations() {
  const destinations = await fetchAPI(
    'destination?per_page=100&_embed',
  )

  return (Array.isArray(destinations) ? destinations : []).map(
    transformDestination,
  )
}

export async function getDestinationTypes() {
  const destinations = await getDestinations()

  const types = destinations.flatMap(
    (destination: any) => destination.destinationType || [],
  )

  return Array.from(
    new Set(
      types
        .map((type: unknown) => String(type).trim())
        .filter(Boolean),
    ),
  ).map((type) => ({
    name: type,
    value: type,
  }))
}

export async function getDestination(
  slug: string,
): Promise<DestinationPage | null> {
  try {
    const data = await fetchAPI(`destination?slug=${slug}&_embed`)
    const destination = Array.isArray(data) ? data[0] : null

    if (!destination) {
      return null
    }

    const destinationData = transformDestination(destination)

    // ACF Post Object relationships
    const accommodationIds = getPostObjectIds(
      destination.acf?.featured_accommodations,
    )

    const nearbyIds = getPostObjectIds(destination.acf?.nearby_destinations)

    const tourIds = getPostObjectIds(destination.acf?.related_tours)

    const experienceIds = getPostObjectIds(destination.acf?.experiences)

    const mainAttractionIds = getPostObjectIds(destination.acf?.main_attractions)

    // Fetch relationships
    const [
      accommodations,
      nearbyDestinations,
      allToursRaw,
      experiences,
      relatedAttractions,
    ] = await Promise.all([
      fetchByIds('accommodation', accommodationIds).then((items) =>
        items.map(transformAccommodation),
      ),

      fetchByIds('destination', nearbyIds).then((items) =>
        items.map(transformDestination),
      ),

      fetchAPI('tour?per_page=100&_embed').catch(() => []),

      fetchByIds('experience', experienceIds).then((items) =>
        items.map(transformExperience),
      ),

      fetchByIds('attraction', mainAttractionIds).then((items) =>
        items.map(transformAttraction),
      ),
    ])

    // In tours, related destinations are posted in tour.acf.destinations.
    // Find all tours that feature this destination ID, or are explicitly linked in destination.acf.related_tours.
    const matchingTours = (Array.isArray(allToursRaw) ? allToursRaw : [])
      .filter((tourItem: any) => {
        const tourDestIds = getPostObjectIds(tourItem.acf?.destinations)
        return (
          tourDestIds.includes(destination.id) ||
          tourIds.includes(tourItem.id)
        )
      })
      .map(transformTour)

    let relatedTours = matchingTours
    if (tourIds.length > 0) {
      const existingTourIds = new Set(relatedTours.map((t) => t.id))
      const missingTourIds = tourIds.filter((id) => !existingTourIds.has(id))
      if (missingTourIds.length > 0) {
        const extraTours = await fetchByIds('tour', missingTourIds).then((items) =>
          items.map(transformTour),
        )
        relatedTours = [...relatedTours, ...extraTours]
      }
    }

    return {
      ...destinationData,

      relationships: {
        accommodations,
        nearbyDestinations,
        relatedTours,
        experiences,
        mainAttractions: relatedAttractions,
      },
    }
  } catch (error) {
    console.warn(`[getDestination] Error fetching destination ${slug}:`, error)
    return null
  }
}
