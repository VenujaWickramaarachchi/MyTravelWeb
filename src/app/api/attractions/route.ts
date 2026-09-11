import { NextResponse } from 'next/server'

import { getAttractions } from '@/lib/api/attraction'
import { filterAttractions } from '@/lib/filters/attraction-filters'
import type { AttractionFilterParams } from '@/types/filter-types'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const filters: AttractionFilterParams = {
        region: searchParams.get('region') || undefined,
        attractionType:
            searchParams.get('attractionType') || undefined,
    }

    const page = Math.max(
        1,
        Number(searchParams.get('page')) || 1,
    )

    const perPage = 12

    const attractions = await getAttractions()

    const filteredAttractions = filterAttractions(
        attractions,
        filters,
    )

    const start = (page - 1) * perPage
    const end = start + perPage

    const paginatedAttractions =
        filteredAttractions.slice(start, end)

    const total = filteredAttractions.length
    const totalPages = Math.ceil(total / perPage)

    return NextResponse.json({
        attractions: paginatedAttractions,
        total,
        totalPages,
        currentPage: page,
        hasMore: page < totalPages,
    })
}