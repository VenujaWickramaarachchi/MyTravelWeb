import { MediaImage } from './media-image'

export interface Testimonial {
  id: number
  title: string
  slug: string

  customerName: string
  customerCountry: string
  rating: number | null
  testimonialText: string
  customerImage: MediaImage | null

  relatedTour: number | null
}
