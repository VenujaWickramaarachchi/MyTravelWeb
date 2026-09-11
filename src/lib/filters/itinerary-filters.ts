import type { Itinerary } from '@/types/itinerary'
import type { ItineraryFilterParams } from '@/types/filter-types'

export function filterItineraries(
    itineraries: Itinerary[],
    filters: ItineraryFilterParams,
): Itinerary[] {
    return itineraries
        .filter((itinerary) => {
            if (
                filters.itineraryLength &&
                !itinerary.itineraryLength?.includes(
                    Number(filters.itineraryLength),
                )
            ) {
                return false
            }

            return true
        })
        .sort(
            (a, b) =>
                Number(b.featuredItinerary) -
                Number(a.featuredItinerary),
        )
}