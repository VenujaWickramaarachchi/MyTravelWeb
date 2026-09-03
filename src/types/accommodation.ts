export interface Accommodation {
  id: number

  title: string

  slug: string

  // Taxonomies

  accommodationType: number[]

  region: number[]

  destination: number | null

  // Hero

  heroTitle: string

  heroSubTitle: string

  heroImage: any | null

  // Content

  description: string

  whyStayHere: string

  gallery: any | null

  stars: string | number | null

  amenities: any[]

  price: string

  overview: string

  // Location

  location: string

  address: string

  latitude: number | null

  longitude: number | null

  googleMapsUrl: string

  // Contact

  officialWebsite: string

  bookingUrl: string

  contactPhone: string

  email: string

  // SEO

  seoTitle: string

  seoDescription: string

  seoKeywords: string

  // AEO

  aeoQuestion: string

  aeoAnswer: string
}
