import { fetchAPI } from './core/fetch-api'
import { transformSearchResult } from '../transformers/search'
import { SearchResult } from '@/types/search'

const SEARCH_TYPES: {
  endpoint: string
  type: SearchResult['type']
}[] = [
  { endpoint: 'tour', type: 'tour' },
  { endpoint: 'destination', type: 'destination' },
  { endpoint: 'experience', type: 'experience' },
  { endpoint: 'attraction', type: 'attraction' },
  { endpoint: 'accommodation', type: 'accommodation' },
  { endpoint: 'itinerary', type: 'itinerary' },
  { endpoint: 'travel-guide', type: 'travel-guide' },
  { endpoint: 'faq', type: 'faq' },
]

export async function searchContent(query: string): Promise<SearchResult[]> {
  const trimmedQuery = query.trim()

  if (!trimmedQuery) {
    return []
  }

  const results = await Promise.all(
    SEARCH_TYPES.map(async ({ endpoint, type }) => {
      const items = await fetchAPI(
        `${endpoint}?search=${encodeURIComponent(trimmedQuery)}&per_page=100&_embed`,
      )

      return items.map((item: any) => transformSearchResult(item, type))
    }),
  )

  return results.flat().sort((a, b) => a.title.localeCompare(b.title))
}
