import FilterSelect from '@/components/Filters/FilterSelect'

import type { TaxonomyTerm } from '@/types/taxonomy'

interface FilterOption {
    label: string
    value: string
}

interface ExperienceFiltersProps {
    region?: string
    experienceType?: string
    regions: TaxonomyTerm[]
    experienceTypes: TaxonomyTerm[]
}

export default function ExperienceFilters({
    region,
    experienceType,
    regions,
    experienceTypes,
}: ExperienceFiltersProps) {
    const regionOptions = [
        { label: 'Any Region', value: '' },
        ...regions.map((region) => ({
            label: region.name,
            value: String(region.id),
        })),
    ]

    const experienceTypeOptions = [
        { label: 'Any Experience Type', value: '' },
        ...experienceTypes.map((experienceType) => ({
            label: experienceType.name,
            value: String(experienceType.id),
        })),
    ]

    return (
        <form
            action="/experiences"
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
                    label="Experience Type"
                    name="experienceType"
                    value={experienceType}
                    options={experienceTypeOptions}
                />
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
                <p className="text-sm text-ink/60">
                    Refine your Sri Lanka experience selection.
                </p>

                <a
                    href="/experiences"
                    className="text-xs font-semibold uppercase tracking-[0.16em] text-violet hover:text-violet-deep"
                >
                    Clear filters
                </a>
            </div>
        </form>
    )
}