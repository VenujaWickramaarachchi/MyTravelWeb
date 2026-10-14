import type { Destination } from '@/types/destination'
import type { DestinationFilterParams } from '@/types/filter-types'

export function filterDestinations(
    destinations: Destination[],
    filters: DestinationFilterParams,
): Destination[] {
    return destinations
        .filter((destination) => {
            // Region
            if (
                filters.region &&
                !destination.region?.includes(Number(filters.region))
            ) {
                return false
            }

            // Destination Type
            if (filters.destinationType) {
                const types = Array.isArray(destination.destinationType)
                    ? destination.destinationType
                    : []

                const matchesType = types.some(
                    (type) =>
                        String(type).trim().toLowerCase() ===
                        filters.destinationType?.trim().toLowerCase(),
                )

                if (!matchesType) {
                    return false
                }
            }

            return true
        })
        .sort(
            (a, b) =>
                Number(b.featuredDestination) -
                Number(a.featuredDestination),
        )
}