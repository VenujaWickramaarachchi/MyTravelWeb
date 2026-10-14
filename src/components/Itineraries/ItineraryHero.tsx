import Link from 'next/link'
import { ItineraryPage } from '@/types/pages/itinerary-page'

interface Props {
  itinerary: ItineraryPage
}

export default function ItineraryHero({ itinerary }: Props) {
  const hasRoute = itinerary.startingLocation || itinerary.endingLocation

  return (
    <section className='relative bg-violet-deep text-ivory overflow-hidden py-20 sm:py-28 border-b border-white/10'>
      {/* Background image overlay */}
      {itinerary.heroImage?.url && (
        <div className='absolute inset-0 z-0'>
          <img
            src={itinerary.heroImage.url}
            alt={itinerary.heroImage.alt || itinerary.title}
            className='w-full h-full object-cover opacity-35'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-violet-deep via-violet-deep/60 to-violet-deep/80' />
        </div>
      )}

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-3xl space-y-4'>
          <div className='flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold'>
            <span>Curated Route</span>
            {hasRoute && (
              <>
                <span className='text-ivory/50'>•</span>
                <span>
                  {itinerary.startingLocation}
                  {itinerary.startingLocation && itinerary.endingLocation && ' → '}
                  {itinerary.endingLocation}
                </span>
              </>
            )}
          </div>

          <h1 className='font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-ivory tracking-tight leading-[1.12]'>
            {itinerary.heroTitle || itinerary.title}
          </h1>

          {itinerary.heroSubtitle && (
            <p className='text-lg sm:text-xl text-lilac leading-relaxed font-light'>
              {itinerary.heroSubtitle}
            </p>
          )}

          {itinerary.shortDescription && (
            <p className='text-base text-ivory/85 leading-relaxed pt-1'>
              {itinerary.shortDescription}
            </p>
          )}

          <div className='pt-3'>
            <Link
              href='/contact'
              className='inline-flex items-center px-6 py-3 text-sm font-semibold text-ink bg-gold hover:bg-gold-deep rounded transition-colors duration-150 shadow-md'
            >
              Plan With This Itinerary
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
