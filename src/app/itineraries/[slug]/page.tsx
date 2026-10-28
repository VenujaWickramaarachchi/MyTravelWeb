import { getItinerary } from '@/lib/wordpress'

import ItineraryHeroGrid from '@/components/Itineraries/ItineraryHeroGrid'
import ItineraryHeader from '@/components/Itineraries/ItineraryHeader'
import ItinerarySidebar from '@/components/Itineraries/ItinerarySidebar'
import ItineraryOverview from '@/components/Itineraries/ItineraryOverview'
import ItineraryRoute from '@/components/Itineraries/ItineraryRoute'
import ItineraryDays from '@/components/Itineraries/ItineraryDays'
import ItineraryExperiences from '@/components/Itineraries/ItineraryExperiences'
import ItineraryAccommodations from '@/components/Itineraries/ItineraryAccommodations'
import ItineraryRelatedTours from '@/components/Itineraries/ItineraryRelatedTours'
import ItineraryCTA from '@/components/Itineraries/ItineraryCTA'

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
    <main className='pb-24 bg-page text-ink'>
      <AEOAnswerSchema data={itinerary} />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* 1. Hero Imagery (Edge-to-Edge on mobile, luxury mosaic on desktop) */}
      <ItineraryHeroGrid itinerary={itinerary} />

      {/* 2. Main Page Container */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header: Breadcrumbs, Eyebrow, H1 Title & Quick Facts Bar */}
        <ItineraryHeader itinerary={itinerary} breadcrumbItems={breadcrumbItems} />

        {/* Mobile / Tablet Booking CTA Banner (Visible only on < lg screens below Quick Facts) */}
        <ItinerarySidebar itinerary={itinerary} mode='tablet-banner' />

        {/* ==============================================================
            3. TWO-COLUMN DESKTOP ARCHITECTURE (70 / 30 Split)
            Left: Narrative, Travel Route, and Day-by-Day Itinerary Accordions
            Right: Sticky Route Planner & CTA Card
            ============================================================== */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 xl:gap-16 items-start mt-6 sm:mt-10 lg:mt-12'>
          {/* Main Content (Left Column, ~70% width, 8 of 12 columns) */}
          <div className='lg:col-span-8 space-y-8 sm:space-y-12 lg:space-y-16 min-w-0'>
            {/* 1. Itinerary Overview */}
            <ItineraryOverview itinerary={itinerary} />

            {/* 2. The Travel Route */}
            <ItineraryRoute itinerary={itinerary} />

            {/* 3. Day-by-Day Itinerary (Interactive Accordions with Inline Thumbnails & Clean Bullets) */}
            <ItineraryDays itinerary={itinerary} />

            {/* Machine-Readable Semantic Content for Search Engines */}
            <div className='sr-only' aria-hidden='true'>
              <AEOContent data={itinerary} />
            </div>
          </div>

          {/* Sticky Booking Sidebar (~30% width, 4 of 12 columns) */}
          <div className='hidden lg:block lg:col-span-4 sticky top-24'>
            <ItinerarySidebar itinerary={itinerary} mode='sticky' />
          </div>
        </div>
      </div>

      {/* ==============================================================
          4. FULL-WIDTH RELATIONSHIP SHOWCASES
          ============================================================== */}
      <div className='mt-12 sm:mt-20 lg:mt-24 space-y-12 sm:space-y-20 lg:space-y-24'>
        {/* Recommended Accommodations Along This Route */}
        <ItineraryAccommodations itinerary={itinerary} />

        {/* Included Experiences on This Route */}
        <ItineraryExperiences itinerary={itinerary} />

        {/* Private Tours Featuring This Route */}
        <ItineraryRelatedTours itinerary={itinerary} />
      </div>

      {/* 5. Final Custom Journey Planning CTA */}
      <ItineraryCTA itinerary={itinerary} />
    </main>
  )
}
