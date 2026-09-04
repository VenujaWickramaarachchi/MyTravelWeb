import { Attraction } from '@/types/attraction'

interface Props {
  attraction: Attraction
}

export default function AttractionHighlights({ attraction }: Props) {
  return (
    <section>
      <h2 style={{ color: 'blue' }}>What to See</h2>

      <div>
        <p>{attraction.whatToSee}</p>
      </div>

      <h2 style={{ color: 'purple' }}>Attraction Highlights</h2>

      <div>
        <p>{attraction.attractionHighlights}</p>
      </div>
    </section>
  )
}
