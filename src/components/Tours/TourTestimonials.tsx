import { TourPage } from '@/types/pages/tour-page'

interface TourTestimonialsProps {
  tour: TourPage
  className?: string
}

export default function TourTestimonials({
  tour,
  className = '',
}: TourTestimonialsProps) {
  const testimonials = tour.relationships.testimonials

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <section className={`my-16 sm:my-20 bg-ivory/60 py-16 border-y border-line ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-2'>
            Guest Reflections
          </p>
          <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
            What Travellers Say
          </h2>
        </header>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className='p-6 sm:p-7 rounded border border-line bg-paper space-y-4 flex flex-col justify-between'
            >
              <div className='space-y-3'>
                {testimonial.rating !== null && (
                  <div className='flex text-gold text-sm' aria-label={`Rating: ${testimonial.rating} out of 5`}>
                    {Array.from({ length: Math.min(5, Math.max(1, testimonial.rating || 5)) }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                )}

                {testimonial.testimonialText && (
                  <p className='font-serif text-base text-ink/85 italic leading-relaxed'>
                    "{testimonial.testimonialText}"
                  </p>
                )}
              </div>

              <div className='pt-3 border-t border-line/60 flex items-center gap-3'>
                {testimonial.customerImage?.url && (
                  <img
                    src={testimonial.customerImage.url}
                    alt={testimonial.customerName}
                    className='w-10 h-10 rounded-full object-cover border border-line'
                  />
                )}
                <div>
                  <h3 className='text-sm font-semibold text-ink leading-snug'>
                    {testimonial.customerName}
                  </h3>
                  {testimonial.customerCountry && (
                    <span className='text-xs text-ink/60'>
                      {testimonial.customerCountry}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
