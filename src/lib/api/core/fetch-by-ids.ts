import { fetchAPI } from './fetch-api'

export async function fetchByIds(endpoint: string, ids: number[]) {
  if (!ids || ids.length === 0) {
    return []
  }

  return fetchAPI(`${endpoint}?include=${ids.join(',')}&_embed`)
}
