import { Destination } from '@/types/destination'

interface Props {
  destination: Destination
}

export default function DestinationHero({ destination }: Props) {
  return (
    <section>
      <h1>{destination.heroTitle}</h1>

      <p>{destination.heroSubTitle}</p>
    </section>
  )
}
