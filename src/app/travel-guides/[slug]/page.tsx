import { notFound } from 'next/navigation'
import { getTravelGuide } from '@/lib/wordpress'

import TravelGuideHero from '@/components/TravelGuides/TravelGuideHero'
import TravelGuideOverview from '@/components/TravelGuides/TravelGuideOverview'
import TravelGuideQuickAnswer from '@/components/TravelGuides/TravelGuideQuickAnswer'
import TravelGuideKeyInformation from '@/components/TravelGuides/TravelGuideKeyInformation'
import TravelGuideMainContent from '@/components/TravelGuides/TravelGuideMainContent'
import TravelGuideDestinations from '@/components/TravelGuides/TravelGuideDestinations'
import TravelGuideExperiences from '@/components/TravelGuides/TravelGuideExperiences'
import TravelGuideTours from '@/components/TravelGuides/TravelGuideTours'
import TravelGuideItineraries from '@/components/TravelGuides/TravelGuideItineraries'
import TravelGuideAuthor from '@/components/TravelGuides/TravelGuideAuthor'
import TravelGuideFAQ from '@/components/TravelGuides/TravelGuideFAQ'

import GallerySection from '@/components/content/Gallery/GallerySection'

import { generateSEO } from '@/lib/seo'

interface TravelGuidePageProps {
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

  const travelGuide = await getTravelGuide(slug)

  if (!travelGuide) {
    return {}
  }

  return generateSEO({
    title: travelGuide.seoTitle || travelGuide.title,
    description: travelGuide.metaDescription,
    canonicalUrl: travelGuide.canonicalUrl,
    noIndex: travelGuide.noIndex,
    ogTitle: travelGuide.ogTitle,
    ogDescription: travelGuide.ogDescription,
    socialImage: travelGuide.socialImage,
  })
}

export default async function TravelGuidePage({
  params,
}: TravelGuidePageProps) {
  const { slug } = await params

  const travelGuide = await getTravelGuide(slug)

  if (!travelGuide) {
    notFound()
  }

  return (
    <main>
      <TravelGuideHero travelGuide={travelGuide} />

      <TravelGuideOverview travelGuide={travelGuide} />

      <TravelGuideQuickAnswer travelGuide={travelGuide} />

      <TravelGuideKeyInformation travelGuide={travelGuide} />

      <TravelGuideMainContent travelGuide={travelGuide} />

      <GallerySection
        images={travelGuide.galleryImages}
        title='Travel Guide Gallery'
      />

      <TravelGuideDestinations
        destinations={travelGuide.relationships.relatedDestinations}
      />

      <TravelGuideExperiences
        experiences={travelGuide.relationships.relatedExperiences}
      />

      <TravelGuideTours tours={travelGuide.relationships.relatedTours} />

      <TravelGuideItineraries
        itineraries={travelGuide.relationships.relatedItineraries}
      />

      <TravelGuideAuthor travelGuide={travelGuide} />

      <TravelGuideFAQ travelGuide={travelGuide} />
    </main>
  )
}
