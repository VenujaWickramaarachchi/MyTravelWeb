import { TourPage } from '@/types/pages/tour-page'

interface TourItineraryProps {
  tour: TourPage
}

export default function TourItinerary({ tour }: TourItineraryProps) {
  const itineraryDays = tour.relationships.itineraryDays

  if (itineraryDays.length === 0) {
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
          <article key={day.id}>
            <h3>
              Day {day.dayNumber}: {day.dayTitle}
            </h3>

            <p>{day.dayDescription}</p>

            <p>
              {day.startingLocation} → {day.endingLocation}
            </p>

            {day.drivingTime && <p>Driving time: {day.drivingTime}</p>}

            {day.activities && (
              <div>
                <strong>Activities</strong>

                <div
                  dangerouslySetInnerHTML={{
                    __html: day.activities,
                  }}
                />
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
