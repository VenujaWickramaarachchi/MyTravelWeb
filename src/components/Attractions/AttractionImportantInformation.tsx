import { Attraction } from '@/types/attraction'

interface Props {
  attraction: Attraction
}

export default function AttractionImportantInformation({ attraction }: Props) {
  return (
    <section>
      <h2 style={{ color: 'brown' }}>Important Information</h2>

      <p>{attraction.importantInformation}</p>
    </section>
  )
}
