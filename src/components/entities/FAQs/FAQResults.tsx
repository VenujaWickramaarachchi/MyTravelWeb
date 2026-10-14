'use client'

import { useState } from 'react'

import FAQItem from '@/components/content/FAQ/FAQItem'
import LoadMore from '@/components/entities/LoadMore'

import type { FAQ } from '@/types/faq'
import type { FAQFilterParams } from '@/types/filter-types'

interface FAQResultsProps {
    initialFAQs: FAQ[]
    initialTotal: number
    initialTotalPages: number
    filters: FAQFilterParams
}

export default function FAQResults({
    initialFAQs,
    initialTotal,
    initialTotalPages,
    filters,
}: FAQResultsProps) {
    const [faqs, setFAQs] = useState<FAQ[]>(initialFAQs)

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages] = useState(initialTotalPages)
    const [isLoading, setIsLoading] = useState(false)

    const loadMore = async () => {
        if (isLoading || currentPage >= totalPages) {
            return
        }

        setIsLoading(true)

        try {
            const nextPage = currentPage + 1

            const params = new URLSearchParams({
                page: String(nextPage),
            })

            if (filters.faqCategory) {
                params.set(
                    'faqCategory',
                    filters.faqCategory,
                )
            }

            const response = await fetch(
                `/api/faqs?${params.toString()}`,
            )

            if (!response.ok) {
                throw new Error('Failed to load more FAQs')
            }

            const data = await response.json()

            setFAQs((current) => [
                ...current,
                ...data.faqs,
            ])

            setCurrentPage(nextPage)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    if (initialTotal === 0) {
        return (
            <div className="p-12 text-center rounded border border-line bg-ivory/50 space-y-2">
                <h2 className="font-serif text-xl font-medium text-ink">
                    No FAQs found
                </h2>

                <p className="text-sm text-ink/70">
                    Try adjusting your filter to explore more frequently asked questions.
                </p>
            </div>
        )
    }

    return (
        <section className="space-y-8">
            <div className="space-y-5">
                {faqs.map((faq) => (
                    <FAQItem
                        key={faq.id}
                        faq={faq}
                    />
                ))}
            </div>

            <LoadMore
                hasMore={currentPage < totalPages}
                isLoading={isLoading}
                onClick={loadMore}
            />
        </section>
    )
}