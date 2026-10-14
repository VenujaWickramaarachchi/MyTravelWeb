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
import Breadcrumbs from '@/components/Shared/Breadcrumbs'

import { generateSEO } from '@/lib/seo'

import AEOAnswerSchema from '@/components/SEO/AEOAnswerSchema'
import AEOContent from '@/components/SEO/AEOContent'
import BreadcrumbSchema from '@/components/SEO/BreadCrumbSchema'
import { createBreadcrumbs } from '@/lib/breadcrumbs'

interface Props {
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

  const itinerary = await getItinerary(slug)

  if (!itinerary) {
    return {}
  }

  return generateSEO({
    seoTitle: itinerary.seoTitle || itinerary.title,
    metaDescription: itinerary.metaDescription,
    canonicalUrl: itinerary.canonicalUrl,
    noIndex: itinerary.noIndex,
    ogTitle: itinerary.ogTitle,
    ogDescription: itinerary.ogDescription,
    socialImage: itinerary.socialImage,
  })
}

export default async function ItineraryPage({ params }: Props) {
  const { slug } = await params

  const itinerary = await getItinerary(slug)

  if (!itinerary) {
    return (
      <main className='max-w-4xl mx-auto px-4 py-24 text-center space-y-4'>
        <h1 className='font-serif text-3xl sm:text-4xl text-ink'>
          Itinerary Not Found
        </h1>
        <p className='text-ink/70'>
          The itinerary you are looking for is currently unavailable.
        </p>
      </main>
    )
  }

  const breadcrumbItems = createBreadcrumbs(
    'Itineraries',
    'itineraries',
    itinerary.breadcrumbLabel || itinerary.title,
  )

  return (
    <main className='pb-20 space-y-4'>
      <AEOAnswerSchema data={itinerary} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <ItineraryHero itinerary={itinerary} />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <ItineraryQuickDetails itinerary={itinerary} />
      <ItineraryOverview itinerary={itinerary} />
      <ItineraryRoute itinerary={itinerary} />
      <ItineraryDestinations itinerary={itinerary} />
      <ItineraryExperiences itinerary={itinerary} />
      <ItineraryDays itinerary={itinerary} />
      <ItineraryAccommodations itinerary={itinerary} />
      <ItineraryRelatedTours itinerary={itinerary} />
      <AEOContent data={itinerary} />
      <ItineraryCTA itinerary={itinerary} />
    </main>
  )
}
