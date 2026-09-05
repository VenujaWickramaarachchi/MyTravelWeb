import { SearchResult } from '@/types/search'

interface SearchInput {
  id: number
  slug: string
  title?: {
    rendered?: string
  }
  excerpt?: {
    rendered?: string
  }
  type: string
  featured_media?: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string
    }>
  }
}

function getSearchBasePath(type: SearchResult['type']): string {
  const paths: Record<SearchResult['type'], string> = {
    tour: 'tours',
    destination: 'destinations',
    experience: 'experiences',
    attraction: 'attractions',
    accommodation: 'accommodations',
    itinerary: 'itineraries',
    'travel-guide': 'travel-guides',
    faq: 'faqs',
  }

  return paths[type]
}

export function transformSearchResult(
  item: SearchInput,
  type: SearchResult['type'],
): SearchResult {
  return {
    id: item.id,
    title: item.title?.rendered || '',
    slug: item.slug || '',
    type,
    excerpt: item.excerpt?.rendered || '',
    url: `/${getSearchBasePath(type)}/${item.slug}`,
    image: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
  }
}
