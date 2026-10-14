import Link from 'next/link'
import { ItineraryPage } from '@/types/pages/itinerary-page'

interface Props {
  itinerary: ItineraryPage
  className?: string
}

export default function ItineraryCTA({
  itinerary,
  className = '',
}: Props) {
  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='relative overflow-hidden bg-violet-deep text-ivory rounded-md border border-white/10 p-10 sm:p-16 text-center space-y-6'>
          <p className='text-xs uppercase tracking-[0.25em] text-gold font-semibold'>
            Custom Journey Planning
          </p>

          <h2 className='font-serif text-3xl sm:text-4xl lg:text-4.5xl font-normal text-ivory leading-tight'>
            Plan Your Journey Along This Route
          </h2>

          <p className='text-base sm:text-lg text-lilac leading-relaxed max-w-2xl mx-auto'>
            Inspired by {itinerary.title}? Connect with our destination designers to adjust
            the route, pacing, and private experiences for your tailor-made holiday.
          </p>

          <div className='pt-4'>
            <Link
              href='/contact'
              className='inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-ink bg-gold hover:bg-gold-deep rounded transition-colors duration-150 shadow-md'
            >
              Enquire About This Itinerary
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
