import { getTravelGuides } from '@/lib/api/travel-guide'
import { getTravelGuideTopics } from '@/lib/api/taxonomy'
import { filterTravelGuides } from '@/lib/filters/travel-guide-filters'

import TravelGuideFilters from '@/components/entities/TravelGuides/TravelGuideFilters'
import TravelGuideResults from '@/components/entities/TravelGuides/TravelGuideResults'

import type { TravelGuideFilterParams } from '@/types/filter-types'

interface TravelGuidesPageProps {
  searchParams: Promise<TravelGuideFilterParams>
}

export default async function TravelGuidesPage({
  searchParams,
}: TravelGuidesPageProps) {
  const filters = await searchParams

  const [travelGuides, travelGuideTopics] = await Promise.all([
    getTravelGuides(),
    getTravelGuideTopics().catch(() => []),
  ])

  const filteredTravelGuides = filterTravelGuides(
    travelGuides,
    filters,
  )

  const initialTravelGuides = filteredTravelGuides.slice(0, 12)

  const total = filteredTravelGuides.length
  const totalPages = Math.ceil(total / 12)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <header className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep">
          Island Knowledge & Perspectives
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-ink tracking-tight">
          Sri Lanka Travel Guides & Inspiration
        </h1>

        <p className="text-base sm:text-lg text-ink/75 leading-relaxed pt-2">
          In-depth guides, practical advice, regional recommendations, and insider travel
          notes to help you prepare for an unforgettable Sri Lankan adventure.
        </p>
      </header>

      <TravelGuideFilters
        filters={filters}
        travelGuideTopics={travelGuideTopics}
      />

      <TravelGuideResults
        initialTravelGuides={initialTravelGuides}
        initialTotal={total}
        initialTotalPages={totalPages}
        filters={filters}
      />
    </main>
  )
}