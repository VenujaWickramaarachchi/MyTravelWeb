import { ItineraryPage } from '@/types/pages/itinerary-page'

interface Props {
  itinerary: ItineraryPage
}

export default function ItineraryQuickDetails({ itinerary }: Props) {
  return (
    <section>
      <h2>Quick Details</h2>

      {itinerary.startingLocation && (
        <div>
          <strong>Starting Location</strong>
          <p>{itinerary.startingLocation}</p>
        </div>
      )}

      {itinerary.endingLocation && (
        <div>
          <strong>Ending Location</strong>
          <p>{itinerary.endingLocation}</p>
        </div>
      )}

      {itinerary.bestFor && (
        <div>
          <strong>Best For</strong>
          <p>{itinerary.bestFor}</p>
        </div>
      )}

      {itinerary.accommodationStyle && (
        <div>
          <strong>Accommodation Style</strong>
          <p>{itinerary.accommodationStyle}</p>
        </div>
      )}

      {itinerary.transportation && (
        <div>
          <strong>Transportation</strong>
          <p>{itinerary.transportation}</p>
        </div>
      )}

      {itinerary.meals && (
        <div>
          <strong>Meals</strong>
          <p>{itinerary.meals}</p>
        </div>
      )}
    </section>
  )
}
