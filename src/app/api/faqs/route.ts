import { NextResponse } from 'next/server'
import { getFAQs } from '@/lib/api/faq'
import { filterFAQs } from '@/lib/filters/faq-filters'
import type { FAQFilterParams } from '@/types/filter-types'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const filters: FAQFilterParams = {
        faqCategory:
            searchParams.get('faqCategory') || undefined,
    }

    const page = Math.max(
        1,
        Number(searchParams.get('page')) || 1,
    )

    const perPage = 12

    const faqs = await getFAQs()

    const filteredFAQs = filterFAQs(faqs, filters)

    const start = (page - 1) * perPage
    const end = start + perPage

    const paginatedFAQs = filteredFAQs.slice(start, end)

    const total = filteredFAQs.length
    const totalPages = Math.ceil(total / perPage)

    return NextResponse.json({
        faqs: paginatedFAQs,
        total,
        totalPages,
        currentPage: page,
        hasMore: page < totalPages,
    })
}