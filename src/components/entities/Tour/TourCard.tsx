interface Props {
  tour: any
}

export default function TourCard({ tour }: Props) {
  return (
    <article>
      {tour.acf?.hero_image && (
        <img
          src={tour.acf.hero_image.url}
          alt={tour.acf.hero_image.alt || tour.title.rendered}
          style={{
            width: '300px',
            height: '200px',
            objectFit: 'cover',
          }}
        />
      )}

      <h3>{tour.title.rendered}</h3>

      {tour.acf?.short_description && <p>{tour.acf.short_description}</p>}

      {tour.acf?.duration && <p>⏱ {tour.acf.duration}</p>}

      <a href={`/tours/${tour.slug}`}>View Tour</a>
    </article>
  )
}
