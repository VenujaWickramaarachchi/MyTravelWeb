import Link from 'next/link'
import { Tour } from '@/types/tour'

interface TourHeroProps {
  tour: Tour
}

export default function TourHero({ tour }: TourHeroProps) {
  const hasDuration = tour.durationDays || tour.durationNights

  return (
    <section className='relative bg-violet-deep text-ivory overflow-hidden py-20 sm:py-28 border-b border-white/10'>
      {/* Background image overlay */}
      {tour.heroImage?.url && (
        <div className='absolute inset-0 z-0'>
          <img
            src={tour.heroImage.url}
            alt={tour.heroImage.alt || tour.title}
            className='w-full h-full object-cover opacity-30'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-violet-deep via-violet-deep/65 to-violet-deep/80' />
        </div>
      )}

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-3xl space-y-5'>
          {/* Metadata badges */}
          <div className='flex flex-wrap items-center gap-2.5'>
            <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs tracking-[0.2em] uppercase font-semibold text-gold'>
              Private Tour
            </span>

            {hasDuration && (
              <span className='px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-ivory uppercase tracking-wider'>
                {tour.durationDays ? `${tour.durationDays} Days` : ''}
                {tour.durationNights ? ` / ${tour.durationNights} Nights` : ''}
              </span>
            )}

            {tour.tourStyle && (
              <span className='px-3 py-1 rounded-full bg-violet/60 border border-violet/40 text-xs font-medium text-lilac'>
                {tour.tourStyle}
              </span>
            )}
          </div>

          <h1 className='font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-ivory tracking-tight leading-[1.12]'>
            {tour.heroTitle || tour.title}
          </h1>

          {tour.heroSubtitle && (
            <p className='text-lg sm:text-xl text-lilac leading-relaxed font-light'>
              {tour.heroSubtitle}
            </p>
          )}

          {/* Pricing & CTA */}
          <div className='pt-4 flex flex-wrap items-center gap-6'>
            {tour.priceFrom && (
              <div className='space-y-0.5'>
                <span className='text-xs uppercase tracking-wider text-lilac/80 block font-medium'>
                  Guide Price
                </span>
                <span className='text-2xl sm:text-3xl font-bold text-gold font-sans'>
                  From {tour.currency || '$'} {tour.priceFrom}
                </span>
                {tour.priceDescription && (
                  <span className='text-xs text-lilac/70 block'>
                    {tour.priceDescription}
                  </span>
                )}
              </div>
            )}

            <Link
              href='/contact'
              className='inline-flex items-center px-6 py-3 text-sm font-semibold text-ink bg-gold hover:bg-gold-deep rounded transition-colors duration-150 shadow-md'
            >
              Enquire About This Tour
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
