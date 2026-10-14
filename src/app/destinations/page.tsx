import { getDestinations } from '@/lib/api/destination'
import { getRegions } from '@/lib/api/taxonomy'

import DestinationFilters from '@/components/entities/Destination/DestinationFilters'
import DestinationResults from '@/components/entities/Destination/DestinationResults'

import { filterDestinations } from '@/lib/filters/destination-filters'
import { getDestinationTypeOptions } from '@/lib/filters/destination-filter-options'

import type { DestinationFilterParams } from '@/types/filter-types'

interface DestinationsPageProps {
  searchParams: Promise<DestinationFilterParams>
}

export default async function DestinationsPage({
  searchParams,
}: DestinationsPageProps) {
  const [regionsResult, destinations] = await Promise.all([
    getRegions().catch(() => []),
    getDestinations(),
  ])

  const filters = await searchParams

  const filteredDestinations = filterDestinations(
    destinations,
    filters,
  )

  const perPage = 12

  const initialDestinations = filteredDestinations.slice(
    0,
    perPage,
  )

  const total = filteredDestinations.length

  const totalPages = Math.ceil(
    total / perPage,
  )

  const regionOptions = [
    {
      label: 'Any Region',
      value: '',
    },
    ...regionsResult.map((region) => ({
      label: region.name,
      value: String(region.id),
    })),
  ]

  const destinationTypeOptions =
    getDestinationTypeOptions(destinations)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <header className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep">
          The Pearl of the Indian Ocean
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-ink tracking-tight">
          Destinations of Sri Lanka
        </h1>

        <p className="text-base sm:text-lg text-ink/75 leading-relaxed pt-2">
          Explore the diverse regions and landscapes of Sri Lanka
          — from palm-fringed southern bays and misty highland
          tea plantations to UNESCO-listed ancient citadels and
          wildlife-dense national parks.
        </p>
      </header>

      <DestinationFilters
        region={filters.region}
        destinationType={filters.destinationType}
        regions={regionsResult}
        destinationTypeOptions={destinationTypeOptions}
      />

      <DestinationResults
        initialDestinations={initialDestinations}
        initialTotal={total}
        initialTotalPages={totalPages}
        filters={filters}
      />
    </main>
  )
}