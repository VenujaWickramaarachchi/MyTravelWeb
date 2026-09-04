import { notFound } from 'next/navigation'
import { getAttraction } from '@/lib/wordpress'

interface AttractionPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function AttractionPage({ params }: AttractionPageProps) {
  const { slug } = await params

  const attraction = await getAttraction(slug)

  if (!attraction) {
    notFound()
  }

  return (
    <main>
      <h1>{attraction.title}</h1>

      <p>{attraction.shortDescription}</p>

      <p>Location: {attraction.location || 'Not available'}</p>

      <p>
        Visit Duration: {attraction.typicalVisitDuration || 'Not available'}
      </p>

      <p>Best Time: {attraction.bestTime || 'Not available'}</p>

      <h2>Destination</h2>

      <p>
        {attraction.relationships.destination?.title || 'No destination linked'}
      </p>

      <h2>Related Experiences</h2>

      {attraction.relationships.relatedExperiences.length > 0 ? (
        <ul>
          {attraction.relationships.relatedExperiences.map((experience) => (
            <li key={experience.id}>{experience.title}</li>
          ))}
        </ul>
      ) : (
        <p>No related experiences linked.</p>
      )}

      <h2>Nearby Attractions</h2>

      {attraction.relationships.nearbyAttractions.length > 0 ? (
        <ul>
          {attraction.relationships.nearbyAttractions.map(
            (nearbyAttraction) => (
              <li key={nearbyAttraction.id}>{nearbyAttraction.title}</li>
            ),
          )}
        </ul>
      ) : (
        <p>No nearby attractions linked.</p>
      )}

      <h2>Related Tours</h2>

      {attraction.relationships.relatedTours.length > 0 ? (
        <ul>
          {attraction.relationships.relatedTours.map((tour) => (
            <li key={tour.id}>{tour.title}</li>
          ))}
        </ul>
      ) : (
        <p>No related tours linked.</p>
      )}
    </main>
  )
}
