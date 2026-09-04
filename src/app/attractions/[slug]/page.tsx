import { getAttraction } from '@/lib/wordpress'

import AttractionHero from '@/components/Attractions/AttractionHero'
import AttractionOverview from '@/components/Attractions/AttractionOverview'
import AttractionDetails from '@/components/Attractions/AttractionDetails'
import AttractionHighlights from '@/components/Attractions/AttractionHighlights'
import AttractionRelatedExperiences from '@/components/Attractions/AttractionRelatedExperiences'
import AttractionNearbyAttractions from '@/components/Attractions/AttractionNearbyAttractions'
import AttractionRelatedTours from '@/components/Attractions/AttractionRelatedTours'
import AttractionImportantInformation from '@/components/Attractions/AttractionImportantInformation'
import AttractionFAQ from '@/components/Attractions/AttractionFAQ'

import GallerySection from '@/components/content/Gallery/GallerySection'

interface AttractionPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function AttractionPage({ params }: AttractionPageProps) {
  const { slug } = await params

  const attraction = await getAttraction(slug)

  if (!attraction) {
    return <div>Attraction not found</div>
  }

  return (
    <main>
      <AttractionHero attraction={attraction} />

      <AttractionOverview attraction={attraction} />

      <AttractionDetails attraction={attraction} />

      <AttractionHighlights attraction={attraction} />

      <AttractionRelatedExperiences
        experiences={attraction.relationships.relatedExperiences}
      />

      <AttractionNearbyAttractions
        attractions={attraction.relationships.nearbyAttractions}
      />

      <AttractionRelatedTours tours={attraction.relationships.relatedTours} />

      <AttractionImportantInformation attraction={attraction} />

      <GallerySection
        images={attraction.galleryImages}
        title='Attraction Gallery'
      />

      <AttractionFAQ attraction={attraction} />
    </main>
  )
}
