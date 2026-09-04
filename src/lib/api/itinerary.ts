import { fetchAPI } from './core/fetch-api'

import { transformItinerary } from '../transformers/itinerary'

export async function getItineraries() {
  const itineraries = await fetchAPI('itinerary?_embed')

  return itineraries.map(transformItinerary)
}
