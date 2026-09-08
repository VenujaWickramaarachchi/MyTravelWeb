import { notFound } from 'next/navigation'
import { getAccommodation } from '@/lib/wordpress'

import AccommodationHero from '@/components/Accommodations/AccommodationHero'
import AccommodationOverview from '@/components/Accommodations/AccommodationOverview'
import AccommodationDetails from '@/components/Accommodations/AccommodationDetails'
import AccommodationAmenities from '@/components/Accommodations/AccommodationAmenities'
import AccommodationPrice from '@/components/Accommodations/AccommodationPrice'
import AccommodationDestination from '@/components/Accommodations/AccommodationDestination'
import AccommodationContact from '@/components/Accommodations/AccommodationContact'
import GallerySection from '@/components/content/Gallery/GallerySection'
import Breadcrumbs from '@/components/Shared/Breadcrumbs'

import { generateSEO } from '@/lib/seo'

import AccommodationAEO from '@/components/SEO/AccommodationAEO'
import AccommodationAEOAnswerSchema from '@/components/SEO/AccommodationAEOAnswerSchema'
import BreadcrumbSchema from '@/components/SEO/BreadCrumbSchema'
import { createBreadcrumbs } from '@/lib/breadcrumbs'

interface AccommodationPageProps {
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

  const accommodation = await getAccommodation(slug)

  if (!accommodation) {
    return {}
  }

  return generateSEO({
    seoTitle: accommodation.seoTitle || accommodation.title,
    metaDescription: accommodation.metaDescription,
    canonicalUrl: `https://vioralanka.com/accommodations/${accommodation.slug}`,
  })
}

export default async function AccommodationPage({
  params,
}: AccommodationPageProps) {
  const { slug } = await params

  const accommodation = await getAccommodation(slug)

  if (!accommodation) {
    notFound()
  }

  const breadcrumbItems = createBreadcrumbs(
    'Accommodations',
    'accommodations',
    accommodation.title,
  )

  return (
    <main className='pb-20 space-y-4'>
      <BreadcrumbSchema items={breadcrumbItems} />
      <AccommodationAEOAnswerSchema data={accommodation} />

      <AccommodationHero accommodation={accommodation} />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <AccommodationDetails accommodation={accommodation} />
      <AccommodationOverview accommodation={accommodation} />
      <AccommodationAEO accommodation={accommodation} />
      <AccommodationAmenities accommodation={accommodation} />
      <AccommodationPrice accommodation={accommodation} />
      <GallerySection
        images={accommodation.galleryImages}
        title='Accommodation Gallery'
      />
      <AccommodationDestination accommodation={accommodation} />
      <AccommodationContact accommodation={accommodation} />
    </main>
  )
}
