'use client'

import { useState } from 'react'

import ExperienceCard from '@/components/entities/Experience/ExperienceCard'
import EntityGrid from '@/components/entities/EntityGrid'
import LoadMore from '@/components/entities/LoadMore'

import type { Experience } from '@/types/experience'
import type { ExperienceFilterParams } from '@/types/filter-types'

interface ExperienceResultsProps {
    initialExperiences: Experience[]
    initialTotal: number
    initialTotalPages: number
    filters: ExperienceFilterParams
}

export default function ExperienceResults({
    initialExperiences,
    initialTotal,
    initialTotalPages,
    filters,
}: ExperienceResultsProps) {
    const [experiences, setExperiences] =
        useState<Experience[]>(initialExperiences)

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

            if (filters.experienceType) {
                params.set(
                    'experienceType',
                    filters.experienceType,
                )
            }

            const response = await fetch(
                `/api/experiences?${params.toString()}`,
            )

            if (!response.ok) {
                throw new Error('Failed to load more experiences')
            }

            const data = await response.json()

            setExperiences((current) => [
                ...current,
                ...data.experiences,
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
                    No experiences found
                </h2>

                <p className="text-sm text-ink/70">
                    Try adjusting your filters to explore more Sri Lankan experiences.
                </p>
            </div>
        )
    }

    return (
        <section className="space-y-8">
            <EntityGrid columns={3}>
                {experiences.map((experience) => (
                    <ExperienceCard
                        key={experience.id}
                        experience={experience}
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