import AttractionCard from '../entities/Attraction/AttractionCard'

import { Attraction } from '@/types/attraction'

interface Props {
  attractions: Attraction[]
}

export default function AttractionList({ attractions }: Props) {
  return (
    <section>
      <h2 style={{ color: 'Brown' }}>Attraction list</h2>

      <div className='attraction-grid'>
        {attractions.map((attraction: any) => (
          <AttractionCard key={attraction.id} attraction={attraction} />
        ))}
      </div>
    </section>
  )
}
