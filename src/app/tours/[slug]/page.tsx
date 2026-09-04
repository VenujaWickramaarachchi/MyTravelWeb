import { getTour } from '@/lib/wordpress'

import TourHero from '@/components/Tours/TourHero'
import TourQuickDetails from '@/components/Tours/TourQuickDetails'
import TourOverview from '@/components/Tours/TourOverview'
import TourHighlights from '@/components/Tours/TourHighlights'
import TourDestinations from '@/components/Tours/TourDestinations'
import TourExperiences from '@/components/Tours/TourExperiences'
import TourItinerary from '@/components/Tours/TourItinerary'
import TourAccommodations from '@/components/Tours/TourAccommodations'
import TourInclusions from '@/components/Tours/TourInclusions'
import TourInfo from '@/components/Tours/TourInfo'
import TourCTA from '@/components/Tours/TourCTA'

interface TourPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function TourPage({ params }: TourPageProps) {
  const { slug } = await params

  const tour = await getTour(slug)

  if (!tour) {
    return <div>Tour not found</div>
  }

  return (
    <main>
      <TourHero tour={tour} />
      <TourQuickDetails tour={tour} />
      <TourOverview tour={tour} />
      <TourHighlights tour={tour} />
      <TourDestinations tour={tour} />
      <TourExperiences tour={tour} />
      <TourItinerary tour={tour} />
      <TourAccommodations tour={tour} />
      <TourInclusions tour={tour} />
      <TourInfo tour={tour} />
      <TourCTA tour={tour} />
    </main>
  )
}
