import { TourPage } from '@/types/pages/tour-page'

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
          <article key={day.id}>
            <h3>
              Day {day.dayNumber}: {day.dayTitle}
            </h3>

            {day.dayDescription && <p>{day.dayDescription}</p>}

            <p>
              {day.startingLocation} → {day.endingLocation}
            </p>

            {day.drivingTime && <p>Driving time: {day.drivingTime}</p>}
            {day.distance !== null && (
              <p>
                Distance: {day.distance} {day.distanceUnit}
              </p>
            )}

            {day.departureTime && <p>Departure: {day.departureTime}</p>}

            {day.arrivalTime && <p>Arrival: {day.arrivalTime}</p>}

            {day.dayHighlights && (
              <div>
                <strong>Day Highlights</strong>

                <div
                  dangerouslySetInnerHTML={{
                    __html: day.dayHighlights,
                  }}
                />
              </div>
            )}
            {(day.dayImage1 || day.dayImage2) && (
              <div>
                <h4>Day Images</h4>

                {day.dayImage1 && (
                  <img
                    src={day.dayImage1.url}
                    alt={day.dayImage1.alt || day.dayTitle}
                  />
                )}

                {day.dayImage2 && (
                  <img
                    src={day.dayImage2.url}
                    alt={day.dayImage2.alt || day.dayTitle}
                  />
                )}
              </div>
            )}

            {day.meals.length > 0 && (
              <div>
                <h4>Meals</h4>

                <ul>
                  {day.meals.map((meal, index) => (
                    <li key={`${meal}-${index}`}>{meal}</li>
                  ))}
                </ul>
              </div>
            )}

            {day.dayCost !== null && (
              <p>
                Day Cost: {day.dayCost} {day.currency}
              </p>
            )}

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

            {day.relationships.placesVisited.length > 0 && (
              <div>
                <h4>Places Visited</h4>

                <ul>
                  {day.relationships.placesVisited.map((destination) => (
                    <li key={destination.id}>{destination.title}</li>
                  ))}
                </ul>
              </div>
            )}

            {day.relationships.experiences.length > 0 && (
              <div>
                <h4>Experiences</h4>

                <ul>
                  {day.relationships.experiences.map((experience) => (
                    <li key={experience.id}>{experience.title}</li>
                  ))}
                </ul>
              </div>
            )}

            {day.relationships.accommodation && (
              <div>
                <h4>Accommodation</h4>

                <p>{day.relationships.accommodation.title}</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
