import { fetchAPI } from './core/fetch-api'
import { transformTestimonial } from '../transformers/testimonials'

import { Testimonial } from '@/types/testimonials'

export async function getTestimonials(): Promise<Testimonial[]> {
  const testimonials = await fetchAPI('testimonial?_embed')

  return testimonials.map(transformTestimonial)
}

export async function getTestimonialsForTour(
  tourId: number,
): Promise<Testimonial[]> {
  const testimonials = await fetchAPI(
    `testimonial?meta_key=related_tour&meta_value=${tourId}&_embed`,
  )

  return testimonials.map(transformTestimonial)
}
