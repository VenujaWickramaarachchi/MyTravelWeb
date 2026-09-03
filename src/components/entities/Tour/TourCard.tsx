interface Props {
  tour: any
}

export default function TourCard({ tour }: Props) {
  return (
    <article>
      {tour.heroImage && (
        <img
          src={tour.heroImage.url}
          alt={tour.heroImage.alt || tour.title}
          style={{
            width: '300px',
            height: '200px',
            objectFit: 'cover',
          }}
        />
      )}

      <h3>{tour.title}</h3>

      <p>{tour.shortDescription}</p>

      <p>⏱ {tour.durationDays}</p>
      <p>⏱ {tour.durationNights}</p>

      <a href={`/tours/${tour.slug}`}>View Tour</a>
    </article>
  )
}
