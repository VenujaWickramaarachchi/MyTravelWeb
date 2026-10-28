import { getTour } from '@/lib/wordpress'

import TourHeroGrid from '@/components/Tours/TourHeroGrid'
import TourHeader from '@/components/Tours/TourHeader'
import TourSidebar from '@/components/Tours/TourSidebar'
import TourOverview from '@/components/Tours/TourOverview'
import TourHighlights from '@/components/Tours/TourHighlights'
import TourItinerary from '@/components/Tours/TourItinerary'
import TourInclusions from '@/components/Tours/TourInclusions'
import TourInfo from '@/components/Tours/TourInfo'
import TourAccordionFAQs from '@/components/Tours/TourAccordionFAQs'

import TourDestinations from '@/components/Tours/TourDestinations'
import TourExperiences from '@/components/Tours/TourExperiences'
import TourItineraryCard from '@/components/Tours/TourItineraryCard'
import TourAccommodations from '@/components/Tours/TourAccommodations'
import TourTestimonials from '@/components/Tours/TourTestimonials'
import TourCTA from '@/components/Tours/TourCTA'

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
    return (
      <main className='max-w-4xl mx-auto px-4 py-24 text-center space-y-4'>
        <h1 className='font-serif text-3xl sm:text-4xl text-ink'>Tour Not Found</h1>
        <p className='text-ink/70'>
          The tour you are looking for is currently unavailable.
        </p>
      </main>
    )
  }

  const breadcrumbItems = createBreadcrumbs(
    'Tours',
    'tours',
    tour.breadcrumbLabel || tour.title,
  )

  return (
    <main className='pb-24 bg-page text-ink'>
      <AEOAnswerSchema data={tour} />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* 1. Hero Masonry Image Grid (Edge-to-Edge on mobile, luxury mosaic on desktop) */}
      <TourHeroGrid tour={tour} />

      {/* 2. Main Page Container */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header: Breadcrumbs, Eyebrow, H1 Title & Quick Facts Bar */}
        <TourHeader tour={tour} breadcrumbItems={breadcrumbItems} />

        {/* Mobile / Tablet Booking CTA Banner (Visible only on < lg screens below Quick Facts) */}
        <TourSidebar tour={tour} mode='tablet-banner' />

        {/* ==============================================================
            3. TWO-COLUMN DESKTOP ARCHITECTURE (70 / 30 Split)
            Left: Narrative, Itinerary, Inclusions, and FAQ Accordions
            Right: Sticky Trip Planning & CTA Card
            ============================================================== */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 xl:gap-16 items-start mt-6 sm:mt-10 lg:mt-12'>
          {/* Main Narrative Column (~70% width, 8 of 12 columns) */}
          <div className='lg:col-span-8 space-y-8 sm:space-y-12 lg:space-y-16 min-w-0'>
            {/* 1. Tour Overview Narrative */}
            <TourOverview tour={tour} />

            {/* 2. Tour Highlights (Clean 2-Column Checklist) */}
            <TourHighlights tour={tour} />

            {/* 3. Detailed Day-by-Day Journey (Interactive Accordions with Inline Thumbnails) */}
            <TourItinerary tour={tour} />

            {/* 4. Inclusions & Exclusions */}
            <TourInclusions tour={tour} />

            {/* 5. Seasonal Advice */}
            <TourInfo tour={tour} />

            {/* 6. Sleek Accordion Dropdown FAQs (Matched to Destination Page) */}
            <TourAccordionFAQs content={tour.faqContent} tourTitle={tour.title} />

            {/* Machine-Readable Semantic Content for Search Engines */}
            <div className='sr-only' aria-hidden='true'>
              <AEOContent data={tour} />
            </div>
          </div>

          {/* Sticky Booking Sidebar (~30% width, 4 of 12 columns) */}
          <div className='hidden lg:block lg:col-span-4 sticky top-24'>
            <TourSidebar tour={tour} mode='sticky' />
          </div>
        </div>
      </div>

      {/* ==============================================================
          4. FULL-WIDTH RELATIONSHIP SHOWCASES
          Featuring unified luxury editorial card designs matching the Destination Page
          ============================================================== */}
      <div className='mt-12 sm:mt-20 lg:mt-24 space-y-12 sm:space-y-20 lg:space-y-24'>
        {/* Destinations Visited on This Tour (Full-Bleed Cards) */}
        <TourDestinations tour={tour} />

        {/* Included Experiences on This Tour (Full-Bleed Cards) */}
        <TourExperiences tour={tour} />

        {/* Featured Itinerary Route Card */}
        <TourItineraryCard tour={tour} />

        {/* Handpicked Accommodations & Boutique Stays (Full-Bleed Cards) */}
        <TourAccommodations tour={tour} />

        {/* Guest Reflections & Testimonials */}
        <TourTestimonials tour={tour} />
      </div>

      {/* 5. Final Inspirational CTA Banner */}
      <TourCTA tour={tour} />
    </main>
  )
}
