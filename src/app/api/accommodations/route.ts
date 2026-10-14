import { NextResponse } from 'next/server'

import { getAccommodations } from '@/lib/api/accommodation'
import { filterAccommodations } from '@/lib/filters/accommodation-filters'
import type { AccommodationFilterParams } from '@/types/filter-types'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const filters: AccommodationFilterParams = {
        region: searchParams.get('region') || undefined,
        accommodationType:
            searchParams.get('accommodationType') || undefined,
    }

    const page = Math.max(
        1,
        Number(searchParams.get('page')) || 1,
    )

    const perPage = 12

    const accommodations = await getAccommodations()

    const filteredAccommodations = filterAccommodations(
        accommodations,
        filters,
    )

    const start = (page - 1) * perPage
    const end = start + perPage

    const paginatedAccommodations =
        filteredAccommodations.slice(start, end)

    const total = filteredAccommodations.length
    const totalPages = Math.ceil(total / perPage)

    return NextResponse.json({
        accommodations: paginatedAccommodations,
        total,
        totalPages,
        currentPage: page,
        hasMore: page < totalPages,
    })
}