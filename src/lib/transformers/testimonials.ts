import { MediaImage } from '@/types/media-image'

function normalizeCustomerImage(image: any): MediaImage | null {
  if (!image || typeof image !== 'object') {
    return null
  }

  const id = Number(image.id ?? image.ID ?? 0)

  const url = image.url ?? ''

  if (!id || !url) {
    return null
  }

  return {
    id,
    url,
    alt: image.alt ?? '',
    width: image.width ? Number(image.width) : null,
    height: image.height ? Number(image.height) : null,
    title: image.title ?? '',
  }
}

export function transformTestimonial(testimonial: any) {
  return {
    id: testimonial.id,
    title: testimonial.title?.rendered || '',
    slug: testimonial.slug || '',

    customerName: testimonial.acf?.customer_name || '',

    customerCountry: testimonial.acf?.customer_country || '',

    rating: testimonial.acf?.rating ?? null,

    testimonialText: testimonial.acf?.testimonial_text || '',

    customerImage: normalizeCustomerImage(testimonial.acf?.customer_image),

    relatedTour: testimonial.acf?.related_tour || null,
  }
}
