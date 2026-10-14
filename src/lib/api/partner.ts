import { fetchAPI } from './core/fetch-api'

import { transformPartner } from '../transformers/partner'

import { Partner } from '@/types/partner'

export async function getPartners(): Promise<Partner[]> {
  const partners = await fetchAPI('partner?_embed')

  return (Array.isArray(partners) ? partners : [])
    .map(transformPartner)
    .sort(
      (a: Partner, b: Partner) =>
        (a.displayOrder ?? 999) - (b.displayOrder ?? 999),
    )
}

export async function getPartner(slug: string): Promise<Partner | null> {
  try {
    const data = await fetchAPI(`partner?slug=${slug}&_embed`)
    const partner = Array.isArray(data) ? data[0] : null

    if (!partner) {
      return null
    }

    return transformPartner(partner)
  } catch (error) {
    console.warn(`[getPartner] Error fetching partner ${slug}:`, error)
    return null
  }
}
