import { TravelGuide } from '@/types/travel-guide'

interface Props {
  travelGuide: TravelGuide
}

export default function TravelGuideMainContent({ travelGuide }: Props) {
  if (!travelGuide.mainContent) {
    return null
  }

  return (
    <section>
      <h2 style={{ color: 'purple' }}>Travel Guide</h2>

      <div
        dangerouslySetInnerHTML={{
          __html: travelGuide.mainContent,
        }}
      />
    </section>
  )
}
