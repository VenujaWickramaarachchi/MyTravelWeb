import { NextResponse } from 'next/server'
import { getTravelGuides } from '@/lib/api/travel-guide'
import { filterTravelGuides } from '@/lib/filters/travel-guide-filters'
import type { TravelGuideFilterParams } from '@/types/filter-types'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const filters: TravelGuideFilterParams = {
        travelGuideTopic:
            searchParams.get('travelGuideTopic') || undefined,
    }

    const page = Math.max(
        1,
        Number(searchParams.get('page')) || 1,
    )

    const perPage = 12

    const travelGuides = await getTravelGuides()

    const filteredTravelGuides = filterTravelGuides(
        travelGuides,
        filters,
    )

    const start = (page - 1) * perPage
    const end = start + perPage

    const paginatedTravelGuides =
        filteredTravelGuides.slice(start, end)

    const total = filteredTravelGuides.length
    const totalPages = Math.ceil(total / perPage)

    return NextResponse.json({
        travelGuides: paginatedTravelGuides,
        total,
        totalPages,
        currentPage: page,
        hasMore: page < totalPages,
    })
}