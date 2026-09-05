import { TravelGuide } from '@/types/travel-guide'

interface Props {
  travelGuide: TravelGuide
}

export default function TravelGuideAuthor({ travelGuide }: Props) {
  if (!travelGuide.authorExpert) {
    return null
  }

  return (
    <section>
      <h2>Author / Expert</h2>

      <p>{travelGuide.authorExpert}</p>

      {travelGuide.lastReviewed && (
        <p>
          <strong>Last Reviewed:</strong> {travelGuide.lastReviewed}
        </p>
      )}
    </section>
  )
}
