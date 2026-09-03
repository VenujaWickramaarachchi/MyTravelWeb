import { Destination } from '@/types/destination'

interface Props {
  destination: Destination
}

export default function DestinationOverview({ destination }: Props) {
  return (
    <section>
      <h2 style={{ color: 'red' }}>About {destination.title}</h2>

      <p>{destination.description}</p>

      <div
        dangerouslySetInnerHTML={{
          __html: destination.overview,
        }}
      />
      <p style={{ color: 'yellow' }}>{destination.location}</p>
      <h2 style={{ color: 'green' }}> Things to Do</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: destination.thingsToDo,
        }}
      />
      <h2 style={{ color: 'green' }}> Destination Type</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: destination.destinationType,
        }}
      />
    </section>
  )
}
