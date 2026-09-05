import { Destination } from '@/types/destination'

interface Props {
  destination: Destination
}

export default function DestinationCard({ destination }: Props) {
  return (
    <article>
      {destination.heroImage?.url && (
        <img
          src={destination.heroImage.url}
          alt={destination.heroImage.alt || destination.title}
        />
      )}

      <h3>{destination.title}</h3>

      {destination.description && (
        <div
          dangerouslySetInnerHTML={{
            __html: destination.description,
          }}
        />
      )}

      <a href={`/destinations/${destination.slug}`}>Explore Destination</a>
    </article>
  )
}
