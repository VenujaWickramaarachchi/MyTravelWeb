import { fetchAPI } from './core/fetch-api'
import { fetchByIds } from './core/fetch-by-ids'

import { transformAccommodation } from '../transformers/accommodation'
import { transformDestination } from '../transformers/destination'
import { transformExperience } from '../transformers/experience'
import { transformTour } from '../transformers/tour'
import { transformAttraction } from '../transformers/attraction'

import { DestinationPage } from '@/types/pages/destination-page'

export async function getDestinations() {
  const destinations = await fetchAPI('destination?per_page=100&_embed')

  return destinations.map(transformDestination)
}

export async function getDestination(
  slug: string,
): Promise<DestinationPage | null> {
  const url =
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}` +
    `/wp-json/wp/v2/destination?slug=${slug}&_embed`

  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching destination: ${slug}`)
  }

  const data = await res.json()
  const destination = data[0]

  if (!destination) {
    return null
  }

  const destinationData = transformDestination(destination)

  // Relationship IDs from ACF
  const accommodationIds = destination.acf?.featured_accommodations || []

  const nearbyIds = destination.acf?.nearby_destinations || []

  const tourIds = destination.acf?.related_tours || []

  const experienceIds = destination.acf?.experiences || []

  const mainAttractionsIds = destination.acf?.main_attractions || []

  // Fetch relationships
  const [
    accommodations,
    nearbyDestinations,
    relatedTours,
    experiences,
    mainAttractions,
  ] = await Promise.all([
    fetchByIds('accommodation', accommodationIds).then((items) =>
      items.map(transformAccommodation),
    ),

    fetchByIds('destination', nearbyIds).then((items) =>
      items.map(transformDestination),
    ),

    fetchByIds('tour', tourIds).then((items) => items.map(transformTour)),

    fetchByIds('experience', experienceIds).then((items) =>
      items.map(transformExperience),
    ),

    fetchByIds('attraction', mainAttractionsIds).then((items) =>
      items.map(transformAttraction),
    ),
  ])

  return {
    ...destinationData,

    relationships: {
      accommodations,
      nearbyDestinations,
      relatedTours,
      experiences,
      mainAttractions,
    },
  }
}
