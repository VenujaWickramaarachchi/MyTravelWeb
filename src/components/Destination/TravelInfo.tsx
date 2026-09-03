import { Destination } from '@/types/destination'

interface Props {
  destination: Destination
}

export default function TravelInfo({ destination }: Props) {
  return (
    <section>
      <h2 style={{ color: 'red' }}>How To Get There</h2>

      <div
        dangerouslySetInnerHTML={{
          __html: destination.howtoGetThere,
        }}
      />

      <h2 style={{ color: 'green' }}>Best Time to Visit</h2>
      <p>{destination.bestTimetoVisit}</p>

      <h2 style={{ color: 'green' }}>Recommended Duration</h2>
      <p>{destination.recommendedDuration}</p>

      <h2 style={{ color: 'green' }}>Travel Tips</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: destination.travelTips,
        }}
      />
    </section>
  )
}
