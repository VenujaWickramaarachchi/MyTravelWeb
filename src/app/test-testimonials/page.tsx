import { getTestimonials } from '@/lib/wordpress'

export default async function TestTestimonialsPage() {
  const testimonials = await getTestimonials()

  return <pre>{JSON.stringify(testimonials, null, 2)}</pre>
}
