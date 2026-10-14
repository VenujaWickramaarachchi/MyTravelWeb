'use client'

import { useState } from 'react'

import EntityCard from '@/components/entities/EntityCard'
import EntityGrid from '@/components/entities/EntityGrid'
import LoadMore from '@/components/entities/LoadMore'

import type { TravelGuide } from '@/types/travel-guide'
import type { TravelGuideFilterParams } from '@/types/filter-types'

interface TravelGuideResultsProps {
    initialTravelGuides: TravelGuide[]
    initialTotal: number
    initialTotalPages: number
    filters: TravelGuideFilterParams
}

export default function TravelGuideResults({
    initialTravelGuides,
    initialTotal,
    initialTotalPages,
    filters,
}: TravelGuideResultsProps) {
    const [travelGuides, setTravelGuides] =
        useState<TravelGuide[]>(initialTravelGuides)

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

            if (filters.travelGuideTopic) {
                params.set(
                    'travelGuideTopic',
                    filters.travelGuideTopic,
                )
            }

            const response = await fetch(
                `/api/travel-guides?${params.toString()}`,
            )

            if (!response.ok) {
                throw new Error('Failed to load more travel guides')
            }

            const data = await response.json()

            setTravelGuides((current) => [
                ...current,
                ...data.travelGuides,
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
                    No travel guides found
                </h2>

                <p className="text-sm text-ink/70">
                    Try adjusting your filters to explore more Sri Lanka travel guides.
                </p>
            </div>
        )
    }

    return (
        <section className="space-y-8">
            <EntityGrid columns={3}>
                {travelGuides.map((guide) => (
                    <EntityCard
                        key={guide.id}
                        title={guide.title}
                        slug={guide.slug}
                        href={`/travel-guides/${guide.slug}`}
                        image={guide.heroImage}
                        description={guide.shortDescription}
                        eyebrow="Editorial Guide"
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