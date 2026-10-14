import { NextResponse } from 'next/server'

import { searchContent } from '@/lib/api/search'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const query = searchParams.get('q')?.trim() || ''

    const page = Math.max(
        1,
        Number(searchParams.get('page')) || 1,
    )

    const perPage = 12

    if (!query) {
        return NextResponse.json({
            results: [],
            total: 0,
            totalPages: 0,
            currentPage: page,
            hasMore: false,
        })
    }

    const results = await searchContent(query, 20)

    const start = (page - 1) * perPage
    const end = start + perPage

    const paginatedResults = results.slice(start, end)

    const total = results.length
    const totalPages = Math.ceil(total / perPage)

    return NextResponse.json({
        results: paginatedResults,
        total,
        totalPages,
        currentPage: page,
        hasMore: page < totalPages,
    })
}