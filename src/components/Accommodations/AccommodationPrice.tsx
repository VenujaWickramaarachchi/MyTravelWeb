import { Accommodation } from '@/types/accommodation'

interface Props {
  accommodation: Accommodation
}

export default function AccommodationPrice({ accommodation }: Props) {
  if (!accommodation.price) {
    return null
  }

  return (
    <section>
      <h2 style={{ color: 'purple' }}>Price</h2>

      <p>
        <strong>Price:</strong> {accommodation.price}
      </p>
    </section>
  )
}
