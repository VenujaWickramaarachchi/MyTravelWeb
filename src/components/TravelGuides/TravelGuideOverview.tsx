import { TravelGuide } from '@/types/travel-guide'

interface Props {
  travelGuide: TravelGuide
}

export default function TravelGuideOverview({ travelGuide }: Props) {
  return (
    <section>
      <h2 style={{ color: 'red' }}>Guide Introduction</h2>

      {travelGuide.guideIntroduction && (
        <div
          dangerouslySetInnerHTML={{
            __html: travelGuide.guideIntroduction,
          }}
        />
      )}
    </section>
  )
}
