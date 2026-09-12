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
export async function searchContent(
  query: string,
  perType = 100,
): Promise<SearchResult[]> {
  const trimmedQuery = query.trim()

  if (!trimmedQuery) {
    return []
  }

  const results = await Promise.all(
    SEARCH_TYPES.map(async ({ endpoint, type }) => {
      try {
        const items = await fetchAPI(
          `${endpoint}?search=${encodeURIComponent(trimmedQuery)}&per_page=${perType}&_embed`,
        )

        return items.map((item: any) =>
          transformSearchResult(item, type),
        )
      } catch (error) {
        console.error(
          `Search failed for ${endpoint}:`,
          error,
        )

        return []
      }
    }),
  )

  const flattenedResults = results.flat()

  return flattenedResults.sort((a, b) => {
    const queryLower = trimmedQuery.toLowerCase()
    const titleA = a.title.toLowerCase()
    const titleB = b.title.toLowerCase()

    const scoreA =
      titleA === queryLower
        ? 0
        : titleA.startsWith(queryLower)
          ? 1
          : titleA.includes(queryLower)
            ? 2
            : 3

    const scoreB =
      titleB === queryLower
        ? 0
        : titleB.startsWith(queryLower)
          ? 1
          : titleB.includes(queryLower)
            ? 2
            : 3

    if (scoreA !== scoreB) {
      return scoreA - scoreB
    }

    return titleA.localeCompare(titleB)
  })
}
