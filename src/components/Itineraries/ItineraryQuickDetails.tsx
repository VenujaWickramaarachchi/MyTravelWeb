import { ItineraryPage } from '@/types/pages/itinerary-page'

interface Props {
  itinerary: ItineraryPage
  className?: string
}

export default function ItineraryQuickDetails({
  itinerary,
  className = '',
}: Props) {
  const hasDetails =
    itinerary.startingLocation ||
    itinerary.endingLocation ||
    itinerary.bestFor ||
    itinerary.accommodationStyle ||
    itinerary.transportation ||
    itinerary.meals

  if (!hasDetails) return null

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20 ${className}`}>
      <div className='bg-paper rounded border border-line p-5 sm:p-6 shadow-xs grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:divide-x divide-line/60'>
        {itinerary.startingLocation && (
          <div className='sm:px-3 first:pl-0 space-y-1'>
            <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
              Starts
            </span>
            <strong className='text-xs sm:text-sm font-semibold text-ink block'>
              {itinerary.startingLocation}
            </strong>
          </div>
        )}

        {itinerary.endingLocation && (
          <div className='sm:px-3 space-y-1'>
            <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
              Ends
            </span>
            <strong className='text-xs sm:text-sm font-semibold text-ink block'>
              {itinerary.endingLocation}
            </strong>
          </div>
        )}

        {itinerary.bestFor && (
          <div className='sm:px-3 space-y-1'>
            <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
              Best For
            </span>
            <strong className='text-xs sm:text-sm font-semibold text-ink block'>
              {itinerary.bestFor}
            </strong>
          </div>
        )}

        {itinerary.accommodationStyle && (
          <div className='sm:px-3 space-y-1'>
            <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
              Stay Style
            </span>
            <strong className='text-xs sm:text-sm font-semibold text-ink block'>
              {itinerary.accommodationStyle}
            </strong>
          </div>
        )}

        {itinerary.transportation && (
          <div className='sm:px-3 space-y-1'>
            <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
              Travel Style
            </span>
            <strong className='text-xs sm:text-sm font-semibold text-ink block'>
              {itinerary.transportation}
            </strong>
          </div>
        )}

        {itinerary.meals && (
          <div className='sm:px-3 space-y-1'>
            <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
              Meals
            </span>
            <strong className='text-xs sm:text-sm font-semibold text-ink block'>
              {itinerary.meals}
            </strong>
          </div>
        )}
      </div>
    </section>
  )
}
