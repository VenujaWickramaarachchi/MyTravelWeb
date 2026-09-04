import { Tour } from '@/types/tour'

interface TourOverviewProps {
  tour: Tour
}

export default function TourOverview({ tour }: TourOverviewProps) {
  return (
    <section>
      <h2>Tour Overview</h2>

      <div
        dangerouslySetInnerHTML={{
          __html: tour.tourOverview,
        }}
      />
    </section>
  )
}
