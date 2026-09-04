import { notFound } from 'next/navigation'
import { getAccommodation } from '@/lib/wordpress'

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
      <h1>{accommodation.title}</h1>

      <p>{accommodation.description}</p>

      <p>
        Destination:{' '}
        {accommodation.relationships.destination?.title || 'Not available'}
      </p>

      <p>Rating: {accommodation.stars || 'Not available'}</p>

      <p>Price Range: {accommodation.price || 'Not available'}</p>
    </main>
  )
}
