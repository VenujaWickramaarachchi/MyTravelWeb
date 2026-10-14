import { getExperiences } from '@/lib/api/experience'
import {
  getExperienceTypes,
  getRegions,
} from '@/lib/api/taxonomy'

import ExperienceFilters from '@/components/entities/Experience/ExperienceFilters'
import ExperienceResults from '@/components/entities/Experience/ExperienceResults'

import { filterExperiences } from '@/lib/filters/experience-filter'


import type { ExperienceFilterParams } from '@/types/filter-types'

interface ExperiencesPageProps {
  searchParams: Promise<ExperienceFilterParams>
}

export default async function ExperiencesPage({
  searchParams,
}: ExperiencesPageProps) {
  const [
    regionsResult,
    experienceTypesResult,
    experiences,
  ] = await Promise.all([
    getRegions().catch(() => []),
    getExperienceTypes().catch(() => []),
    getExperiences(),
  ])

  const filters = await searchParams

  const filteredExperiences = filterExperiences(
    experiences,
    filters,
  )

  const perPage = 12

  const initialExperiences = filteredExperiences.slice(
    0,
    perPage,
  )

  const total = filteredExperiences.length

  const totalPages = Math.ceil(
    total / perPage,
  )



  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <header className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fern">
          Authentic Island Moments
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-ink tracking-tight">
          Immersive Experiences in Sri Lanka
        </h1>

        <p className="text-base sm:text-lg text-ink/75 leading-relaxed pt-2">
          Beyond ordinary sightseeing: participate in traditional tea plucking, track
          leopards at sunrise, learn age-old spice cookery, and connect deeply with the
          living cultures of Sri Lanka.
        </p>
      </header>

      <ExperienceFilters
        region={filters.region}
        experienceType={filters.experienceType}
        regions={regionsResult}
        experienceTypes={experienceTypesResult}
      />

      <ExperienceResults
        initialExperiences={initialExperiences}
        initialTotal={total}
        initialTotalPages={totalPages}
        filters={filters}
      />
    </main>
  )
}