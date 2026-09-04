import { Tour } from '@/types/tour'

interface TourCTAProps {
  tour: Tour
}

export default function TourCTA({ tour }: TourCTAProps) {
  return (
    <section>
      <h2 style={{ color: 'red' }}>Ready to Explore Sri Lanka?</h2>

      <p>
        Interested in the {tour.title}? Get in touch with us and we can help
        plan your journey.
      </p>

      <div>
        <a href='/contact'>Enquire About This Tour</a>

        <a href='/contact'>Customize This Tour</a>
      </div>
    </section>
  )
}
