import { fetchAPI } from './core/fetch-api'
import { fetchByIds } from './core/fetch-by-ids'

import { transformItinerary } from '../transformers/itinerary'
import { transformDestination } from '../transformers/destination'
import { transformExperience } from '../transformers/experience'
import { transformTour } from '../transformers/tour'
import { transformAccommodation } from '../transformers/accommodation'
import { transformItineraryDay } from '../transformers/itinerary-day'

import { Itinerary } from '@/types/itinerary'

import { ItineraryPage } from '@/types/pages/itinerary-page'
import { ItineraryDayPage } from '@/types/pages/itinerary-day-page'

export async function getItineraries(): Promise<Itinerary[]> {
  const itineraries = await fetchAPI('itinerary?_embed')
  return itineraries.map(transformItinerary)
}

export async function getItinerary(
  slug: string,
): Promise<ItineraryPage | null> {
  const url =
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}` +
    `/wp-json/wp/v2/itinerary?slug=${slug}&_embed`

  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching itinerary: ${slug}`)
  }

  const data = await res.json()
  const itinerary = data[0]

  if (!itinerary) {
    return null
  }

  const itineraryData = transformItinerary(itinerary)
  const allItineraryDays = await fetchAPI('itinerary-days?_embed')

  const itineraryDays = allItineraryDays
    .filter(
      (day: any) => Number(day.acf?.itinerary) === Number(itineraryData.id),
    )
    .map(transformItineraryDay)
    .sort((a: any, b: any) => a.dayNumber - b.dayNumber)

  const resolvedItineraryDays: ItineraryDayPage[] = await Promise.all(
    itineraryDays.map(async (day: any): Promise<ItineraryDayPage> => {
      const [placesVisited, experiences, accommodation] = await Promise.all([
        day.placesVisited.length
          ? fetchByIds('destination', day.placesVisited).then((items) =>
              items.map(transformDestination),
            )
          : [],

        day.experiences.length
          ? fetchByIds('experience', day.experiences).then((items) =>
              items.map(transformExperience),
            )
          : [],

        day.accommodation
          ? fetchByIds('accommodation', [day.accommodation]).then((items) =>
              items.length > 0 ? transformAccommodation(items[0]) : null,
            )
          : null,
      ])

      return {
        ...day,
        relationships: {
          placesVisited,
          experiences,
          accommodation,
        },
      }
    }),
  )

  const [destinations, experiences, relatedTours, accommodationSuggestions] =
    await Promise.all([
      itineraryData.destinations.length
        ? fetchByIds('destination', itineraryData.destinations).then((items) =>
            items.map(transformDestination),
          )
        : [],

      itineraryData.experiences.length
        ? fetchByIds('experience', itineraryData.experiences).then((items) =>
            items.map(transformExperience),
          )
        : [],

      itineraryData.relatedTours.length
        ? fetchByIds('tour', itineraryData.relatedTours).then((items) =>
            items.map(transformTour),
          )
        : [],

      itineraryData.accommodationSuggestions.length
        ? fetchByIds(
            'accommodation',
            itineraryData.accommodationSuggestions,
          ).then((items) => items.map(transformAccommodation))
        : [],
    ])
  return {
    ...itineraryData,
    relationships: {
      destinations,
      experiences,
      relatedTours,
      accommodationSuggestions,
      itineraryDays: resolvedItineraryDays,
    },
  }
}
