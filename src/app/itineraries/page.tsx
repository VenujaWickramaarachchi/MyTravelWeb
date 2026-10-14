import { getItineraries } from '@/lib/api/itinerary'
import { getItineraryLengths } from '@/lib/api/taxonomy'
import { filterItineraries } from '@/lib/filters/itinerary-filters'

import ItineraryFilters from '@/components/entities/Itinerary/ItineraryFilters'
import ItineraryResults from '@/components/entities/Itinerary/ItineraryResults'

import type { ItineraryFilterParams } from '@/types/filter-types'

interface ItinerariesPageProps {
  searchParams: Promise<ItineraryFilterParams>
}

export default async function ItinerariesPage({
  searchParams,
}: ItinerariesPageProps) {
  const filters = await searchParams

  const [itineraries, itineraryLengths] = await Promise.all([
    getItineraries(),
    getItineraryLengths().catch(() => []),
  ])

  const filteredItineraries = filterItineraries(
    itineraries,
    filters,
  )

  const initialItineraries = filteredItineraries.slice(0, 12)

  const total = filteredItineraries.length
  const totalPages = Math.ceil(total / 12)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <header className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet">
          Inspiring Island Routes
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-ink tracking-tight">
          Sri Lanka Travel Itineraries
        </h1>

        <p className="text-base sm:text-lg text-ink/75 leading-relaxed pt-2">
          Explore carefully planned travel routes connecting the island’s most iconic
          regions, heritage sites, wildlife sanctuaries, and coastal retreats.
        </p>
      </header>

      <ItineraryFilters
        filters={filters}
        itineraryLengths={itineraryLengths}
      />

      <ItineraryResults
        initialItineraries={initialItineraries}
        initialTotal={total}
        initialTotalPages={totalPages}
        filters={filters}
      />
    </main>
  )
}