import { Attraction } from '@/types/attraction'

interface Props {
  attraction: Attraction
}

export default function AttractionCard({ attraction }: Props) {
  return (
    <article>
      {attraction.heroImage?.url && (
        <img
          src={attraction.heroImage.url}
          alt={attraction.heroImage.alt || attraction.title}
          style={{
            width: '300px',
            height: '250px',
          }}
        />
      )}

      <h3 style={{ color: 'purple' }}>{attraction.title}</h3>

      {attraction.shortDescription && <p>{attraction.shortDescription}</p>}

      <a href={`/attractions/${attraction.slug}`}>Explore Attraction</a>
    </article>
  )
}
