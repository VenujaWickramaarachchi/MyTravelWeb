'use client'

import { useState } from 'react'

import AccommodationCard from '@/components/entities/Accommodation/AccommodationCard'
import EntityGrid from '@/components/entities/EntityGrid'
import LoadMore from '@/components/entities/LoadMore'

import type { Accommodation } from '@/types/accommodation'
import type { AccommodationFilterParams } from '@/types/filter-types'

interface AccommodationResultsProps {
    initialAccommodations: Accommodation[]
    initialTotal: number
    initialTotalPages: number
    filters: AccommodationFilterParams
}

export default function AccommodationResults({
    initialAccommodations,
    initialTotal,
    initialTotalPages,
    filters,
}: AccommodationResultsProps) {
    const [accommodations, setAccommodations] =
        useState<Accommodation[]>(initialAccommodations)

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

            if (filters.accommodationType) {
                params.set(
                    'accommodationType',
                    filters.accommodationType,
                )
            }

            const response = await fetch(
                `/api/accommodations?${params.toString()}`,
            )

            if (!response.ok) {
                throw new Error('Failed to load more accommodations')
            }

            const data = await response.json()

            setAccommodations((current) => [
                ...current,
                ...data.accommodations,
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
                    No accommodations found
                </h2>

                <p className="text-sm text-ink/70">
                    Try adjusting your filters to explore more places to stay in Sri Lanka.
                </p>
            </div>
        )
    }

    return (
        <section className="space-y-8">
            <EntityGrid columns={3}>
                {accommodations.map((accommodation) => (
                    <AccommodationCard
                        key={accommodation.id}
                        accommodation={accommodation}
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