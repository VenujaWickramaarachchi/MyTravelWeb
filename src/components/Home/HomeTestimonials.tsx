import type { Testimonial } from '@/types/testimonials'

interface HomeTestimonialsProps {
    testimonials: Testimonial[]
}

export default function HomeTestimonials({
    testimonials,
}: HomeTestimonialsProps) {
    if (!testimonials || testimonials.length === 0) {
        return null
    }

    return (
        <section className='bg-ivory/50 py-16 sm:py-20 border-y border-line'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center max-w-2xl mx-auto mb-10'>
                    <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-2'>
                        Guest Reflections
                    </p>

                    <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
                        What Our Travellers Say
                    </h2>

                    <p className='mt-4 text-ink/65 leading-relaxed'>
                        Hear from travellers who have experienced Sri Lanka with Viora Lanka.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {testimonials.slice(0, 3).map((testimonial) => (
                        <article
                            key={testimonial.id}
                            className='p-6 sm:p-7 rounded border border-line bg-paper space-y-5 flex flex-col justify-between'
                        >
                            <div className='space-y-4'>
                                {testimonial.rating !== null && (
                                    <div
                                        className='flex text-gold text-sm'
                                        aria-label={`Rating: ${testimonial.rating} out of 5`}
                                    >
                                        {Array.from({
                                            length: Math.min(
                                                5,
                                                Math.max(1, testimonial.rating || 5),
                                            ),
                                        }).map((_, index) => (
                                            <span key={index}>★</span>
                                        ))}
                                    </div>
                                )}

                                {testimonial.testimonialText && (
                                    <p className='font-serif text-base text-ink/85 italic leading-relaxed'>
                                        "{testimonial.testimonialText}"
                                    </p>
                                )}
                            </div>

                            <div className='pt-4 border-t border-line/60 flex items-center gap-3'>
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