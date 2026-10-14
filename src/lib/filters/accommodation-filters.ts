import type { Accommodation } from '@/types/accommodation'
import type { AccommodationFilterParams } from '@/types/filter-types'

export function filterAccommodations(
    accommodations: Accommodation[],
    filters: AccommodationFilterParams,
): Accommodation[] {
    return accommodations.filter((accommodation) => {
        // Region
        if (
            filters.region &&
            !accommodation.region?.includes(Number(filters.region))
        ) {
            return false
        }

        // Accommodation Type
        if (filters.accommodationType) {
            if (
                !accommodation.accommodationType?.includes(
                    Number(filters.accommodationType),
                )
            ) {
                return false
            }
        }

        return true
    })
}