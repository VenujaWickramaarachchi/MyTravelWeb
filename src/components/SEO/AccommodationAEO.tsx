import { Accommodation } from '@/types/accommodation'

interface Props {
  accommodation: Accommodation
}

export default function AccommodationAEO({ accommodation }: Props) {
  if (!accommodation.aeoQuestion || !accommodation.aeoAnswer) {
    return null
  }

  return (
    <section>
      <h2>{accommodation.aeoQuestion}</h2>
      <p>{accommodation.aeoAnswer}</p>
    </section>
  )
}
