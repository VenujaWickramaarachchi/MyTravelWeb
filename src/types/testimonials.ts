export interface Testimonial {
  id: number
  title: string
  slug: string

  // Customer Information
  customerName: string
  customerCountry: string
  rating: number | null
  testimonialText: string
  customerImage: any | null

  // Relationship
  relatedTour: number | null
}
