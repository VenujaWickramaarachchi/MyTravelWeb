import type { FAQ } from '@/types/faq'
import type { FAQFilterParams } from '@/types/filter-types'

export function filterFAQs(
    faqs: FAQ[],
    filters: FAQFilterParams,
): FAQ[] {
    return faqs
        .filter((faq) => {
            if (
                filters.faqCategory &&
                !faq.faqCategory?.includes(
                    Number(filters.faqCategory),
                )
            ) {
                return false
            }

            return true
        })
}