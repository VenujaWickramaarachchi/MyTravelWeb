import { ItineraryPage } from '@/types/pages/itinerary-page'

interface Props {
  itinerary: ItineraryPage
}

export default function ItineraryCTA({ itinerary }: Props) {
  return (
    <section>
      <h2>Plan Your Sri Lanka Journey</h2>

      <p>
        Ready to experience {itinerary.title}? Get in touch with us to plan your
        trip.
      </p>

      <a href='/contact'>Enquire About This Itinerary</a>
    </section>
  )
}
