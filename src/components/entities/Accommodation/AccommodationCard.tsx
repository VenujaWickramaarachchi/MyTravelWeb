interface Props {
  accommodation: any
}

export default function AccommodationCard({ accommodation }: Props) {
  return (
    <article>
      {accommodation.acf?.gallery?.url && (
        <img
          src={accommodation.acf.gallery.url}
          alt={accommodation.acf.gallery.alt || accommodation.title.rendered}
          style={{
            width: '300px',
            height: '250px',
          }}
        />
      )}

      <h3>{accommodation.title.rendered}</h3>

      {accommodation.acf?.short_description && (
        <p>{accommodation.acf.short_description}</p>
      )}

      {accommodation.acf?.star_rating && (
        <p>⭐ {accommodation.acf.star_rating}</p>
      )}

      {accommodation.acf?.location && <p>📍 {accommodation.acf.location}</p>}
    </article>
  )
}
