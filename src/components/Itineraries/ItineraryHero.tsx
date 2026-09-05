import { ItineraryPage } from '@/types/pages/itinerary-page'

interface Props {
  itinerary: ItineraryPage
}

export default function ItineraryHero({ itinerary }: Props) {
  return (
    <section>
      <h1>{itinerary.heroTitle || itinerary.title}</h1>

      {itinerary.heroSubtitle && <p>{itinerary.heroSubtitle}</p>}

      {itinerary.shortDescription && <p>{itinerary.shortDescription}</p>}
    </section>
  )
}
