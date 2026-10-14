import { TourPage } from '@/types/pages/tour-page'
import ItineraryDayCard from '@/components/entities/ItineraryDay/ItineraryDayCard'

interface TourItineraryProps {
  tour: TourPage
  className?: string
}

export default function TourItinerary({
  tour,
  className = '',
}: TourItineraryProps) {
  const itineraryDays = tour.relationships.itineraryDays

  if (!tour.relationships.itinerary && itineraryDays.length === 0) {
    return null
  }

  return (
    <section className={`my-16 sm:my-24 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-2'>
            Day by Day Journey
          </p>
          <h2 className='font-serif text-3xl sm:text-4xl lg:text-4.5xl font-normal text-ink'>
            Detailed Itinerary
          </h2>
        </header>

        {tour.relationships.itinerary && (
          <div className='p-6 sm:p-7 rounded border border-line bg-ivory/50 space-y-3'>
            <h3 className='font-serif text-2xl font-medium text-ink'>
              {tour.relationships.itinerary.title}
            </h3>

            {tour.relationships.itinerary.itineraryOverview && (
              <div
                className='prose-editorial text-sm sm:text-base leading-relaxed'
                dangerouslySetInnerHTML={{
                  __html: tour.relationships.itinerary.itineraryOverview,
                }}
              />
            )}
          </div>
        )}

        <div className='pt-4'>
          {itineraryDays.map((day) => (
            <ItineraryDayCard key={day.id} day={day} />
          ))}
        </div>
      </div>
    </section>
  )
}
