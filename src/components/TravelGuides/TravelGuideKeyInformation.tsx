import { TravelGuide } from '@/types/travel-guide'

interface Props {
  travelGuide: TravelGuide
}

export default function TravelGuideKeyInformation({ travelGuide }: Props) {
  if (!travelGuide.keyInformation) {
    return null
  }

  return (
    <section>
      <h2 style={{ color: 'blue' }}>Key Information</h2>

      <div
        dangerouslySetInnerHTML={{
          __html: travelGuide.keyInformation,
        }}
      />
    </section>
  )
}
