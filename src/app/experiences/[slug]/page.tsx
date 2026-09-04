import { notFound } from 'next/navigation'
import { getExperience } from '@/lib/wordpress'

import GallerySection from '@/components/content/Gallery/GallerySection'

interface ExperiencePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { slug } = await params

  const experience = await getExperience(slug)

  if (!experience) {
    notFound()
  }

  return (
    <main>
      <h1>{experience.title}</h1>

      <p>{experience.shortDescription}</p>

      <p>Location: {experience.location || 'Not available'}</p>

      <p>Duration: {experience.typicalDuration || 'Not available'}</p>

      <p>Best Time: {experience.bestTime || 'Not available'}</p>

      <p>Activity Level: {experience.activityLevel || 'Not available'}</p>

      <h2>Destinations</h2>

      {experience.relationships.destinations.length > 0 ? (
        <ul>
          {experience.relationships.destinations.map((destination) => (
            <li key={destination.id}>{destination.title}</li>
          ))}
        </ul>
      ) : (
        <p>No destinations linked.</p>
      )}
      <GallerySection
        images={experience.galleryImages}
        title='Experience Gallery'
      />
      <h2>Related Tours</h2>

      {experience.relationships.relatedTours.length > 0 ? (
        <ul>
          {experience.relationships.relatedTours.map((tour) => (
            <li key={tour.id}>{tour.title}</li>
          ))}
        </ul>
      ) : (
        <p>No related tours linked.</p>
      )}
    </main>
  )
}
