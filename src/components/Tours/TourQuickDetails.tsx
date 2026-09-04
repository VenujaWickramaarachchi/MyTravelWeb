import { Tour } from '@/types/tour'

interface TourQuickDetailsProps {
  tour: Tour
}

export default function TourQuickDetails({ tour }: TourQuickDetailsProps) {
  return (
    <section>
      <div>
        <span>Duration</span>
        <strong>
          {tour.durationDays} Days / {tour.durationNights} Nights
        </strong>
      </div>

      <div>
        <span>Price From</span>
        <strong>
          {tour.currency} {tour.priceFrom}
        </strong>
      </div>

      <div>
        <span>Tour Style</span>
        <strong>{tour.tourStyle}</strong>
      </div>

      <div>
        <span>Group Size</span>
        <strong>{tour.groupSize}</strong>
      </div>

      <div>
        <span>Best Time</span>
        <strong>{tour.bestTimeToTravel}</strong>
      </div>
    </section>
  )
}
