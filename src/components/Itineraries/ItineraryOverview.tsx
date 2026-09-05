import { ItineraryPage } from '@/types/pages/itinerary-page'

interface Props {
  itinerary: ItineraryPage
}

export default function ItineraryOverview({ itinerary }: Props) {
  if (!itinerary.itineraryOverview) {
    return null
  }

  return (
    <section>
      <h2>Itinerary Overview</h2>

      <div
        dangerouslySetInnerHTML={{
          __html: itinerary.itineraryOverview,
        }}
      />
    </section>
  )
}
