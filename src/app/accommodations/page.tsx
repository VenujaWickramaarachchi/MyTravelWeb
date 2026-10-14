import { getAccommodations } from '@/lib/api/accommodation'
import {
  getAccommodationTypes,
  getRegions,
} from '@/lib/api/taxonomy'

import AccommodationFilters from '@/components/entities/Accommodation/AccommodationFilters'
import AccommodationResults from '@/components/entities/Accommodation/AccommodationResults'

import { filterAccommodations } from '@/lib/filters/accommodation-filters'

import type { AccommodationFilterParams } from '@/types/filter-types'

interface AccommodationsPageProps {
  searchParams: Promise<AccommodationFilterParams>
}

export default async function AccommodationsPage({
  searchParams,
}: AccommodationsPageProps) {
  const [
    regionsResult,
    accommodationTypesResult,
    accommodations,
  ] = await Promise.all([
    getRegions().catch(() => []),
    getAccommodationTypes().catch(() => []),
    getAccommodations(),
  ])

  const filters = await searchParams

  const filteredAccommodations = filterAccommodations(
    accommodations,
    filters,
  )

  const perPage = 12

  const initialAccommodations =
    filteredAccommodations.slice(0, perPage)

  const total = filteredAccommodations.length

  const totalPages = Math.ceil(
    total / perPage,
  )

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <header className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amethyst">
          Curated Places to Stay
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-ink tracking-tight">
          Boutique Stays & Resorts in Sri Lanka
        </h1>

        <p className="text-base sm:text-lg text-ink/75 leading-relaxed pt-2">
          From colonial tea planter bungalows and beachfront boutique villas to luxury safari
          lodges and eco-resorts tucked inside rain forests.
        </p>
      </header>

      <AccommodationFilters
        region={filters.region}
        accommodationType={filters.accommodationType}
        regions={regionsResult}
        accommodationTypes={accommodationTypesResult}
      />

      <AccommodationResults
        initialAccommodations={initialAccommodations}
        initialTotal={total}
        initialTotalPages={totalPages}
        filters={filters}
      />
    </main>
  )
}