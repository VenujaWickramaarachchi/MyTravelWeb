import { TourPage } from '@/types/pages/tour-page'

import ItineraryDayCard from '@/components/entities/ItineraryDay/ItineraryDayCard'

interface TourItineraryProps {
  tour: TourPage
}

export default function TourItinerary({ tour }: TourItineraryProps) {
  const itineraryDays = tour.relationships.itineraryDays

  if (!tour.relationships.itinerary && itineraryDays.length === 0) {
    return null
  }

  return (
    <section>
      <h2>Itinerary</h2>

      {tour.relationships.itinerary && (
        <div>
          <h3>{tour.relationships.itinerary.title}</h3>

          {tour.relationships.itinerary.itineraryOverview && (
            <div
              dangerouslySetInnerHTML={{
                __html: tour.relationships.itinerary.itineraryOverview,
              }}
            />
          )}
        </div>
      )}

      <div>
        {itineraryDays.map((day) => (
          <ItineraryDayCard key={day.id} day={day} />
        ))}
      </div>
    </section>
  )
}
