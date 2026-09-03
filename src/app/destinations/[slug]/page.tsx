import { getDestination } from '@/lib/wordpress'

import DestinationHero from '@/components/Destination/DestinationHero'
import DestinationOverview from '@/components/Destination/DestinationOverview'
import TravelInfo from '@/components/Destination/TravelInfo'
import WeatherSection from '@/components/Destination/WeatherSection'
import AccommodationList from '@/components/Destination/AccommodationList'
import NearbyDestinations from '@/components/Destination/NearbyDestinations'
import RelatedTours from '@/components/Destination/RelatedTours'
import DestinationExperiences from '@/components/Destination/DestinationExperiences'
import MapSection from '@/components/content/Map/MapSection'
import FAQSection from '@/components/content/FAQ/FAQSection'
import AttractionList from '@/components/Destination/AttractionList'

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
      <AttractionList attractions={destination.relationships.mainAttractions} />
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
      <MapSection
        google_maps_embed={destination.mapsEmbed}
        locationAddress={destination.locationAddress}
      />
      <FAQSection content={destination.faqContent} />
    </div>
  )
}
