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
import TourTestimonials from '@/components/Tours/TourTestimonials'

import GallerySection from '@/components/content/Gallery/GallerySection'

import BreadcrumbSchema from '@/components/SEO/BreadCrumbSchema'
import { createBreadcrumbs } from '@/lib/breadcrumbs'
import AEOAnswerSchema from '@/components/SEO/AEOAnswerSchema'
import AEOContent from '@/components/SEO/AEOContent'

import { generateSEO } from '@/lib/seo'

interface TourPageProps {
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

  const tour = await getTour(slug)

  if (!tour) {
    return {}
  }

  return generateSEO({
    seoTitle: tour.seoTitle || tour.title,
    metaDescription: tour.metaDescription,
    canonicalUrl: tour.canonicalUrl,
    noIndex: tour.noIndex,
    ogTitle: tour.ogTitle,
    ogDescription: tour.ogDescription,
    socialImage: tour.socialImage,
  })
}

export default async function TourPage({ params }: TourPageProps) {
  const { slug } = await params

  const tour = await getTour(slug)

  if (!tour) {
    return <div>Tour not found</div>
  }

  return (
    <main>
      <AEOAnswerSchema data={tour} />
      <BreadcrumbSchema
        items={createBreadcrumbs(
          'Tours',
          'tours',
          tour.breadcrumbLabel || tour.title,
        )}
      />
      <TourHero tour={tour} />
      <TourQuickDetails tour={tour} />
      <TourOverview tour={tour} />
      <TourHighlights tour={tour} />
      <GallerySection images={tour.galleryImages} title='Tour Gallery' />
      <TourDestinations tour={tour} />
      <TourExperiences tour={tour} />
      <TourItinerary tour={tour} />
      <TourAccommodations tour={tour} />
      <TourInclusions tour={tour} />
      <TourInfo tour={tour} />
      <TourTestimonials tour={tour} />
      <AEOContent data={tour} />
      <TourCTA tour={tour} />
    </main>
  )
}
