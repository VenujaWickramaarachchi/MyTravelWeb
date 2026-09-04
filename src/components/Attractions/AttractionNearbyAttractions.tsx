import AttractionCard from '@/components/entities/Attraction/AttractionCard'

import { Attraction } from '@/types/attraction'

interface Props {
  attractions: Attraction[]
}

export default function AttractionNearbyAttractions({ attractions }: Props) {
  return (
    <section>
      <h2 style={{ color: 'orange' }}>Nearby Attractions</h2>

      <div>
        {attractions.map((attraction) => (
          <AttractionCard key={attraction.id} attraction={attraction} />
        ))}
      </div>
    </section>
  )
}
