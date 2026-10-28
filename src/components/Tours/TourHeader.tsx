import type { Tour } from '@/types/tour'
import Breadcrumbs from '@/components/Shared/Breadcrumbs'
import {
  BespokeLotusIcon,
  ClockDurationIcon,
  CompassVibeIcon,
  LuggagePackIcon,
  SunSeasonIcon,
} from '@/components/Shared/CardIcons'

interface TourHeaderProps {
  tour: Tour
  breadcrumbItems: Array<{ label: string; href?: string }>
}

export default function TourHeader({ tour, breadcrumbItems }: TourHeaderProps) {
  const durationText = tour.durationDays
    ? `${tour.durationDays} Days / ${tour.durationNights || tour.durationDays - 1} Nights`
    : 'Private Journey'

  const styleText = tour.tourStyle || tour.tourTheme || 'Luxury Tailor-Made'
  const groupText = tour.groupSize || 'Private (Min 2 Guests)'
  const seasonText = tour.bestTimeToTravel || 'Year-round'

  return (
    <header className='pt-5 sm:pt-8 pb-3 sm:pb-4'>
      {/* Breadcrumbs Navigation */}
      <div className='mb-4 sm:mb-6'>
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className='space-y-3 sm:space-y-4'>
        {/* Eyebrow Badge */}
        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper border border-line text-xs font-medium uppercase tracking-widest text-ink'>
          <BespokeLotusIcon className='w-3.5 h-3.5 text-gold' />
          <span>Sri Lanka Private Itinerary</span>
          {tour.tourStyle && (
            <>
              <span className='text-line'>•</span>
              <span className='text-gold-deep'>{tour.tourStyle}</span>
            </>
          )}
        </div>

        {/* Tour Main Title (H1: 28-30px mobile, 36-40px tablet, 48-60px desktop) */}
        <h1 className='font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-ink tracking-tight leading-snug md:leading-tight -ml-[2px] max-w-4xl'>
          {tour.heroTitle || tour.title}
        </h1>

        {/* Compelling Subtitle */}
        {(tour.heroSubtitle || tour.shortDescription) && (
          <p className='text-[15px] sm:text-base md:text-lg text-ink/80 leading-relaxed font-light max-w-3xl pt-0.5 sm:pt-1'>
            {tour.heroSubtitle || tour.shortDescription}
          </p>
        )}

        {/* ==============================================================
            QUICK FACTS ROW: Minimalist Icons for Quick Scanning
            ============================================================== */}
        <div className='pt-4 sm:pt-6 mt-6 sm:mt-8 border-y border-line'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6 py-1'>
            {/* Fact 1: Duration */}
            <div className='flex items-start gap-2.5 sm:gap-3'>
              <div className='w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center flex-shrink-0 text-gold-deep mt-0.5'>
                <ClockDurationIcon className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
              </div>
              <div className='space-y-0.5 min-w-0'>
                <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                  Duration
                </span>
                <p className='text-[15px] sm:text-base font-medium text-ink truncate'>
                  {durationText}
                </p>
              </div>
            </div>

            {/* Fact 2: Tour Style */}
            <div className='flex items-start gap-2.5 sm:gap-3'>
              <div className='w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-violet/10 border border-violet/25 flex items-center justify-center flex-shrink-0 text-violet mt-0.5'>
                <CompassVibeIcon className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
              </div>
              <div className='space-y-0.5 min-w-0'>
                <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                  Tour Style
                </span>
                <p className='text-[15px] sm:text-base font-medium text-ink truncate'>
                  {styleText}
                </p>
              </div>
            </div>

            {/* Fact 3: Group Size */}
            <div className='flex items-start gap-2.5 sm:gap-3'>
              <div className='w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center flex-shrink-0 text-gold-deep mt-0.5'>
                <LuggagePackIcon className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
              </div>
              <div className='space-y-0.5 min-w-0'>
                <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                  Group Size
                </span>
                <p className='text-[15px] sm:text-base font-medium text-ink truncate'>
                  {groupText}
                </p>
              </div>
            </div>

            {/* Fact 4: Best Time */}
            <div className='flex items-start gap-2.5 sm:gap-3'>
              <div className='w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-violet/10 border border-violet/25 flex items-center justify-center flex-shrink-0 text-violet mt-0.5'>
                <SunSeasonIcon className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
              </div>
              <div className='space-y-0.5 min-w-0'>
                <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                  Best Time
                </span>
                <p className='text-[15px] sm:text-base font-medium text-ink truncate'>
                  {seasonText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
