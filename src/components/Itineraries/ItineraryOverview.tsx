import { ItineraryPage } from '@/types/pages/itinerary-page'

interface Props {
  itinerary: ItineraryPage
  className?: string
}

export default function ItineraryOverview({
  itinerary,
  className = '',
}: Props) {
  if (!itinerary.itineraryOverview) {
    return null
  }

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-violet mb-2'>
            The Route Concept
          </p>
          <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
            Itinerary Overview
          </h2>
        </header>

        <div
          className='prose-editorial'
          dangerouslySetInnerHTML={{
            __html: itinerary.itineraryOverview,
          }}
        />
      </div>
    </section>
  )
}
