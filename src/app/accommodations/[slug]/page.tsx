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

interface AccommodationPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function AccommodationPage({
  params,
}: AccommodationPageProps) {
  const { slug } = await params

  const accommodation = await getAccommodation(slug)

  if (!accommodation) {
    notFound()
  }

  return (
    <main>
      <AccommodationHero accommodation={accommodation} />

      <AccommodationOverview accommodation={accommodation} />

      <AccommodationDetails accommodation={accommodation} />

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
