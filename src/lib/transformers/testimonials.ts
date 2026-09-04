export function transformTestimonial(testimonial: any) {
  return {
    id: testimonial.id,
    title: testimonial.title?.rendered || '',
    slug: testimonial.slug || '',

    // Customer Information
    customerName: testimonial.acf?.customer_name || '',

    customerCountry: testimonial.acf?.customer_country || '',

    rating: testimonial.acf?.rating ?? null,

    testimonialText: testimonial.acf?.testimonial_text || '',

    customerImage: testimonial.acf?.customer_image || null,

    // Relationship
    relatedTour: testimonial.acf?.related_tour || null,
  }
}
