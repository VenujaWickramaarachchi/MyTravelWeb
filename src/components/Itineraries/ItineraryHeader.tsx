import type { ItineraryPage } from '@/types/pages/itinerary-page'
import Breadcrumbs from '@/components/Shared/Breadcrumbs'
import {
  BespokeLotusIcon,
  ClockDurationIcon,
  CompassVibeIcon,
  LocationPinIcon,
  LuggagePackIcon,
  SunSeasonIcon,
  SparkStarIcon,
} from '@/components/Shared/CardIcons'

interface Props {
  itinerary: ItineraryPage
  breadcrumbItems: Array<{ label: string; href?: string }>
}

export default function ItineraryHeader({ itinerary, breadcrumbItems }: Props) {
  const daysCount = itinerary.relationships?.itineraryDays?.length || 0
  const durationText = daysCount > 0 ? `${daysCount} Days / ${Math.max(1, daysCount - 1)} Nights` : 'Curated Route'

  const arrivalText = itinerary.startingLocation || 'Colombo (CMB)'
  const departureText = itinerary.endingLocation || 'Colombo (CMB)'
  const vibeText = itinerary.bestFor
    ? itinerary.bestFor.split('\n')[0].replace(/<[^>]*>?/gm, '').trim()
    : 'Bespoke Private Journey'
  const stayStyleText = itinerary.accommodationStyle || 'Boutique & 5-Star'
  const mealsText = itinerary.meals || 'Breakfast & Dinner'
  const idealTimeText = 'November – April (Peak)'

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
          <span>Curated Sri Lanka Route</span>
          {itinerary.startingLocation && itinerary.endingLocation && (
            <>
              <span className='text-line'>•</span>
              <span className='text-gold-deep'>
                {itinerary.startingLocation} → {itinerary.endingLocation}
              </span>
            </>
          )}
        </div>

        {/* Main H1 Title (Fluid Scale: ~28-30px on mobile, ~36-40px on tablet, ~48-60px on desktop) */}
        <h1 className='font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-ink tracking-tight leading-snug md:leading-tight -ml-[2px] max-w-4xl'>
          {itinerary.heroTitle || itinerary.title}
        </h1>

        {/* Compelling Subtitle */}
        {(itinerary.heroSubtitle || itinerary.shortDescription) && (
          <p className='text-[15px] sm:text-base md:text-lg text-ink/80 leading-relaxed font-light max-w-3xl pt-0.5 sm:pt-1'>
            {itinerary.heroSubtitle || itinerary.shortDescription}
          </p>
        )}

        {/* ==============================================================
            QUICK FACTS BAR: Clean Horizontal Row Directly Below Title
            (Minimalist custom icons and text-xs tracking-widest uppercase)
            ============================================================== */}
        <div className='pt-4 sm:pt-6 mt-6 sm:mt-8 border-y border-line'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-5 py-1'>
            {/* Fact 1: Arrival */}
            <div className='flex items-start gap-2.5'>
              <div className='w-8 h-8 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center flex-shrink-0 text-gold-deep mt-0.5'>
                <LocationPinIcon className='w-3.5 h-3.5' />
              </div>
              <div className='space-y-0.5 min-w-0'>
                <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                  Arrival
                </span>
                <p className='text-[13px] sm:text-sm font-medium text-ink truncate' title={arrivalText}>
                  {arrivalText}
                </p>
              </div>
            </div>

            {/* Fact 2: Depart */}
            <div className='flex items-start gap-2.5'>
              <div className='w-8 h-8 rounded-full bg-violet/10 border border-violet/25 flex items-center justify-center flex-shrink-0 text-violet mt-0.5'>
                <LocationPinIcon className='w-3.5 h-3.5' />
              </div>
              <div className='space-y-0.5 min-w-0'>
                <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                  Depart
                </span>
                <p className='text-[13px] sm:text-sm font-medium text-ink truncate' title={departureText}>
                  {departureText}
                </p>
              </div>
            </div>

            {/* Fact 3: Pace & Duration */}
            <div className='flex items-start gap-2.5'>
              <div className='w-8 h-8 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center flex-shrink-0 text-gold-deep mt-0.5'>
                <ClockDurationIcon className='w-3.5 h-3.5' />
              </div>
              <div className='space-y-0.5 min-w-0'>
                <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                  Pace
                </span>
                <p className='text-[13px] sm:text-sm font-medium text-ink truncate'>
                  {durationText}
                </p>
              </div>
            </div>

            {/* Fact 4: Vibe / Best For */}
            <div className='flex items-start gap-2.5'>
              <div className='w-8 h-8 rounded-full bg-violet/10 border border-violet/25 flex items-center justify-center flex-shrink-0 text-violet mt-0.5'>
                <CompassVibeIcon className='w-3.5 h-3.5' />
              </div>
              <div className='space-y-0.5 min-w-0'>
                <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                  Vibe
                </span>
                <p className='text-[13px] sm:text-sm font-medium text-ink truncate' title={vibeText}>
                  {vibeText}
                </p>
              </div>
            </div>

            {/* Fact 5: Ideal Season */}
            <div className='flex items-start gap-2.5'>
              <div className='w-8 h-8 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center flex-shrink-0 text-gold-deep mt-0.5'>
                <SunSeasonIcon className='w-3.5 h-3.5' />
              </div>
              <div className='space-y-0.5 min-w-0'>
                <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                  Ideal Time
                </span>
                <p className='text-[13px] sm:text-sm font-medium text-ink truncate'>
                  {idealTimeText}
                </p>
              </div>
            </div>

            {/* Fact 6: Meals */}
            <div className='flex items-start gap-2.5'>
              <div className='w-8 h-8 rounded-full bg-violet/10 border border-violet/25 flex items-center justify-center flex-shrink-0 text-violet mt-0.5'>
                <SparkStarIcon className='w-3.5 h-3.5' />
              </div>
              <div className='space-y-0.5 min-w-0'>
                <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                  Meals
                </span>
                <p className='text-[13px] sm:text-sm font-medium text-ink truncate' title={mealsText}>
                  {mealsText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
