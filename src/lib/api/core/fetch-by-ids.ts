import { fetchAPI } from './fetch-api'

export async function fetchByIds(
  endpoint: string,
  ids: number | number[] | null | undefined,
) {
  if (!ids) {
    return []
  }

  const normalizedIds = Array.isArray(ids) ? ids : [ids]

  if (normalizedIds.length === 0) {
    return []
  }

  return fetchAPI(`${endpoint}?include=${normalizedIds.join(',')}&_embed`)
}
