'use client'

import { useState } from 'react'

import ItineraryCard from '@/components/entities/Itinerary/ItineraryCard'
import EntityGrid from '@/components/entities/EntityGrid'
import LoadMore from '@/components/entities/LoadMore'

import type { Itinerary } from '@/types/itinerary'
import type { ItineraryFilterParams } from '@/types/filter-types'

interface ItineraryResultsProps {
    initialItineraries: Itinerary[]
    initialTotal: number
    initialTotalPages: number
    filters: ItineraryFilterParams
}

export default function ItineraryResults({
    initialItineraries,
    initialTotal,
    initialTotalPages,
    filters,
}: ItineraryResultsProps) {
    const [itineraries, setItineraries] =
        useState<Itinerary[]>(initialItineraries)

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

            if (filters.itineraryLength) {
                params.set(
                    'itineraryLength',
                    filters.itineraryLength,
                )
            }

            const response = await fetch(
                `/api/itineraries?${params.toString()}`,
            )

            if (!response.ok) {
                throw new Error('Failed to load more itineraries')
            }

            const data = await response.json()

            setItineraries((current) => [
                ...current,
                ...data.itineraries,
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
                    No itineraries found
                </h2>

                <p className="text-sm text-ink/70">
                    Try adjusting your filters to explore more itineraries in Sri Lanka.
                </p>
            </div>
        )
    }

    return (
        <section className="space-y-8">
            <EntityGrid columns={3}>
                {itineraries.map((itinerary) => (
                    <ItineraryCard
                        key={itinerary.id}
                        itinerary={itinerary}
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