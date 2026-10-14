import type { TaxonomyTerm } from '@/types/taxonomy'

export function transformTaxonomyTerm(data: any): TaxonomyTerm {
    return {
        id: data.id,
        name: data.name,
        slug: data.slug,
    }
}