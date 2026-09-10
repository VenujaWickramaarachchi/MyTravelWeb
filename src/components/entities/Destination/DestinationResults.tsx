'use client'

import { useState } from 'react'

import EntityGrid from '@/components/entities/EntityGrid'
import DestinationCard from '@/components/entities/Destination/DestinationCard'
import LoadMore from '@/components/entities/LoadMore'

import type { Destination } from '@/types/destination'
import type { DestinationFilterParams } from '@/types/filter-types'

interface DestinationResultsProps {
    initialDestinations: Destination[]
    initialTotal: number
    initialTotalPages: number
    filters: DestinationFilterParams
}

export default function DestinationResults({
    initialDestinations,
    initialTotal,
    initialTotalPages,
    filters,
}: DestinationResultsProps) {
    const [destinations, setDestinations] =
        useState<Destination[]>(initialDestinations)

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages] = useState(initialTotalPages)
    const [isLoading, setIsLoading] = useState(false)

    const featuredDestinations = destinations.filter(
        (destination) => destination.featuredDestination,
    )

    const otherDestinations = destinations.filter(
        (destination) => !destination.featuredDestination,
    )

    async function handleLoadMore() {
        if (isLoading || currentPage >= totalPages) {
            return
        }

        setIsLoading(true)

        try {
            const params = new URLSearchParams({
                page: String(currentPage + 1),
            })

            if (filters.region) {
                params.set('region', filters.region)
            }

            if (filters.destinationType) {
                params.set(
                    'destinationType',
                    filters.destinationType,
                )
            }

            const response = await fetch(
                `/api/destinations?${params.toString()}`,
            )

            if (!response.ok) {
                throw new Error('Failed to load more destinations')
            }

            const data = await response.json()

            setDestinations((currentDestinations) => [
                ...currentDestinations,
                ...data.destinations,
            ])

            setCurrentPage(data.currentPage)
        } catch (error) {
            console.error(
                'Failed to load more destinations:',
                error,
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <p className="text-sm text-ink/60">
                {destinations.length} of {initialTotal}{' '}
                {initialTotal === 1
                    ? 'destination'
                    : 'destinations'}{' '}
                shown
            </p>

            <section>
                {destinations.length === 0 ? (
                    <div className="p-12 text-center rounded border border-line bg-ivory/50 space-y-2">
                        <h2 className="font-serif text-xl font-medium text-ink">
                            No destinations match your selection
                        </h2>

                        <p className="text-sm text-ink/70">
                            Try changing your filters or explore our
                            complete collection of Sri Lankan
                            destinations.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {featuredDestinations.length > 0 && (
                            <section className="space-y-6">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-gold-deep font-semibold">
                                        Featured
                                    </p>

                                    <h2 className="font-serif text-2xl sm:text-3xl text-ink">
                                        Featured Destinations
                                    </h2>
                                </div>

                                <EntityGrid columns={3}>
                                    {featuredDestinations.map(
                                        (destination) => (
                                            <DestinationCard
                                                key={destination.id}
                                                destination={destination}
                                            />
                                        ),
                                    )}
                                </EntityGrid>
                            </section>
                        )}

                        {otherDestinations.length > 0 && (
                            <section className="space-y-6">
                                {featuredDestinations.length > 0 && (
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-gold-deep font-semibold">
                                            Explore More
                                        </p>

                                        <h2 className="font-serif text-2xl sm:text-3xl text-ink">
                                            All Destinations
                                        </h2>
                                    </div>
                                )}

                                <EntityGrid columns={3}>
                                    {otherDestinations.map(
                                        (destination) => (
                                            <DestinationCard
                                                key={destination.id}
                                                destination={destination}
                                            />
                                        ),
                                    )}
                                </EntityGrid>
                            </section>
                        )}

                        <LoadMore
                            hasMore={currentPage < totalPages}
                            isLoading={isLoading}
                            onClick={handleLoadMore}
                        />
                    </div>
                )}
            </section>
        </>
    )
}