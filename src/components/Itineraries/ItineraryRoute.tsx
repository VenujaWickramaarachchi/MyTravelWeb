import { ItineraryPage } from '@/types/pages/itinerary-page'

interface Props {
  itinerary: ItineraryPage
}

export default function ItineraryRoute({ itinerary }: Props) {
  if (
    !itinerary.route &&
    !itinerary.startingLocation &&
    !itinerary.endingLocation
  ) {
    return null
  }

  return (
    <section>
      <h2>Route</h2>

      {itinerary.route && (
        <div
          dangerouslySetInnerHTML={{
            __html: itinerary.route,
          }}
        />
      )}

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
    </section>
  )
}
