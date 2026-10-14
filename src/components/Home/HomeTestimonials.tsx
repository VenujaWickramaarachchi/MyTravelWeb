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

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
                    {testimonials.slice(0, 3).map((testimonial) => (
                        <article
                            key={testimonial.id}
                            className='p-7 sm:p-8 rounded-[20px] border border-line/80 bg-paper flex flex-col justify-between shadow-sm hover:shadow-md hover:border-violet/30 transition-all duration-300'
                        >
                            <div className='space-y-4'>
                                {testimonial.rating !== null && (
                                    <div
                                        className='flex items-center gap-1 text-gold text-sm'
                                        aria-label={`Rating: ${testimonial.rating} out of 5`}
                                    >
                                        {Array.from({
                                            length: Math.min(
                                                5,
                                                Math.max(1, testimonial.rating || 5),
                                            ),
                                        }).map((_, index) => (
                                            <svg
                                                key={index}
                                                className='w-4 h-4 fill-gold text-gold'
                                                viewBox='0 0 20 20'
                                                aria-hidden='true'
                                            >
                                                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                            </svg>
                                        ))}
                                    </div>
                                )}

                                {testimonial.testimonialText && (
                                    <p className='font-serif text-base sm:text-lg text-ink/85 italic leading-relaxed'>
                                        "{testimonial.testimonialText}"
                                    </p>
                                )}
                            </div>

                            <div className='pt-5 mt-6 border-t border-line/70 flex items-center gap-3.5'>
                                {testimonial.customerImage?.url && (
                                    <img
                                        src={testimonial.customerImage.url}
                                        alt={testimonial.customerName}
                                        className='w-11 h-11 rounded-full object-cover border-2 border-gold/30 shadow-xs'
                                    />
                                )}

                                <div>
                                    <h3 className='text-sm font-semibold text-ink leading-snug'>
                                        {testimonial.customerName}
                                    </h3>

                                    {testimonial.customerCountry && (
                                        <span className='text-xs text-ink/60 block mt-0.5 font-light'>
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