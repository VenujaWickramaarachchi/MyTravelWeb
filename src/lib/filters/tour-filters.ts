import type { Tour } from '@/types/tour'
import type { TourFilterParams } from '@/types/filter-types'

function matchesDuration(
    durationDays: number | null,
    duration: string | undefined,
): boolean {
    if (!duration) {
        return true
    }

    if (durationDays === null) {
        return false
    }

    switch (duration) {
        case 'short':
            return durationDays >= 1 && durationDays <= 3

        case 'medium':
            return durationDays >= 4 && durationDays <= 6

        case 'long':
            return durationDays >= 7 && durationDays <= 10

        case 'extended':
            return durationDays >= 11

        default:
            return true
    }
}

function matchesPrice(
    priceFrom: number | null,
    price: string | undefined,
): boolean {
    if (!price) {
        return true
    }

    if (priceFrom === null) {
        return false
    }

    switch (price) {
        case 'under-500':
            return priceFrom < 500

        case '500-999':
            return priceFrom >= 500 && priceFrom <= 999

        case '1000-1999':
            return priceFrom >= 1000 && priceFrom <= 1999

        case '2000-3499':
            return priceFrom >= 2000 && priceFrom <= 3499

        case '3500-plus':
            return priceFrom >= 3500

        default:
            return true
    }
}

function matchesTourStyle(
    tourStyle: string,
    selectedStyle: string | undefined,
): boolean {
    if (!selectedStyle) {
        return true
    }

    return (
        tourStyle.trim().toLowerCase() ===
        selectedStyle.trim().toLowerCase()
    )
}

export function filterTours(
    tours: Tour[],
    filters: TourFilterParams,
): Tour[] {
    const filteredTours = tours.filter((tour) => {
        const matchesRegion =
            !filters.region ||
            tour.region.includes(Number(filters.region))

        const matchesTourType =
            !filters.tourType ||
            tour.tourType.includes(Number(filters.tourType))

        const matchesTourDuration = matchesDuration(
            tour.durationDays,
            filters.duration,
        )

        const matchesStyle = matchesTourStyle(
            tour.tourStyle,
            filters.tourStyle,
        )

        const matchesPriceRange = matchesPrice(
            tour.priceFrom,
            filters.price,
        )

        return (
            matchesRegion &&
            matchesTourType &&
            matchesTourDuration &&
            matchesStyle &&
            matchesPriceRange
        )
    })

    return filteredTours.sort((a, b) => {
        if (a.featuredTour === b.featuredTour) {
            return 0
        }

        return a.featuredTour ? -1 : 1
    })
}