import { NextResponse } from 'next/server'

import { getDestinations } from '@/lib/api/destination'
import { filterDestinations } from '@/lib/filters/destination-filters'
import type { DestinationFilterParams } from '@/types/filter-types'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const filters: DestinationFilterParams = {
        region: searchParams.get('region') || undefined,
        destinationType:
            searchParams.get('destinationType') || undefined,
    }

    const page = Math.max(
        1,
        Number(searchParams.get('page')) || 1,
    )

    const perPage = 12

    const destinations = await getDestinations()

    const filteredDestinations = filterDestinations(
        destinations,
        filters,
    )

    const start = (page - 1) * perPage
    const end = start + perPage

    const paginatedDestinations =
        filteredDestinations.slice(start, end)

    const total = filteredDestinations.length
    const totalPages = Math.ceil(total / perPage)

    return NextResponse.json({
        destinations: paginatedDestinations,
        total,
        totalPages,
        currentPage: page,
        hasMore: page < totalPages,
    })
}