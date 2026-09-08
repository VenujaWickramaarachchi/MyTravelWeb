import Link from 'next/link'
import { Tour } from '@/types/tour'

interface TourCTAProps {
  tour: Tour
  className?: string
}

export default function TourCTA({ tour, className = '' }: TourCTAProps) {
  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='relative overflow-hidden bg-violet-deep text-ivory rounded-md border border-white/10 p-10 sm:p-16 text-center space-y-6'>
          <p className='text-xs uppercase tracking-[0.25em] text-gold font-semibold'>
            Custom Tailor-Made Travel
          </p>

          <h2 className='font-serif text-3xl sm:text-4xl lg:text-4.5xl font-normal text-ivory leading-tight'>
            Ready to Experience {tour.title}?
          </h2>

          <p className='text-base sm:text-lg text-lilac leading-relaxed max-w-2xl mx-auto'>
            Every itinerary can be completely customized. Adjust your travel dates, choose
            preferred hotels, add private experiences, or modify the route to match your pace.
          </p>

          <div className='pt-4 flex flex-col sm:flex-row items-center justify-center gap-4'>
            <Link
              href='/contact'
              className='w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-ink bg-gold hover:bg-gold-deep rounded transition-colors duration-150 shadow-md'
            >
              Enquire About This Tour
            </Link>

            <Link
              href='/contact'
              className='w-full sm:w-auto px-8 py-3.5 text-base font-medium text-ivory border border-white/25 hover:border-gold hover:text-gold rounded transition-colors duration-150'
            >
              Customize Itinerary
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
