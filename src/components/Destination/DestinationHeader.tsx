import Link from 'next/link'
import type { Destination } from '@/types/destination'
import Breadcrumbs from '@/components/Shared/Breadcrumbs'
import {
  BespokeLotusIcon,
  SunSeasonIcon,
  CompassVibeIcon,
  LocationPinIcon,
  ClockDurationIcon,
} from '@/components/Shared/CardIcons'

interface Props {
  destination: Destination
  breadcrumbItems: Array<{ label: string; href?: string }>
}

export default function DestinationHeader({ destination, breadcrumbItems }: Props) {
  // Format destination style / vibe string
  const vibeString =
    Array.isArray(destination.destinationType) && destination.destinationType.length > 0
      ? destination.destinationType
          .map((t: any) => (typeof t === 'string' ? t : t?.name || String(t)))
          .filter(Boolean)
          .slice(0, 3)
          .join(' • ')
      : 'Coastal Haven & Ocean Adventures'

  return (
    <header className='pt-6 sm:pt-8 pb-4'>
      {/* Breadcrumbs Navigation */}
      <div className='mb-4 sm:mb-6'>
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className='space-y-3 sm:space-y-4'>
        {/* Eyebrow badge */}
        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper border border-line text-xs font-medium uppercase tracking-widest text-ink'>
          <BespokeLotusIcon className='w-3.5 h-3.5 text-gold' />
          <span>Sri Lanka Destination Guide</span>
          {destination.location && (
            <>
              <span className='text-line'>•</span>
              <span className='text-gold-deep'>{destination.location}</span>
            </>
          )}
        </div>

        {/* Destination Main Title (H1: 28-30px mobile, 36-40px tablet, 48-60px desktop) */}
        <h1 className='font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-ink tracking-tight leading-snug md:leading-tight -ml-[2px] max-w-4xl'>
          {destination.heroTitle || destination.title}
        </h1>

        {/* Compelling Subtitle (Responsive body text: 15px mobile, 16px tablet/desktop) */}
        {(destination.heroSubTitle || destination.description) && (
          <p className='text-[15px] sm:text-base md:text-lg text-ink/80 leading-relaxed font-light max-w-3xl pt-0.5 sm:pt-1'>
            {destination.heroSubTitle || destination.description}
          </p>
        )}

        {/* ==============================================================
            QUICK FACTS ROW: Minimalist Icons for Quick Scanning
            (Mimicking the Luxury Itinerary Duration / Group Size Row)
            ============================================================== */}
        <div className='pt-4 sm:pt-6 mt-6 sm:mt-8 border-y border-line'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6 py-1'>
            {/* Fact 1: Best Season */}
            <div className='flex items-start gap-2.5 sm:gap-3'>
              <div className='w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center flex-shrink-0 text-gold-deep mt-0.5'>
                <SunSeasonIcon className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
              </div>
              <div className='space-y-0.5 min-w-0'>
                <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                  Best Time to Visit
                </span>
                <p className='text-[15px] sm:text-base font-medium text-ink truncate'>
                  {destination.bestTimetoVisit || 'November to April'}
                </p>
              </div>
            </div>

            {/* Fact 2: Vibe & Style */}
            <div className='flex items-start gap-2.5 sm:gap-3'>
              <div className='w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-violet/10 border border-violet/25 flex items-center justify-center flex-shrink-0 text-violet mt-0.5'>
                <CompassVibeIcon className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
              </div>
              <div className='space-y-0.5 min-w-0'>
                <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                  Vibe & Atmosphere
                </span>
                <p className='text-[15px] sm:text-base font-medium text-ink truncate' title={vibeString}>
                  {vibeString}
                </p>
              </div>
            </div>

            {/* Fact 3: Region / Location */}
            <div className='flex items-start gap-2.5 sm:gap-3'>
              <div className='w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center flex-shrink-0 text-gold-deep mt-0.5'>
                <LocationPinIcon className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
              </div>
              <div className='space-y-0.5 min-w-0'>
                <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                  Region
                </span>
                <p className='text-[15px] sm:text-base font-medium text-ink truncate'>
                  {destination.location || 'Southern Coast, Sri Lanka'}
                </p>
              </div>
            </div>

            {/* Fact 4: Ideal Stay */}
            <div className='flex items-start gap-2.5 sm:gap-3'>
              <div className='w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-violet/10 border border-violet/25 flex items-center justify-center flex-shrink-0 text-violet mt-0.5'>
                <ClockDurationIcon className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
              </div>
              <div className='space-y-0.5 min-w-0'>
                <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                  Suggested Pace
                </span>
                <p className='text-[15px] sm:text-base font-medium text-ink truncate'>
                  {destination.recommendedDuration || '2 — 3 Days'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
