import { Accommodation } from '@/types/accommodation'

interface Props {
  accommodation: Accommodation
}

export default function AccommodationDetails({ accommodation }: Props) {
  return (
    <section>
      <h2 style={{ color: 'green' }}>Accommodation Details</h2>

      <p>
        <strong>Location:</strong> {accommodation.location}
      </p>

      <p>
        <strong>Address:</strong> {accommodation.address}
      </p>

      {accommodation.stars !== null && (
        <p>
          <strong>Star Rating:</strong> {accommodation.stars}
        </p>
      )}
    </section>
  )
}
