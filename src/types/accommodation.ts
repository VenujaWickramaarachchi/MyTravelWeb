export interface Accommodation {
  id: number
  title: string
  slug: string

  // Taxonomies
  accommodationType: number[]
  region: number[]

  // Relationships
  destination: number | null

  // Accommodation information
  heroTitle: string
  heroSubTitle: string
  heroImage: any | null

  description: string
  whyStayHere: string
  gallery: any | null
  stars: number | null
  amenities: string[]
  price: string

  overview: string

  location: string
  address: string
  latitude: number | null
  longitude: number | null
  googleMapsUrl: string

  officialWebsite: string
  bookingUrl: string
  contactPhone: string
  email: string

  // SEO / AEO
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  aeoQuestion: string
  aeoAnswer: string
}
