'use client'

import { useState } from 'react'

import AttractionCard from '@/components/entities/Attraction/AttractionCard'
import EntityGrid from '@/components/entities/EntityGrid'
import LoadMore from '@/components/entities/LoadMore'

import type { Attraction } from '@/types/attraction'
import type { AttractionFilterParams } from '@/types/filter-types'

interface AttractionResultsProps {
    initialAttractions: Attraction[]
    initialTotal: number
    initialTotalPages: number
    filters: AttractionFilterParams
}

export default function AttractionResults({
    initialAttractions,
    initialTotal,
    initialTotalPages,
    filters,
}: AttractionResultsProps) {
    const [attractions, setAttractions] =
        useState<Attraction[]>(initialAttractions)

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
                page: String(nextPage),
            })

            if (filters.region) {
                params.set('region', filters.region)
            }

            if (filters.attractionType) {
                params.set(
                    'attractionType',
                    filters.attractionType,
                )
            }

            const response = await fetch(
                `/api/attractions?${params.toString()}`,
            )

            if (!response.ok) {
                throw new Error('Failed to load more attractions')
            }

            const data = await response.json()

            setAttractions((current) => [
                ...current,
                ...data.attractions,
            ])

            setCurrentPage(nextPage)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    if (initialTotal === 0) {
        return (
            <div className="p-12 text-center rounded border border-line bg-ivory/50 space-y-2">
                <h2 className="font-serif text-xl font-medium text-ink">
                    No attractions found
                </h2>

                <p className="text-sm text-ink/70">
                    Try adjusting your filters to explore more Sri Lankan attractions.
                </p>
            </div>
        )
    }

    return (
        <section className="space-y-8">
            <EntityGrid columns={3}>
                {attractions.map((attraction) => (
                    <AttractionCard
                        key={attraction.id}
                        attraction={attraction}
                    />
                ))}
            </EntityGrid>

            <LoadMore
                hasMore={currentPage < totalPages}
                isLoading={isLoading}
                onClick={loadMore}
            />
        </section>
    )
}