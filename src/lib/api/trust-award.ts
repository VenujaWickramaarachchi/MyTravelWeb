import { fetchAPI } from './core/fetch-api'

import { transformTrustAward } from '../transformers/trust-award'

import { TrustAward } from '@/types/trust-award'

export async function getTrustAwards(): Promise<TrustAward[]> {
  const trustAwards = await fetchAPI('trust_award?_embed')

  return trustAwards
    .map(transformTrustAward)
    .sort(
      (a: TrustAward, b: TrustAward) =>
        (a.displayOrder ?? 999) - (b.displayOrder ?? 999),
    )
}
