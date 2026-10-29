import { getAttraction } from '@/lib/wordpress'

import AttractionHeroGrid from '@/components/Attractions/AttractionHeroGrid'
import AttractionHeader from '@/components/Attractions/AttractionHeader'
import AttractionSidebar from '@/components/Attractions/AttractionSidebar'
import AttractionOverview from '@/components/Attractions/AttractionOverview'
import AttractionHighlights from '@/components/Attractions/AttractionHighlights'
import AttractionImportantInformation from '@/components/Attractions/AttractionImportantInformation'
import AttractionNearbyAttractions from '@/components/Attractions/AttractionNearbyAttractions'
import AttractionAccordionFAQs from '@/components/Attractions/AttractionAccordionFAQs'
import AttractionRelatedTours from '@/components/Attractions/AttractionRelatedTours'
import AttractionRelatedExperiences from '@/components/Attractions/AttractionRelatedExperiences'

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
    return (
      <main className='max-w-4xl mx-auto px-4 py-24 text-center space-y-4'>
        <h1 className='font-serif text-3xl sm:text-4xl text-ink'>
          Attraction Not Found
        </h1>
        <p className='text-ink/70'>
          The attraction you are looking for is currently unavailable.
        </p>
      </main>
    )
  }

  const breadcrumbItems = createBreadcrumbs(
    'Attractions',
    'attractions',
    attraction.breadcrumbLabel || attraction.title,
  )

  return (
    <main className='pb-24 bg-page text-ink'>
      {/* Search Engine & Answer Engine Schemas */}
      <AEOAnswerSchema data={attraction} />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* ==============================================================
          1. TOP HERO SECTION: High-End Masonry Image Grid
          (Replaces solid dark purple block; edge-to-edge on mobile < 768px,
           mosaic on desktop)
          ============================================================== */}
      <AttractionHeroGrid attraction={attraction} />

      {/* Main Page Container */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* ==============================================================
            2. ATTRACTION HEADER & QUICK FACTS ROW
            (Title on clean white/paper, subtitle, & minimalist scanning icons)
            ============================================================== */}
        <AttractionHeader
          attraction={attraction}
          breadcrumbItems={breadcrumbItems}
        />

        {/* ==============================================================
            3. TABLET & MOBILE TOP ACTION CARD (< 1024px)
            (Shown immediately below Quick Facts row on tablet/mobile so users
             see the booking option without scrolling to the bottom)
            ============================================================== */}
        <AttractionSidebar
          attraction={attraction}
          tours={attraction.relationships.relatedTours}
          mode='tablet-banner'
        />

        {/* ==============================================================
            4. TWO-COLUMN DESKTOP ARCHITECTURE (70 / 30 Split)
            Left: Narrative & Curated Landmark Content (~70% width, 8 cols)
            Right: Sticky Tour Booking & CTA Card (~30% width, 4 cols)
            ============================================================== */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 xl:gap-16 items-start mt-6 sm:mt-10 lg:mt-12'>
          {/* Main Left Column (~70% width, 8 of 12 columns) */}
          <div className='lg:col-span-8 space-y-8 sm:space-y-12 lg:space-y-16 min-w-0'>
            {/* 1. Overview Narrative with Progressive Disclosure Read More + */}
            <AttractionOverview attraction={attraction} />

            {/* 2. What to See & Bulleted Key Highlights */}
            <AttractionHighlights attraction={attraction} />

            {/* 3. Important Information (Clean Bulleted Checklist) */}
            <AttractionImportantInformation attraction={attraction} />

            {/* 4. Nearby Attractions (Refined Row of Image-Based Cards) */}
            <AttractionNearbyAttractions
              attractions={attraction.relationships.nearbyAttractions}
            />

            {/* 5. Sleek Accordion Dropdown FAQs */}
            <AttractionAccordionFAQs
              content={attraction.faqContent}
              attractionTitle={attraction.title}
            />

            {/* Machine-Readable Semantic Content for Search Engines */}
            <div className='sr-only' aria-hidden='true'>
              <AEOContent data={attraction} />
            </div>
          </div>

          {/* Right Column: Sticky Sidebar (~30% width, 4 cols, Desktop 1024px+) */}
          <div className='hidden lg:block lg:col-span-4 sticky top-24'>
            <AttractionSidebar
              attraction={attraction}
              tours={attraction.relationships.relatedTours}
              mode='sticky'
            />
          </div>
        </div>
      </div>

      {/* ==============================================================
          5. FULL-WIDTH RELATIONSHIP SHOWCASES (Bottom of page like other pages)
          - Related Tours (before experiences)
          - Related Experiences
          ============================================================== */}
      <div className='mt-12 sm:mt-20 lg:mt-24 space-y-12 sm:space-y-20 lg:space-y-24'>
        {/* Private Tours Visiting This Attraction (Before Experience Cards) */}
        <AttractionRelatedTours
          tours={attraction.relationships.relatedTours}
          attractionTitle={attraction.title}
        />

        {/* Related Experience Blocks at the Bottom Like Other Pages */}
        <AttractionRelatedExperiences
          experiences={attraction.relationships.relatedExperiences}
          attractionTitle={attraction.title}
        />
      </div>
    </main>
  )
}
