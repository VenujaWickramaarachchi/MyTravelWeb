import { ItineraryPage } from '@/types/pages/itinerary-page'

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

  return (
    <section className={`my-16 sm:my-20 bg-ivory/60 py-16 border-y border-line ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-2'>
            Journey Pathway
          </p>
          <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
            The Travel Route
          </h2>
        </header>

        {(itinerary.startingLocation || itinerary.endingLocation) && (
          <div className='p-5 sm:p-6 rounded border border-line bg-paper flex items-center gap-4 text-sm'>
            <span className='text-2xl'>🗺️</span>
            <div>
              <span className='text-xs uppercase tracking-wider text-gold-deep font-semibold block mb-0.5'>
                Origin & Destination
              </span>
              <p className='font-medium text-ink'>
                {itinerary.startingLocation}
                {itinerary.startingLocation && itinerary.endingLocation && ' → '}
                {itinerary.endingLocation}
              </p>
            </div>
          </div>
        )}

        {itinerary.route && (
          <div
            className='prose-editorial'
            dangerouslySetInnerHTML={{
              __html: itinerary.route,
            }}
          />
        )}
      </div>
    </section>
  )
}
