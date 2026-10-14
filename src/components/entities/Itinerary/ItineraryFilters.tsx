import FilterSelect from '@/components/Filters/FilterSelect'

import type { ItineraryFilterParams } from '@/types/filter-types'
import type { TaxonomyTerm } from '@/types/taxonomy'

interface ItineraryFiltersProps {
    filters: ItineraryFilterParams
    itineraryLengths: TaxonomyTerm[]
}

export default function ItineraryFilters({
    filters,
    itineraryLengths,
}: ItineraryFiltersProps) {
    const itineraryLengthOptions = [
        {
            label: 'Any Itinerary Length',
            value: '',
        },
        ...itineraryLengths.map((itineraryLength) => ({
            label: itineraryLength.name,
            value: String(itineraryLength.id),
        })),
    ]



    return (
        <form
            action="/itineraries"
            method="get"
            className="grid gap-6 md:grid-cols-2"
        >
            <FilterSelect
                label="Itinerary Length"
                name="itineraryLength"
                value={filters.itineraryLength}
                options={itineraryLengthOptions}
            />


            <div className="flex items-end">
                <a
                    href="/itineraries"
                    className="text-sm font-medium text-ink underline underline-offset-4 hover:text-violet"
                >
                    Clear filters
                </a>
            </div>
        </form>
    )
}