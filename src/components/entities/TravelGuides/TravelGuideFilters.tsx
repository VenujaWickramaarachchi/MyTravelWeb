import FilterSelect from '@/components/Filters/FilterSelect'

import type { TravelGuideFilterParams } from '@/types/filter-types'
import type { TaxonomyTerm } from '@/types/taxonomy'

interface TravelGuideFiltersProps {
    filters: TravelGuideFilterParams
    travelGuideTopics: TaxonomyTerm[]
}

export default function TravelGuideFilters({
    filters,
    travelGuideTopics,
}: TravelGuideFiltersProps) {
    const travelGuideTopicOptions = [
        {
            label: 'Any Topic',
            value: '',
        },
        ...travelGuideTopics.map((topic) => ({
            label: topic.name,
            value: String(topic.id),
        })),
    ]

    return (
        <form
            action="/travel-guides"
            method="get"
            className="grid gap-6 md:grid-cols-2"
        >
            <FilterSelect
                label="Guide Topic"
                name="travelGuideTopic"
                value={filters.travelGuideTopic}
                options={travelGuideTopicOptions}
            />

            <div className="flex items-end">
                <a
                    href="/travel-guides"
                    className="text-sm font-medium text-ink underline underline-offset-4 hover:text-violet"
                >
                    Clear filters
                </a>
            </div>
        </form>
    )
}