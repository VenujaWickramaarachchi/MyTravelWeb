import { Attraction } from '@/types/attraction'

interface Props {
  attraction: Attraction
}

export default function AttractionHero({ attraction }: Props) {
  return (
    <section>
      <h1 style={{ color: 'red' }}>{attraction.heroTitle}</h1>

      <p>{attraction.heroSubtitle}</p>

      {attraction.shortDescription && <p>{attraction.shortDescription}</p>}
    </section>
  )
}
