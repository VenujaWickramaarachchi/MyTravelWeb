import { TravelGuide } from '@/types/travel-guide'

interface Props {
  travelGuide: TravelGuide
}

export default function TravelGuideHero({ travelGuide }: Props) {
  return (
    <section>
      <h1 style={{ color: 'red' }}>{travelGuide.heroTitle}</h1>

      <p>{travelGuide.heroSubtitle}</p>

      {travelGuide.shortDescription && <p>{travelGuide.shortDescription}</p>}
    </section>
  )
}
