import { getAttractions } from '@/lib/api/attraction'
import {
  getAttractionTypes,
  getRegions,
} from '@/lib/api/taxonomy'

import AttractionFilters from '@/components/entities/Attraction/AttractionFilters'
import AttractionResults from '@/components/entities/Attraction/AttractionResults'

import { filterAttractions } from '@/lib/filters/attraction-filters'

import type { AttractionFilterParams } from '@/types/filter-types'

interface AttractionsPageProps {
  searchParams: Promise<AttractionFilterParams>
}

export default async function AttractionsPage({
  searchParams,
}: AttractionsPageProps) {
  const [
    regionsResult,
    attractionTypesResult,
    attractions,
  ] = await Promise.all([
    getRegions().catch(() => []),
    getAttractionTypes().catch(() => []),
    getAttractions(),
  ])

  const filters = await searchParams

  const filteredAttractions = filterAttractions(
    attractions,
    filters,
  )

  const perPage = 12

  const initialAttractions = filteredAttractions.slice(
    0,
    perPage,
  )

  const total = filteredAttractions.length

  const totalPages = Math.ceil(
    total / perPage,
  )

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <header className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep">
          Icons & Natural Wonders
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-ink tracking-tight">
          Attractions in Sri Lanka
        </h1>

        <p className="text-base sm:text-lg text-ink/75 leading-relaxed pt-2">
          From ancient sky-fortresses and sacred cave temples to hidden mountain
          waterfalls and golden coastal promontories, discover Sri Lanka’s most
          celebrated sights.
        </p>
      </header>

      <AttractionFilters
        region={filters.region}
        attractionType={filters.attractionType}
        regions={regionsResult}
        attractionTypes={attractionTypesResult}
      />

      <AttractionResults
        initialAttractions={initialAttractions}
        initialTotal={total}
        initialTotalPages={totalPages}
        filters={filters}
      />
    </main>
  )
}