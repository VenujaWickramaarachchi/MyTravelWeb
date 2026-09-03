interface Props {
  destination: any
}

export default function DestinationCard({ destination }: Props) {
  return (
    <article>
      {destination.acf?.hero_image && (
        <img
          src={destination.acf.hero_image.url}
          alt={destination.acf.hero_image.alt || destination.title.rendered}
          style={{
            width: '300px',
            height: '250px',
          }}
        />
      )}

      <h3>{destination.title.rendered}</h3>

      {destination.acf?.short_description && (
        <p>{destination.acf.short_description}</p>
      )}

      <a href={`/destinations/${destination.slug}`}>Explore Destination</a>
    </article>
  )
}
