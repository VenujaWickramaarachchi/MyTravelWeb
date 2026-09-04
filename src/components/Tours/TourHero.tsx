import { Tour } from '@/types/tour'

interface TourHeroProps {
  tour: Tour
}

export default function TourHero({ tour }: TourHeroProps) {
  return (
    <section>
      <div>
        <p>
          {tour.durationDays} Days / {tour.durationNights} Nights
        </p>

        <h1>{tour.heroTitle || tour.title}</h1>

        <p>{tour.heroSubtitle}</p>

        {tour.priceFrom && (
          <p>
            From {tour.currency} {tour.priceFrom} {tour.priceDescription}
          </p>
        )}
      </div>

      {tour.heroImage?.url && (
        <img src={tour.heroImage.url} alt={tour.heroImage.alt || tour.title} />
      )}
    </section>
  )
}
