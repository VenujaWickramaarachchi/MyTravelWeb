import FilterSelect from '@/components/Filters/FilterSelect'

import type { TaxonomyTerm } from '@/types/taxonomy'

interface AttractionFiltersProps {
    region?: string
    attractionType?: string
    regions: TaxonomyTerm[]
    attractionTypes: TaxonomyTerm[]
}

export default function AttractionFilters({
    region,
    attractionType,
    regions,
    attractionTypes,
}: AttractionFiltersProps) {
    const regionOptions = [
        { label: 'Any Region', value: '' },
        ...regions.map((region) => ({
            label: region.name,
            value: String(region.id),
        })),
    ]

    const attractionTypeOptions = [
        { label: 'Any Attraction Type', value: '' },
        ...attractionTypes.map((attractionType) => ({
            label: attractionType.name,
            value: String(attractionType.id),
        })),
    ]

    return (
        <form
            action="/attractions"
            method="get"
            className="border-y border-line py-6"
        >
            <div className="grid gap-4 sm:grid-cols-2">
                <FilterSelect
                    label="Region"
                    name="region"
                    value={region}
                    options={regionOptions}
                />

                <FilterSelect
                    label="Attraction Type"
                    name="attractionType"
                    value={attractionType}
                    options={attractionTypeOptions}
                />
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
                <p className="text-sm text-ink/60">
                    Refine your Sri Lanka attraction selection.
                </p>

                <a
                    href="/attractions"
                    className="text-xs font-semibold uppercase tracking-[0.16em] text-violet hover:text-violet-deep"
                >
                    Clear filters
                </a>
            </div>
        </form>
    )
}