'use client'

import { useState } from 'react'

import SearchResultCard from '@/components/Search/SearchResultCard'
import LoadMore from '@/components/entities/LoadMore'

import type { SearchResult } from '@/types/search'

interface SearchResultsProps {
    initialResults: SearchResult[]
    initialTotal: number
    initialTotalPages: number
    query: string
}

export default function SearchResults({
    initialResults,
    initialTotal,
    initialTotalPages,
    query,
}: SearchResultsProps) {
    const [results, setResults] =
        useState<SearchResult[]>(initialResults)

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages] = useState(initialTotalPages)
    const [isLoading, setIsLoading] = useState(false)

    const loadMore = async () => {
        if (isLoading || currentPage >= totalPages) {
            return
        }

        setIsLoading(true)

        try {
            const nextPage = currentPage + 1

            const params = new URLSearchParams({
                q: query,
                page: String(nextPage),
            })

            const response = await fetch(
                `/api/search?${params.toString()}`,
            )

            if (!response.ok) {
                throw new Error('Failed to load more search results')
            }

            const data = await response.json()

            setResults((current) => [
                ...current,
                ...data.results,
            ])

            setCurrentPage(nextPage)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="space-y-6">
            {results.map((result) => (
                <SearchResultCard
                    key={`${result.type}-${result.id}`}
                    result={result}
                />
            ))}

            <LoadMore
                hasMore={currentPage < totalPages}
                isLoading={isLoading}
                onClick={loadMore}
            />
        </section>
    )
}