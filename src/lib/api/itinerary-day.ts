import { fetchAPI } from './core/fetch-api'

import { transformItineraryDay } from '../transformers/itinerary-day'

import { ItineraryDay } from '@/types/itinerary-day'

export async function getItineraryDays(): Promise<ItineraryDay[]> {
  const itineraryDays = await fetchAPI('itinerary-days?_embed')

  return itineraryDays
    .map(transformItineraryDay)
    .sort(
      (a: ItineraryDay, b: ItineraryDay) =>
        (a.dayNumber ?? Number.MAX_SAFE_INTEGER) -
        (b.dayNumber ?? Number.MAX_SAFE_INTEGER),
    )
}
