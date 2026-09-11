import FilterSelect from '@/components/Filters/FilterSelect'
import type { TaxonomyTerm } from '@/types/taxonomy'

interface AccommodationFiltersProps {
    region?: string
    accommodationType?: string
    regions: TaxonomyTerm[]
    accommodationTypes: TaxonomyTerm[]
}

export default function AccommodationFilters({
    region,
    accommodationType,
    regions,
    accommodationTypes,
}: AccommodationFiltersProps) {
    const regionOptions = [
        { label: 'Any Region', value: '' },
        ...regions.map((region) => ({
            label: region.name,
            value: String(region.id),
        })),
    ]

    const accommodationTypeOptions = [
        { label: 'Any Accommodation Type', value: '' },
        ...accommodationTypes.map((accommodationType) => ({
            label: accommodationType.name,
            value: String(accommodationType.id),
        })),
    ]

    return (
        <form
            action="/accommodations"
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
                    label="Accommodation Type"
                    name="accommodationType"
                    value={accommodationType}
                    options={accommodationTypeOptions}
                />
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
                <p className="text-sm text-ink/60">
                    Refine your Sri Lanka accommodation selection.
                </p>

                <a
                    href="/accommodations"
                    className="text-xs font-semibold uppercase tracking-[0.16em] text-violet hover:text-violet-deep"
                >
                    Clear filters
                </a>
            </div>
        </form>
    )
}