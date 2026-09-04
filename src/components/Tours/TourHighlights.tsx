import { Tour } from '@/types/tour'

interface TourHighlightsProps {
  tour: Tour
}

export default function TourHighlights({ tour }: TourHighlightsProps) {
  const highlights = tour.tourHighlights
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)

  if (highlights.length === 0) {
    return null
  }

  return (
    <section>
      <h2>Tour Highlights</h2>

      <ul>
        {highlights.map((highlight, index) => (
          <li key={index}>{highlight}</li>
        ))}
      </ul>
    </section>
  )
}
