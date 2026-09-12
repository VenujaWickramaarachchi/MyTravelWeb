import FilterSelect from './FilterSelect'

import {
    tourDurationOptions,
    tourStyleOptions,
    tourPriceOptions,
} from '@/lib/filters/tour-filter-options'

import type { TaxonomyTerm } from '@/types/taxonomy'

interface TourFiltersProps {
    region?: string
    tourType?: string
    duration?: string
    tourStyle?: string
    price?: string
    sort?: string
    regions: TaxonomyTerm[]
    tourTypes: TaxonomyTerm[]
}

export default function TourFilters({
    region,
    tourType,
    duration,
    tourStyle,
    price,
    sort,
    regions,
    tourTypes,
}: TourFiltersProps) {
    const regionOptions = [
        { label: 'Any Region', value: '' },
        ...regions.map((region) => ({
            label: region.name,
            value: String(region.id),
        })),
    ]

    const tourTypeOptions = [
        { label: 'Any Tour Type', value: '' },
        ...tourTypes.map((tourType) => ({
            label: tourType.name,
            value: String(tourType.id),
        })),
    ]

    const tourSortOptions = [
        { label: 'Featured First', value: '' },
        { label: 'Price: Low to High', value: 'price-asc' },
        { label: 'Price: High to Low', value: 'price-desc' },
        { label: 'Duration: Shortest First', value: 'duration-asc' },
        { label: 'Duration: Longest First', value: 'duration-desc' },
    ]

    return (
        <form
            action="/tours"
            method="get"
            className="border-y border-line py-6"
        >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
                <FilterSelect
                    label="Region"
                    name="region"
                    value={region}
                    options={regionOptions}
                />

                <FilterSelect
                    label="Tour Type"
                    name="tourType"
                    value={tourType}
                    options={tourTypeOptions}
                />

                <FilterSelect
                    label="Duration"
                    name="duration"
                    value={duration}
                    options={tourDurationOptions}
                />

                <FilterSelect
                    label="Tour Style"
                    name="tourStyle"
                    value={tourStyle}
                    options={tourStyleOptions}
                />

                <FilterSelect
                    label="Price"
                    name="price"
                    value={price}
                    options={tourPriceOptions}
                />
                <FilterSelect
                    label="Sort"
                    name="sort"
                    value={sort}
                    options={tourSortOptions}
                />
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
                <p className="text-sm text-ink/60">
                    Refine your Sri Lanka tour selection.
                </p>

                <a
                    href="/tours"
                    className="text-xs font-semibold uppercase tracking-[0.16em] text-violet hover:text-violet-deep"
                >
                    Clear filters
                </a>
            </div>
        </form>
    )
}