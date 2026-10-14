import { NextResponse } from 'next/server'
import { getItineraries } from '@/lib/api/itinerary'
import { filterItineraries } from '@/lib/filters/itinerary-filters'
import type { ItineraryFilterParams } from '@/types/filter-types'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const filters: ItineraryFilterParams = {
        itineraryLength:
            searchParams.get('itineraryLength') || undefined,
    }

    const page = Math.max(
        1,
        Number(searchParams.get('page')) || 1,
    )

    const perPage = 12

    const itineraries = await getItineraries()

    const filteredItineraries = filterItineraries(
        itineraries,
        filters,
    )

    const start = (page - 1) * perPage
    const end = start + perPage

    const paginatedItineraries =
        filteredItineraries.slice(start, end)

    const total = filteredItineraries.length
    const totalPages = Math.ceil(total / perPage)

    return NextResponse.json({
        itineraries: paginatedItineraries,
        total,
        totalPages,
        currentPage: page,
        hasMore: page < totalPages,
    })
}