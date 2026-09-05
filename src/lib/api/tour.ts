import { fetchAPI } from './core/fetch-api'
import { fetchByIds } from './core/fetch-by-ids'

import { transformDestination } from '../transformers/destination'
import { transformExperience } from '../transformers/experience'
import { transformAccommodation } from '../transformers/accommodation'
import { transformItinerary } from '../transformers/itinerary'
import { transformItineraryDay } from '../transformers/itinerary-day'
import { transformTour } from '../transformers/tour'

import { ItineraryDay } from '@/types/itinerary-day'

import { TourItineraryDay } from '@/types/pages/tour-itinerary-day'
import { TourPage } from '@/types/pages/tour-page'

export async function getTours() {
  const tours = await fetchAPI('tour?_embed')

  return tours.map(transformTour)
}

export async function getTour(slug: string): Promise<TourPage | null> {
  const url =
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}` +
    `/wp-json/wp/v2/tour?slug=${slug}&_embed`

  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching tour: ${slug}`)
  }

  const data = await res.json()
  const tour = data[0]

  if (!tour) {
    return null
  }

  const tourData = transformTour(tour)

  // Relationship IDs from ACF
  const destinationIds = tour.acf?.destinations || []

  const experienceIds = tour.acf?.experiences || []

  const accommodationIds = tour.acf?.accommodations || []

  const itineraryId = tour.acf?.itinerary || null

  const itineraryDayIds = tour.acf?.itinerary_days || []

  // Fetch related content
  const [destinations, experiences, accommodations, itinerary, itineraryDays] =
    await Promise.all([
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

      fetchByIds('itinerary-days', itineraryDayIds).then(async (items) => {
        const days: ItineraryDay[] = items
          .map(transformItineraryDay)
          .sort(
            (a: ItineraryDay, b: ItineraryDay) =>
              (a.dayNumber ?? Number.MAX_SAFE_INTEGER) -
              (b.dayNumber ?? Number.MAX_SAFE_INTEGER),
          )

        const connectedDays = await Promise.all(
          days.map(async (day) => {
            const placesVisited = await fetchByIds(
              'destination',
              day.placesVisited,
            )

            const experiences = await fetchByIds('experience', day.experiences)

            const accommodation = day.accommodation
              ? await fetchByIds('accommodation', [day.accommodation])
              : []

            return {
              ...day,

              relationships: {
                placesVisited: placesVisited.map(transformDestination),

                experiences: experiences.map(transformExperience),

                accommodation:
                  accommodation.length > 0
                    ? transformAccommodation(accommodation[0])
                    : null,
              },
            } satisfies TourItineraryDay
          }),
        )

        return connectedDays
      }),
    ])

  return {
    ...tourData,

    relationships: {
      destinations,
      experiences,
      accommodations,
      itinerary,
      itineraryDays,
    },
  }
}
