import { TourPage } from '@/types/pages/tour-page'

interface TourTestimonialsProps {
  tour: TourPage
}

export default function TourTestimonials({ tour }: TourTestimonialsProps) {
  const testimonials = tour.relationships.testimonials

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section>
      <h2>Testimonials</h2>

      {testimonials.map((testimonial) => (
        <article key={testimonial.id}>
          <h3>{testimonial.customerName}</h3>

          {testimonial.customerCountry && <p>{testimonial.customerCountry}</p>}

          {testimonial.rating !== null && <p>Rating: {testimonial.rating}/5</p>}

          {testimonial.testimonialText && <p>{testimonial.testimonialText}</p>}

          {testimonial.customerImage && (
            <img
              src={testimonial.customerImage.url}
              alt={testimonial.customerImage.alt || testimonial.customerName}
            />
          )}
        </article>
      ))}
    </section>
  )
}
