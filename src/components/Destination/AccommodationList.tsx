import AccommodationCard from '@/components/entities/Accommodation/AccommodationCard'

interface Props {
  accommodations: any[]
}

export default function AccommodationList({ accommodations }: Props) {
  return (
    <section>
      <h2>Featured Accommodations</h2>

      <div className='accommodation-grid'>
        {accommodations.map((hotel: any) => (
          <AccommodationCard key={hotel.id} accommodation={hotel} />
        ))}
      </div>
    </section>
  )
}
