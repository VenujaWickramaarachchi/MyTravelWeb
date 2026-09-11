import FilterSelect from '@/components/Filters/FilterSelect'

import type { FAQFilterParams } from '@/types/filter-types'
import type { TaxonomyTerm } from '@/types/taxonomy'

interface FAQFiltersProps {
    filters: FAQFilterParams
    faqCategories: TaxonomyTerm[]
}

export default function FAQFilters({
    filters,
    faqCategories,
}: FAQFiltersProps) {
    const faqCategoryOptions = [
        {
            label: 'Any Category',
            value: '',
        },
        ...faqCategories.map((category) => ({
            label: category.name,
            value: String(category.id),
        })),
    ]

    return (
        <form
            action="/faqs"
            method="get"
            className="grid gap-6 md:grid-cols-2"
        >
            <FilterSelect
                label="FAQ Category"
                name="faqCategory"
                value={filters.faqCategory}
                options={faqCategoryOptions}
            />

            <div className="flex items-end">
                <a
                    href="/faqs"
                    className="text-sm font-medium text-ink underline underline-offset-4 hover:text-violet"
                >
                    Clear filters
                </a>
            </div>
        </form>
    )
}