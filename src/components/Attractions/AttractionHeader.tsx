import type { Attraction } from '@/types/attraction'
import Breadcrumbs from '@/components/Shared/Breadcrumbs'
import {
  BespokeLotusIcon,
  SunSeasonIcon,
  ClockDurationIcon,
  LocationPinIcon,
  CompassVibeIcon,
} from '@/components/Shared/CardIcons'

interface Props {
  attraction: Attraction
  breadcrumbItems: Array<{ label: string; href?: string }>
}

export default function AttractionHeader({ attraction, breadcrumbItems }: Props) {
  // Determine classification or style label
  const classification =
    attraction.location && attraction.location.toLowerCase().includes('sigiriya')
      ? 'UNESCO World Heritage Site'
      : 'Ceylon Heritage & Nature Wonder'

  const bestTime = attraction.bestTime || 'Early Morning / Late Afternoon'
  const duration = attraction.typicalVisitDuration || '2 — 3 Hours'
  const locationText = attraction.location || 'Cultural Triangle, Sri Lanka'

  return (
    <header className='pt-6 sm:pt-8 pb-4'>
      {/* Breadcrumbs Navigation */}
      <div className='mb-4 sm:mb-6'>
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className='space-y-3 sm:space-y-4'>
        {/* Eyebrow Badge */}
        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper border border-line text-xs font-medium uppercase tracking-widest text-ink'>
          <BespokeLotusIcon className='w-3.5 h-3.5 text-gold' />
          <span>Island Landmark</span>
          {attraction.location && (
            <>
              <span className='text-line'>•</span>
              <span className='text-gold-deep'>{attraction.location}</span>
            </>
          )}
        </div>

        {/* Attraction Main Title (H1: ~28-30px mobile, 36-40px tablet, 48-60px desktop) */}
        <h1 className='font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-ink tracking-tight leading-snug md:leading-tight -ml-[2px] max-w-4xl'>
          {attraction.heroTitle || attraction.title}
        </h1>

        {/* Compelling Subtitle (Body text: 15px mobile, 16px tablet/desktop, leading-relaxed) */}
        {(attraction.heroSubtitle || attraction.shortDescription) && (
          <p className='text-[15px] sm:text-base md:text-lg text-ink/80 leading-relaxed font-light max-w-3xl pt-0.5 sm:pt-1'>
            {attraction.heroSubtitle || attraction.shortDescription}
          </p>
        )}

        {/* ==============================================================
            QUICK FACTS BAR: Minimalist Icons for Quick Scanning
            (Horizontal row directly under title, minimalist custom icons, small uppercase typography)
            ============================================================== */}
        <div className='pt-4 sm:pt-6 mt-6 sm:mt-8 border-y border-line'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6 py-1'>
            {/* Fact 1: Best Time To Go */}
            <div className='flex items-start gap-2.5 sm:gap-3'>
              <div className='w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center flex-shrink-0 text-gold-deep mt-0.5'>
                <SunSeasonIcon className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
              </div>
              <div className='space-y-0.5 min-w-0'>
                <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                  Best Time To Go
                </span>
                <p className='text-[15px] sm:text-base font-medium text-ink truncate' title={bestTime}>
                  {bestTime}
                </p>
              </div>
            </div>

            {/* Fact 2: Approx Duration */}
            <div className='flex items-start gap-2.5 sm:gap-3'>
              <div className='w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-violet/10 border border-violet/25 flex items-center justify-center flex-shrink-0 text-violet mt-0.5'>
                <ClockDurationIcon className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
              </div>
              <div className='space-y-0.5 min-w-0'>
                <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                  Approx Duration
                </span>
                <p className='text-[15px] sm:text-base font-medium text-ink truncate' title={duration}>
                  {duration}
                </p>
              </div>
            </div>

            {/* Fact 3: Location / Region */}
            <div className='flex items-start gap-2.5 sm:gap-3'>
              <div className='w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center flex-shrink-0 text-gold-deep mt-0.5'>
                <LocationPinIcon className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
              </div>
              <div className='space-y-0.5 min-w-0'>
                <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                  Location
                </span>
                <p className='text-[15px] sm:text-base font-medium text-ink truncate' title={locationText}>
                  {locationText}
                </p>
              </div>
            </div>

            {/* Fact 4: Classification */}
            <div className='flex items-start gap-2.5 sm:gap-3'>
              <div className='w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-violet/10 border border-violet/25 flex items-center justify-center flex-shrink-0 text-violet mt-0.5'>
                <CompassVibeIcon className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
              </div>
              <div className='space-y-0.5 min-w-0'>
                <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                  Classification
                </span>
                <p className='text-[15px] sm:text-base font-medium text-ink truncate' title={classification}>
                  {classification}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

