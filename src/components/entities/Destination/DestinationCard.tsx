interface Props {
  destination: any
}

export default function DestinationCard({ destination }: Props) {
  return (
    <article>
      {destination.heroImage && (
        <img
          src={destination.heroImage.url}
          alt={destination.heroImage.alt || destination.title}
          style={{
            width: '300px',
            height: '250px',
          }}
        />
      )}

      <h3>{destination.title}</h3>

      {destination.description && <p>{destination.description}</p>}

      <a href={`/destinations/${destination.slug}`}>Explore Destination</a>
    </article>
  )
}
