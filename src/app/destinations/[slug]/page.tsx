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
import GallerySection from '@/components/content/Gallery/GallerySection'
import Breadcrumbs from '@/components/Shared/Breadcrumbs'

import { generateSEO } from '@/lib/seo'

import BreadcrumbSchema from '@/components/SEO/BreadCrumbSchema'
import { createBreadcrumbs } from '@/lib/breadcrumbs'

import AEOContent from '@/components/SEO/AEOContent'
import AEOAnswerSchema from '@/components/SEO/AEOAnswerSchema'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const destination = await getDestination(slug)

  if (!destination) {
    return {}
  }

  return generateSEO({
    seoTitle: destination.seoTitle || destination.title,
    metaDescription: destination.metaDescription,
    canonicalUrl: destination.canonicalUrl,
    noIndex: destination.noIndex,
    ogTitle: destination.ogTitle,
    ogDescription: destination.ogDescription,
    socialImage: destination.socialImage,
  })
}

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
    return (
      <main className='max-w-4xl mx-auto px-4 py-24 text-center space-y-4'>
        <h1 className='font-serif text-3xl sm:text-4xl text-ink'>
          Destination Not Found
        </h1>
        <p className='text-ink/70'>
          The destination you are looking for is currently unavailable.
        </p>
      </main>
    )
  }

  const breadcrumbItems = createBreadcrumbs(
    'Destinations',
    'destinations',
    destination.breadcrumbLabel || destination.title,
  )

  return (
    <main className='pb-20 space-y-4'>
      <AEOAnswerSchema data={destination} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <DestinationHero destination={destination} />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Breadcrumbs items={breadcrumbItems} />
      </div>

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
      <GallerySection
        images={destination.galleryImages}
        title='Destination Gallery'
      />
      <MapSection
        google_maps_embed={destination.mapsEmbed}
        locationAddress={destination.locationAddress}
      />
      <AEOContent data={destination} />
      <FAQSection content={destination.faqContent} />
    </main>
  )
}
