import { Tour } from '@/types/tour'

interface TourInfoProps {
  tour: Tour
}

export default function TourInfo({ tour }: TourInfoProps) {
  return (
    <section>
      {tour.bestTimeToTravel && (
        <div>
          <h2 style={{ color: 'red' }}>Best Time to Travel</h2>
          <p>{tour.bestTimeToTravel}</p>
        </div>
      )}

      {tour.faqContent && (
        <div>
          <h2 style={{ color: 'red' }}>Frequently Asked Questions</h2>

          <div
            dangerouslySetInnerHTML={{
              __html: tour.faqContent,
            }}
          />
        </div>
      )}
    </section>
  )
}
