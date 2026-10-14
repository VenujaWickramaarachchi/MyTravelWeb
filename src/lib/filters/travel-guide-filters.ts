import type { TravelGuide } from '@/types/travel-guide'
import type { TravelGuideFilterParams } from '@/types/filter-types'

export function filterTravelGuides(
    travelGuides: TravelGuide[],
    filters: TravelGuideFilterParams,
): TravelGuide[] {
    return travelGuides
        .filter((travelGuide) => {
            if (
                filters.travelGuideTopic &&
                !travelGuide.travelGuideTopic?.includes(
                    Number(filters.travelGuideTopic),
                )
            ) {
                return false
            }

            return true
        })
        .sort(
            (a, b) =>
                Number(b.featuredTravelGuide) -
                Number(a.featuredTravelGuide),
        )
}