import { Accommodation } from '@/types/accommodation'

interface Props {
  accommodation: Accommodation
}

export default function AccommodationHero({ accommodation }: Props) {
  return (
    <section>
      <h1 style={{ color: 'red' }}>{accommodation.heroTitle}</h1>

      <p>{accommodation.heroSubTitle}</p>

      {accommodation.description && <p>{accommodation.description}</p>}
    </section>
  )
}
