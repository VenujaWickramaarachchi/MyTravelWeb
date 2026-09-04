import { transformAccommodation } from './transformers/accommodation'
import { transformDestination } from './transformers/destination'
import { transformExperience } from './transformers/experience'
import { transformTour } from './transformers/tour'
import { transformAttraction } from './transformers/attraction'
import { transformItinerary } from './transformers/itinerary'
import { transformItineraryDay } from './transformers/itinerary-day'

import { DestinationPage } from '@/types/pages/destination-page'
import { TourPage } from '@/types/pages/tour-page'
import { ItineraryDay } from '@/types/itinerary-day'

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL

// Generic fetch function
async function fetchAPI(endpoint: string) {
  const res = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/${endpoint}`, {
    next: {
      revalidate: 60,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching ${endpoint}`)
  }

  return res.json()
}
async function fetchByIds(endpoint: string, ids: number[]) {
  if (!ids || ids.length === 0) {
    return []
  }

  return fetchAPI(`${endpoint}?include=${ids.join(',')}&_embed`)
}

// Fetching Components
// ----------------------------------------------------------------------------
// Destinations

export async function getDestinations() {
  return fetchAPI('destination?per_page=100&_embed')
}
// Single Destination

export async function getDestination(
  slug: string,
): Promise<DestinationPage | null> {
  const url = `${WORDPRESS_URL}/wp-json/wp/v2/destination?slug=${slug}&_embed`

  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
  })

  const data = await res.json()

  const destination = data[0]

  if (!destination) {
    return null
  }

  // Fetch relationships

  const accommodationIds = destination.acf?.featured_accommodations || []

  const nearbyIds = destination.acf?.nearby_destinations || []

  const tourIds = destination.acf?.related_tours || []

  const experienceIds = destination.acf?.experiences || []

  const mainAttractionsId = destination.acf?.main_attractions || []

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

    fetchByIds('destination', nearbyIds).then((destinations) =>
      destinations.map(transformDestination),
    ),

    fetchByIds('tour', tourIds).then((items) => items.map(transformTour)),

    fetchByIds('experience', experienceIds).then((items) =>
      items.map(transformExperience),
    ),
    fetchByIds('attraction', mainAttractionsId).then((items) =>
      items.map(transformAttraction),
    ),
  ])

  return {
    ...transformDestination(destination),

    relationships: {
      accommodations,

      nearbyDestinations,

      relatedTours,

      experiences,
      mainAttractions,
    },
  }
}
// -------------------------------------------------------------------
// Tours
// ================================================================
// Tours
export async function getTours() {
  return fetchAPI('tour?_embed')
}

export async function getTour(slug: string): Promise<TourPage | null> {
  const url = `${WORDPRESS_URL}/wp-json/wp/v2/tour?slug=${slug}&_embed`

  const res = await fetch(url, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching tour: ${slug}`)
  }

  const data = await res.json()
  const tour = data[0]

  if (!tour) {
    return null
  }

  // Get relationship IDs from ACF
  const destinationIds = tour.acf?.destinations || []
  const experienceIds = tour.acf?.experiences || []
  const accommodationIds = tour.acf?.accommodations || []

  const itineraryId = tour.acf?.itinerary || null
  const itineraryDayIds = tour.acf?.itinerary_days || []

  // Fetch all related content
  const [
    destinations,
    experiences,
    accommodations,
    itineraryItems,
    itineraryDays,
  ] = await Promise.all([
    fetchByIds('destination', destinationIds).then((items) =>
      items.map(transformDestination),
    ),

    fetchByIds('experience', experienceIds).then((items) =>
      items.map(transformExperience),
    ),

    fetchByIds('accommodation', accommodationIds).then((items) =>
      items.map(transformAccommodation),
    ),

    itineraryId
      ? fetchByIds('itinerary', [itineraryId]).then((items) =>
          items.length > 0 ? transformItinerary(items[0]) : null,
        )
      : Promise.resolve(null),

    fetchByIds('itinerary-days', itineraryDayIds).then((items) =>
      items
        .map(transformItineraryDay)
        .sort(
          (a: ItineraryDay, b: ItineraryDay) =>
            (a.dayNumber ?? Number.MAX_SAFE_INTEGER) -
            (b.dayNumber ?? Number.MAX_SAFE_INTEGER),
        ),
    ),
  ])

  return {
    ...transformTour(tour),

    relationships: {
      destinations,
      experiences,
      accommodations,
      itinerary: itineraryItems,
      itineraryDays,
    },
  }
}
// ----------------------------------------------------------------------
// Experiences
// ================================================================

export async function getExperiences() {
  return fetchAPI('experience?_embed')
}
// ---------------------------------------------------------
// Itineraries
// ================================================================
export async function getItineraries() {
  return fetchAPI('itinerary?_embed')
}
// ---------------------------------------------------------------
// Itinerary Days
// ================================================================
export async function getItineraryDays() {
  return fetchAPI('itinerary-days?_embed')
}
// ------------------------------------------------------------------
// FAQs
// ================================================================

export async function getFAQs() {
  return fetchAPI('faq?_embed')
}
// -----------------------------------------------------------------
// Accommodations
// ================================================================

export async function getAccommodations() {
  return fetchAPI('accommodation?_embed')
}
// --------------------------------------------------------------
