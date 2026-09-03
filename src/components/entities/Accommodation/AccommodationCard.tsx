interface Props {
  accommodation: any
}

export default function AccommodationCard({ accommodation }: Props) {
  console.log('Image url', accommodation.gallery?.url)
  console.log('stars', accommodation.stars)

  return (
    <article>
      {accommodation.gallery?.url && (
        <img
          src={accommodation.gallery?.url}
          alt={accommodation.gallery?.alt || accommodation.title}
          style={{
            width: '300px',
            height: '250px',
          }}
        />
      )}

      <h3>{accommodation.title}</h3>

      <p>{accommodation.description}</p>

      <p>⭐ {accommodation.stars}</p>

      <p>📍 {accommodation.location}</p>
    </article>
  )
}
