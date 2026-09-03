import { getDestination } from '@/lib/wordpress'

import DestinationHero from '@/components/Destination/DestinationHero'
import DestinationOverview from '@/components/Destination/DestinationOverview'
import TravelInfo from '@/components/Destination/TravelInfo'
import WeatherSection from '@/components/Destination/WeatherSection'
import AccommodationList from '@/components/Destination/AccommodationList'
import NearbyDestinations from '@/components/Destination/NearbyDestinations'
import RelatedTours from '@/components/Destination/RelatedTours'
import DestinationExperiences from '@/components/Destination/DestinationExperiences'

export default async function DestinationPage({
  params,
}: {
  params: Promise<{
    slug: string
  }>
}) {
  const { slug } = await params

  const destination = await getDestination(slug)

  if (!destination) {
    return <h1>Destination Not Found</h1>
  }

  return (
    <div>
      <DestinationHero destination={destination} />
      <DestinationOverview destination={destination} />
      <TravelInfo destination={destination} />
      <WeatherSection destination={destination} />
      <AccommodationList
        accommodations={destination.relationships.accommodations}
      />
      <NearbyDestinations
        nearbyDestinations={destination.relationships.nearbyDestinations}
      />
      <RelatedTours tours={destination.relationships.relatedTours} />
      <DestinationExperiences
        experiences={destination.relationships.experiences}
      />
    </div>
  )
}
