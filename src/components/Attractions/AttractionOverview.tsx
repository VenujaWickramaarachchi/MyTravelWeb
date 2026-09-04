import { Attraction } from '@/types/attraction'

interface Props {
  attraction: Attraction
}

export default function AttractionOverview({ attraction }: Props) {
  return (
    <section>
      <h2 style={{ color: 'red' }}>About {attraction.title}</h2>

      <div
        dangerouslySetInnerHTML={{
          __html: attraction.attractionOverview,
        }}
      />

      {attraction.location && (
        <p>
          <strong>Location:</strong> {attraction.location}
        </p>
      )}
    </section>
  )
}
