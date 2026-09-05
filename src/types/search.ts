export interface SearchResult {
  id: number
  title: string
  slug: string
  type:
    | 'tour'
    | 'destination'
    | 'experience'
    | 'attraction'
    | 'accommodation'
    | 'itinerary'
    | 'travel-guide'
    | 'faq'
  excerpt: string
  url: string
  image: string | null
}
