import { getTours } from '@/lib/api/tour'
import { getRegions, getTourTypes } from '@/lib/api/taxonomy'

import TourFilters from '@/components/Filters/TourFilters'
import TourResults from '@/components/entities/Tour/TourResults'

import { filterTours } from '@/lib/filters/tour-filters'
import type { TourFilterParams } from '@/types/filter-types'

interface ToursPageProps {
  searchParams: Promise<TourFilterParams>
}

export default async function ToursPage({
  searchParams,
}: ToursPageProps) {
  const [regionsResult, tourTypesResult] = await Promise.all([
    getRegions().catch(() => []),
    getTourTypes().catch(() => []),
  ])

  const filters = await searchParams

  const toursResult = await getTours({
    page: 1,
    perPage: 100,
    region: filters.region,
    tourType: filters.tourType,
  })

  const filteredTours = filterTours(
    toursResult.tours,
    filters,
  )

  const perPage = 12

  const initialTours = filteredTours.slice(
    0,
    perPage,
  )

  const total = filteredTours.length

  const totalPages = Math.ceil(
    total / perPage,
  )

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <header className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep">
          Handcrafted Private Journeys
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-ink tracking-tight">
          Sri Lanka Tours & Tailor-Made Holidays
        </h1>

        <p className="text-base sm:text-lg text-ink/75 leading-relaxed pt-2">
          Discover our collection of thoughtfully planned private tours,
          complete with dedicated chauffeur-guides, hand-picked boutique
          hotels, and authentic local experiences tailored entirely to
          your style.
        </p>
      </header>

      <TourFilters
        region={filters.region}
        tourType={filters.tourType}
        duration={filters.duration}
        tourStyle={filters.tourStyle}
        price={filters.price}
        regions={regionsResult}
        tourTypes={tourTypesResult}
      />

      <TourResults
        initialTours={initialTours}
        initialTotal={total}
        initialTotalPages={totalPages}
        filters={filters}
      />
    </main>
  )
}