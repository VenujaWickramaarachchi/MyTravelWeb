import { TravelGuide } from '@/types/travel-guide'

interface Props {
  travelGuide: TravelGuide
}

export default function TravelGuideQuickAnswer({ travelGuide }: Props) {
  if (!travelGuide.quickAnswer) {
    return null
  }

  return (
    <section>
      <h2 style={{ color: 'green' }}>Quick Answer</h2>

      <div
        dangerouslySetInnerHTML={{
          __html: travelGuide.quickAnswer,
        }}
      />
    </section>
  )
}
