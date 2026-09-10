import { NextResponse } from 'next/server'

import { getTours } from '@/lib/api/tour'
import { filterTours } from '@/lib/filters/tour-filters'
import type { TourFilterParams } from '@/types/filter-types'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const filters: TourFilterParams = {
        region: searchParams.get('region') || undefined,
        tourType: searchParams.get('tourType') || undefined,
        duration: searchParams.get('duration') || undefined,
        tourStyle: searchParams.get('tourStyle') || undefined,
        price: searchParams.get('price') || undefined,
    }

    const page = Math.max(
        1,
        Number(searchParams.get('page')) || 1,
    )

    const perPage = 12

    const result = await getTours({
        page: 1,
        perPage: 100,
        region: filters.region,
        tourType: filters.tourType,
    })

    const filteredTours = filterTours(
        result.tours,
        filters,
    )

    const start = (page - 1) * perPage
    const end = start + perPage

    const tours = filteredTours.slice(start, end)

    const total = filteredTours.length
    const totalPages = Math.ceil(total / perPage)

    return NextResponse.json({
        tours,
        total,
        totalPages,
        currentPage: page,
        hasMore: page < totalPages,
    })
}