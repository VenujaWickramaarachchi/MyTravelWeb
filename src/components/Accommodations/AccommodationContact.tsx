import { Accommodation } from '@/types/accommodation'

interface Props {
  accommodation: Accommodation
}

export default function AccommodationContact({ accommodation }: Props) {
  return (
    <section>
      <h2 style={{ color: 'brown' }}>Contact / Booking</h2>

      {accommodation.contactPhone && (
        <p>
          <strong>Phone:</strong> {accommodation.contactPhone}
        </p>
      )}

      {accommodation.email && (
        <p>
          <strong>Email:</strong> {accommodation.email}
        </p>
      )}

      {accommodation.officialWebsite && (
        <p>
          <strong>Official Website:</strong> {accommodation.officialWebsite}
        </p>
      )}

      {accommodation.bookingUrl && (
        <p>
          <strong>Booking:</strong> {accommodation.bookingUrl}
        </p>
      )}
    </section>
  )
}
