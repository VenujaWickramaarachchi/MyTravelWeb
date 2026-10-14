import FilterSelect from '@/components/Filters/FilterSelect'

import type { TaxonomyTerm } from '@/types/taxonomy'

interface FilterOption {
    label: string
    value: string
}

interface DestinationFiltersProps {
    region?: string
    destinationType?: string
    regions: TaxonomyTerm[]
    destinationTypeOptions: FilterOption[]
}

export default function DestinationFilters({
    region,
    destinationType,
    regions,
    destinationTypeOptions,
}: DestinationFiltersProps) {
    const regionOptions = [
        { label: 'Any Region', value: '' },
        ...regions.map((region) => ({
            label: region.name,
            value: String(region.id),
        })),
    ]

    return (
        <form
            action="/destinations"
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
                    label="Destination Type"
                    name="destinationType"
                    value={destinationType}
                    options={destinationTypeOptions}
                />
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
                <p className="text-sm text-ink/60">
                    Refine your Sri Lanka destination selection.
                </p>

                <a
                    href="/destinations"
                    className="text-xs font-semibold uppercase tracking-[0.16em] text-violet hover:text-violet-deep"
                >
                    Clear filters
                </a>
            </div>
        </form>
    )
}