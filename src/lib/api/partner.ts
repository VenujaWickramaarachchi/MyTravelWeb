import { fetchAPI } from './core/fetch-api'

import { transformPartner } from '../transformers/partner'

import { Partner } from '@/types/partner'

export async function getPartners(): Promise<Partner[]> {
  const partners = await fetchAPI('partner?_embed')

  return partners
    .map(transformPartner)
    .sort(
      (a: Partner, b: Partner) =>
        (a.displayOrder ?? 999) - (b.displayOrder ?? 999),
    )
}

export async function getPartner(slug: string): Promise<Partner | null> {
  const url =
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}` +
    `/wp-json/wp/v2/partner?slug=${slug}&_embed`

  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching partner: ${slug}`)
  }

  const data = await res.json()
  const partner = data[0]

  if (!partner) {
    return null
  }

  return transformPartner(partner)
}
