import { NextResponse } from 'next/server'

import { getExperiences } from '@/lib/api/experience'
import { filterExperiences } from '@/lib/filters/experience-filter'
import type { ExperienceFilterParams } from '@/types/filter-types'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const filters: ExperienceFilterParams = {
        region: searchParams.get('region') || undefined,
        experienceType:
            searchParams.get('experienceType') || undefined,
    }

    const page = Math.max(
        1,
        Number(searchParams.get('page')) || 1,
    )

    const perPage = 12

    const experiences = await getExperiences()

    const filteredExperiences = filterExperiences(
        experiences,
        filters,
    )

    const start = (page - 1) * perPage
    const end = start + perPage

    const paginatedExperiences =
        filteredExperiences.slice(start, end)

    const total = filteredExperiences.length
    const totalPages = Math.ceil(total / perPage)

    return NextResponse.json({
        experiences: paginatedExperiences,
        total,
        totalPages,
        currentPage: page,
        hasMore: page < totalPages,
    })
}