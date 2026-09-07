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

import { generateSEO } from '@/lib/seo'

import AEOAnswerSchema from '@/components/SEO/AEOAnswerSchema'
import AEOContent from '@/components/SEO/AEOContent'
import BreadcrumbSchema from '@/components/SEO/BreadCrumbSchema'
import { createBreadcrumbs } from '@/lib/breadcrumbs'

interface AttractionPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const attraction = await getAttraction(slug)

  if (!attraction) {
    return {}
  }

  return generateSEO({
    seoTitle: attraction.seoTitle || attraction.title,
    metaDescription: attraction.metaDescription,
    canonicalUrl: attraction.canonicalUrl,
    noIndex: attraction.noIndex,
    ogTitle: attraction.ogTitle,
    ogDescription: attraction.ogDescription,
    socialImage: attraction.socialImage,
  })
}

export default async function AttractionPage({ params }: AttractionPageProps) {
  const { slug } = await params

  const attraction = await getAttraction(slug)

  if (!attraction) {
    return <div>Attraction not found</div>
  }

  return (
    <main>
      <AEOAnswerSchema data={attraction} />

      <BreadcrumbSchema
        items={createBreadcrumbs(
          'Attractions',
          'attractions',
          attraction.breadcrumbLabel || attraction.title,
        )}
      />
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
      <AEOContent data={attraction} />

      <AttractionFAQ attraction={attraction} />
    </main>
  )
}
