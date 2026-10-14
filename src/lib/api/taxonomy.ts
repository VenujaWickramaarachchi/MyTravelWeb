import { fetchAPI } from './core/fetch-api'
import { transformTaxonomyTerm } from '../transformers/taxonomy'
import type { TaxonomyTerm } from '@/types/taxonomy'

async function getTaxonomyTerms(
    endpoint: string,
): Promise<TaxonomyTerm[]> {
    const data = await fetchAPI(endpoint)

    return Array.isArray(data)
        ? data.map(transformTaxonomyTerm)
        : []
}

export async function getRegions(): Promise<TaxonomyTerm[]> {
    return getTaxonomyTerms('region')
}

export async function getTourTypes(): Promise<TaxonomyTerm[]> {
    return getTaxonomyTerms('tour-type')
}
export async function getExperienceTypes(): Promise<TaxonomyTerm[]> {
    return getTaxonomyTerms('experience-type')
}

export async function getAttractionTypes(): Promise<TaxonomyTerm[]> {
    return getTaxonomyTerms('attraction-type')
}

export async function getAccommodationTypes(): Promise<TaxonomyTerm[]> {
    return getTaxonomyTerms('accommodation-type')
}

export async function getFAQCategories(): Promise<TaxonomyTerm[]> {
    return getTaxonomyTerms('faq-category')
}

export async function getTravelGuideTopics(): Promise<TaxonomyTerm[]> {
    return getTaxonomyTerms('travel-guide-topic')
}

export async function getItineraryLengths(): Promise<TaxonomyTerm[]> {
    return getTaxonomyTerms('itinerary-length')
}