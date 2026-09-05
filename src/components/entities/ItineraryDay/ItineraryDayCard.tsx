import { ItineraryDayPage } from '@/types/pages/itinerary-day-page'

interface Props {
  day: ItineraryDayPage
}

export default function ItineraryDayCard({ day }: Props) {
  return (
    <article>
      <h3>
        Day {day.dayNumber}: {day.dayTitle}
      </h3>

      {day.dayDescription && (
        <div
          dangerouslySetInnerHTML={{
            __html: day.dayDescription,
          }}
        />
      )}

      {day.relationships.placesVisited.length > 0 && (
        <div>
          <h4>Places Visited</h4>

          {day.relationships.placesVisited.map((place) => (
            <p key={place.id}>{place.title}</p>
          ))}
        </div>
      )}

      {day.relationships.experiences.length > 0 && (
        <div>
          <h4>Experiences</h4>

          {day.relationships.experiences.map((experience) => (
            <p key={experience.id}>{experience.title}</p>
          ))}
        </div>
      )}

      {day.activities && (
        <div>
          <h4>Activities</h4>

          <div
            dangerouslySetInnerHTML={{
              __html: day.activities,
            }}
          />
        </div>
      )}

      {day.dayHighlights && (
        <div>
          <h4>Highlights</h4>

          <div
            dangerouslySetInnerHTML={{
              __html: day.dayHighlights,
            }}
          />
        </div>
      )}

      {day.meals.length > 0 && (
        <div>
          <h4>Meals</h4>

          {day.meals.map((meal, index) => (
            <p key={index}>{meal}</p>
          ))}
        </div>
      )}

      {day.relationships.accommodation && (
        <div>
          <h4>Accommodation</h4>
          <p>{day.relationships.accommodation.title}</p>
        </div>
      )}
    </article>
  )
}
