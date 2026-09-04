import { Accommodation } from '@/types/accommodation'

interface Props {
  accommodation: Accommodation
}

export default function AccommodationAmenities({ accommodation }: Props) {
  return (
    <section>
      <h2 style={{ color: 'blue' }}>Amenities</h2>

      {accommodation.amenities.length > 0 ? (
        <ul>
          {accommodation.amenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
      ) : (
        <p>No amenities available.</p>
      )}
    </section>
  )
}
