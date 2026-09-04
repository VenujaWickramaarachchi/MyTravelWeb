import { AccommodationPage } from '@/types/pages/accommodation-page'

interface Props {
  accommodation: AccommodationPage
}

export default function AccommodationDestination({ accommodation }: Props) {
  const destination = accommodation.relationships.destination

  if (!destination) {
    return null
  }

  return (
    <section>
      <h2 style={{ color: 'orange' }}>Destination</h2>

      <h3>{destination.title}</h3>

      <p>{destination.description}</p>
    </section>
  )
}
