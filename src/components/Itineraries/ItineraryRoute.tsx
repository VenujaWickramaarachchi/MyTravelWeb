import { ItineraryPage } from '@/types/pages/itinerary-page'
import { LocationPinIcon } from '@/components/Shared/CardIcons'

interface Props {
  itinerary: ItineraryPage
  className?: string
}

export default function ItineraryRoute({
  itinerary,
  className = '',
}: Props) {
  if (
    !itinerary.route &&
    !itinerary.startingLocation &&
    !itinerary.endingLocation
  ) {
    return null
  }

  const hasEndpoints = itinerary.startingLocation || itinerary.endingLocation

  return (
    <section className={`space-y-4 pt-2 ${className}`}>
      <header>
        <span className='text-xs font-semibold uppercase tracking-[0.22em] text-violet block mb-1.5'>
          Journey Pathway
        </span>
        <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight -ml-[2px]'>
          The Travel Route
        </h2>
      </header>

      {hasEndpoints && (
        <div className='p-4 sm:p-5 rounded-xl border border-line bg-paper flex items-center gap-4 text-sm shadow-2xs'>
          <div className='w-10 h-10 rounded-full bg-gold/15 text-gold-deep flex items-center justify-center flex-shrink-0'>
            <LocationPinIcon className='w-5 h-5' />
          </div>
          <div>
            <span className='text-xs font-mono uppercase tracking-wider text-ink/50 block mb-0.5'>
              Origin & Destination
            </span>
            <p className='font-medium text-ink text-[15px]'>
              {itinerary.startingLocation}
              {itinerary.startingLocation && itinerary.endingLocation && ' → '}
              {itinerary.endingLocation}
            </p>
          </div>
        </div>
      )}

      {itinerary.route && (
        <div
          className='prose-editorial text-[15px] sm:text-base leading-relaxed text-ink/80 font-light'
          dangerouslySetInnerHTML={{
            __html: itinerary.route,
          }}
        />
      )}
    </section>
  )
}
