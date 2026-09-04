import { Attraction } from '@/types/attraction'

interface Props {
  attraction: Attraction
}

export default function AttractionDetails({ attraction }: Props) {
  return (
    <section>
      <h2 style={{ color: 'green' }}>Attraction Details</h2>

      <p>
        <strong>Location:</strong> {attraction.location}
      </p>

      <p>
        <strong>Typical Visit Duration:</strong>{' '}
        {attraction.typicalVisitDuration}
      </p>

      <p>
        <strong>Best Time to Visit:</strong> {attraction.bestTime}
      </p>
    </section>
  )
}
