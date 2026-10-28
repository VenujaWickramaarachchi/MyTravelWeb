import { getDestination } from '@/lib/wordpress'

import DestinationHeroGrid from '@/components/Destination/DestinationHeroGrid'
import DestinationHeader from '@/components/Destination/DestinationHeader'
import DestinationSidebar from '@/components/Destination/DestinationSidebar'
import DestinationOverview from '@/components/Destination/DestinationOverview'
import DestinationHighlights from '@/components/Destination/DestinationHighlights'
import DestinationInlinePhotos from '@/components/Destination/DestinationInlinePhotos'
import DestinationTravelGrid from '@/components/Destination/DestinationTravelGrid'
import DestinationAccordionFAQs from '@/components/Destination/DestinationAccordionFAQs'
import MapSection from '@/components/content/Map/MapSection'
import RelatedTours from '@/components/Destination/RelatedTours'
import AttractionList from '@/components/Destination/AttractionList'
import AccommodationList from '@/components/Destination/AccommodationList'
import DestinationExperiences from '@/components/Destination/DestinationExperiences'
import NearbyDestinations from '@/components/Destination/NearbyDestinations'

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
    <main className='pb-24 bg-page text-ink'>
      {/* Search Engine & Answer Engine Schemas */}
      <AEOAnswerSchema data={destination} />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* ==============================================================
          1. TOP HERO SECTION: Edge-to-edge luxury editorial image grid
          (Replaces the dark purple block with 3-4 high-res photos)
          ============================================================== */}
      <DestinationHeroGrid destination={destination} />

      {/* Main Page Container */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* ==============================================================
            2. DESTINATION HEADER & QUICK FACTS ROW
            (Title on clean white/pearl, subtitle, & minimalist scanning icons)
            ============================================================== */}
        <DestinationHeader
          destination={destination}
          breadcrumbItems={breadcrumbItems}
        />

        {/* ==============================================================
            3. TABLET & MOBILE TOP ACTION CARD (< 1024px)
            (Shown immediately below title & quick facts on tablet/phone)
            ============================================================== */}
        <DestinationSidebar
          destination={destination}
          tours={destination.relationships.relatedTours}
          mode='tablet-banner'
        />

        {/* ==============================================================
            4. TWO-COLUMN SPLIT (Desktop: 1024px and up)
            Left: Narrative & Curated Content (68%)
            Right: Sticky Trip Planning & CTA Card (32%)
            ============================================================== */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 xl:gap-16 items-start mt-6 sm:mt-10 lg:mt-12'>
          {/* Main Left Column (Narrative Content) */}
          <div className='lg:col-span-8 space-y-8 sm:space-y-12 lg:space-y-16'>
            {/* 1. About Destination Narrative (Consolidated with Progressive Disclosure Read More +) */}
            <DestinationOverview destination={destination} />

            {/* 2. Signature Activities & Highlights (Bulleted list directly under overview) */}
            <DestinationHighlights destination={destination} />

            {/* 3. Inline Editorial Photography (Distributed Naturally) */}
            <DestinationInlinePhotos destination={destination} />

            {/* 4. Structured Travel Information & Advice (Icon Grid with bulleted weather & tips) */}
            <DestinationTravelGrid destination={destination} />

            {/* Interactive Map & Geographic Orientation */}
            <MapSection
              google_maps_embed={destination.mapsEmbed}
              locationAddress={destination.locationAddress}
              contained
            />

            {/* Sleek Accordion Dropdown FAQs */}
            <DestinationAccordionFAQs
              content={destination.faqContent}
              destinationTitle={destination.title}
            />

            {/* AEO Crawl Content (Wrapped in sr-only to keep SEO keywords in DOM while removing visual clutter) */}
            <div className='sr-only' aria-hidden='true'>
              <AEOContent data={destination} />
            </div>
          </div>

          {/* Right Column: Sticky Trip Planning & CTA Card (Desktop 1024px+) */}
          <div className='hidden lg:block lg:col-span-4 sticky top-24'>
            <DestinationSidebar
              destination={destination}
              tours={destination.relationships.relatedTours}
              mode='sticky'
            />
          </div>
        </div>
      </div>

      {/* ==============================================================
          5. FULL-WIDTH RELATIONSHIP SHOWCASES
          Featuring unified luxury editorial card designs
          ============================================================== */}
      <div className='mt-12 sm:mt-20 lg:mt-24 space-y-12 sm:space-y-20 lg:space-y-24'>
        {/* Private Tours Featuring This Destination */}
        <RelatedTours
          tours={destination.relationships.relatedTours}
          destinationTitle={destination.title}
        />

        {/* Key Attractions in Region */}
        <AttractionList
          attractions={destination.relationships.mainAttractions}
          destinationTitle={destination.title}
        />

        {/* Curated Accommodations & Boutique Stays */}
        <AccommodationList
          accommodations={destination.relationships.accommodations}
          destinationTitle={destination.title}
        />

        {/* Local Encounters & Experiences */}
        <DestinationExperiences
          experiences={destination.relationships.experiences}
          destinationTitle={destination.title}
        />

        {/* Nearby Destinations Circuit */}
        <NearbyDestinations
          nearbyDestinations={destination.relationships.nearbyDestinations}
          destinationTitle={destination.title}
        />
      </div>
    </main>
  )
}
