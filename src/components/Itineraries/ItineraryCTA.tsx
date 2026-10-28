import Link from 'next/link'
import { ItineraryPage } from '@/types/pages/itinerary-page'
import { ArrowRightIcon } from '@/components/Shared/CardIcons'

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
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='relative overflow-hidden bg-violet-deep text-ivory rounded-3xl border border-white/10 p-10 sm:p-16 text-center space-y-6 shadow-xl'>
          <p className='text-xs uppercase tracking-[0.25em] text-gold font-semibold'>
            Custom Journey Planning
          </p>

          <h2 className='font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ivory leading-tight'>
            Plan Your Journey Along This Route
          </h2>

          <p className='text-base sm:text-lg text-lilac leading-relaxed max-w-2xl mx-auto font-light'>
            Inspired by {itinerary.title}? Connect with our destination designers to adjust
            the route, pacing, and private experiences for your tailor-made holiday.
          </p>

          <div className='pt-2 flex flex-wrap items-center justify-center gap-4'>
            <Link
              href={`/contact?itinerary=${encodeURIComponent(itinerary.title)}`}
              className='inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-ink bg-gold hover:bg-gold-deep rounded-xl transition-colors duration-200 shadow-md gap-2'
            >
              <span>Enquire About This Itinerary</span>
              <ArrowRightIcon className='w-4 h-4' />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
