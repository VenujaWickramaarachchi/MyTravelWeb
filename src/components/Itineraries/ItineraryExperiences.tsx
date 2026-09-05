import { ItineraryPage } from '@/types/pages/itinerary-page'

import ExperienceCard from '@/components/entities/Experience/ExperienceCard'

interface Props {
  itinerary: ItineraryPage
}

export default function ItineraryExperiences({ itinerary }: Props) {
  const experiences = itinerary.relationships.experiences

  if (experiences.length === 0) {
    return null
  }

  return (
    <section>
      <h2>Experiences</h2>

      <div>
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </section>
  )
}
