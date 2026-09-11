import type { Attraction } from '@/types/attraction'
import type { AttractionFilterParams } from '@/types/filter-types'

export function filterAttractions(
    attractions: Attraction[],
    filters: AttractionFilterParams,
): Attraction[] {
    return attractions.filter((attraction) => {
        // Region
        if (
            filters.region &&
            !attraction.region?.includes(Number(filters.region))
        ) {
            return false
        }

        // Attraction Type
        if (filters.attractionType) {
            if (
                !attraction.attractionType?.includes(
                    Number(filters.attractionType),
                )
            ) {
                return false
            }
        }

        return true
    })
}