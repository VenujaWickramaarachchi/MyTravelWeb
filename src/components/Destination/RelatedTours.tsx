import TourCard from '@/components/entities/Tour/TourCard'

interface Props {
  tours: any[]
}

export default function RelatedTours({ tours }: Props) {
  return (
    <section>
      <h2>Related Tours</h2>

      <div>
        {tours.map((tour: any) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  )
}
