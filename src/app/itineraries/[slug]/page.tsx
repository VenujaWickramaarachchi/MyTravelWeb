import { getItinerary } from '@/lib/wordpress'

import ItineraryHero from '@/components/Itineraries/ItineraryHero'
import ItineraryQuickDetails from '@/components/Itineraries/ItineraryQuickDetails'
import ItineraryOverview from '@/components/Itineraries/ItineraryOverview'
import ItineraryRoute from '@/components/Itineraries/ItineraryRoute'
import ItineraryDestinations from '@/components/Itineraries/ItineraryDestinations'
import ItineraryExperiences from '@/components/Itineraries/ItineraryExperiences'
import ItineraryDays from '@/components/Itineraries/ItineraryDays'
import ItineraryAccommodations from '@/components/Itineraries/ItineraryAccommodations'
import ItineraryRelatedTours from '@/components/Itineraries/ItineraryRelatedTours'
import ItineraryCTA from '@/components/Itineraries/ItineraryCTA'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function ItineraryPage({ params }: Props) {
  const { slug } = await params

  const itinerary = await getItinerary(slug)

  if (!itinerary) {
    return <div>Itinerary not found</div>
  }

  return (
    <main>
      <ItineraryHero itinerary={itinerary} />

      <ItineraryQuickDetails itinerary={itinerary} />

      <ItineraryOverview itinerary={itinerary} />

      <ItineraryRoute itinerary={itinerary} />

      <ItineraryDestinations itinerary={itinerary} />

      <ItineraryExperiences itinerary={itinerary} />

      <ItineraryDays itinerary={itinerary} />

      <ItineraryAccommodations itinerary={itinerary} />

      <ItineraryRelatedTours itinerary={itinerary} />

      <ItineraryCTA itinerary={itinerary} />
    </main>
  )
}
