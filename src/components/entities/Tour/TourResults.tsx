'use client'

import { useState } from 'react'

import EntityGrid from '@/components/entities/EntityGrid'
import TourCard from '@/components/entities/Tour/TourCard'
import LoadMore from '@/components/entities/LoadMore'

import type { Tour } from '@/types/tour'
import type { TourFilterParams } from '@/types/filter-types'

interface TourResultsProps {
    initialTours: Tour[]
    initialTotal: number
    initialTotalPages: number
    filters: TourFilterParams
}

export default function TourResults({
    initialTours,
    initialTotal,
    initialTotalPages,
    filters,
}: TourResultsProps) {
    const [tours, setTours] = useState<Tour[]>(initialTours)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages] = useState(initialTotalPages)
    const [isLoading, setIsLoading] = useState(false)

    const featuredTours = tours.filter(
        (tour) => tour.featuredTour,
    )

    const otherTours = tours.filter(
        (tour) => !tour.featuredTour,
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

            if (filters.tourType) {
                params.set('tourType', filters.tourType)
            }

            if (filters.duration) {
                params.set('duration', filters.duration)
            }

            if (filters.tourStyle) {
                params.set('tourStyle', filters.tourStyle)
            }

            if (filters.price) {
                params.set('price', filters.price)
            }

            const response = await fetch(
                `/api/tours?${params.toString()}`,
            )

            if (!response.ok) {
                throw new Error('Failed to load more tours')
            }

            const data = await response.json()

            setTours((currentTours) => [
                ...currentTours,
                ...data.tours,
            ])

            setCurrentPage(data.currentPage)
        } catch (error) {
            console.error(
                'Failed to load more tours:',
                error,
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <p className="text-sm text-ink/60">
                {tours.length} of {initialTotal}{' '}
                {initialTotal === 1 ? 'tour' : 'tours'} shown
            </p>

            <section>
                {tours.length === 0 ? (
                    <div className="p-12 text-center rounded border border-line bg-ivory/50 space-y-2">
                        <h2 className="font-serif text-xl font-medium text-ink">
                            No tours match your selection
                        </h2>

                        <p className="text-sm text-ink/70">
                            Try changing your filters or explore our complete collection
                            of Sri Lanka tours.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {featuredTours.length > 0 && (
                            <section className="space-y-6">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-gold-deep font-semibold">
                                        Featured
                                    </p>

                                    <h2 className="font-serif text-2xl sm:text-3xl text-ink">
                                        Featured Tours
                                    </h2>
                                </div>

                                <EntityGrid columns={3}>
                                    {featuredTours.map((tour) => (
                                        <TourCard
                                            key={tour.id}
                                            tour={tour}
                                        />
                                    ))}
                                </EntityGrid>
                            </section>
                        )}

                        {otherTours.length > 0 && (
                            <section className="space-y-6">
                                {featuredTours.length > 0 && (
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-gold-deep font-semibold">
                                            Explore More
                                        </p>

                                        <h2 className="font-serif text-2xl sm:text-3xl text-ink">
                                            All Tours
                                        </h2>
                                    </div>
                                )}

                                <EntityGrid columns={3}>
                                    {otherTours.map((tour) => (
                                        <TourCard
                                            key={tour.id}
                                            tour={tour}
                                        />
                                    ))}
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