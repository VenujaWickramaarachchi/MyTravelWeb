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
        />
      )}

      <h3>{attraction.title}</h3>

      {attraction.shortDescription && <p>{attraction.shortDescription}</p>}

      <a href={`/attractions/${attraction.slug}`}>Explore Attraction</a>
    </article>
  )
}
