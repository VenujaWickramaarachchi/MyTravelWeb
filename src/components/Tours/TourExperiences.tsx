import { TourPage } from '@/types/pages/tour-page'

import ExperienceCard from '@/components/entities/Experience/ExperienceCard'

interface TourExperiencesProps {
  tour: TourPage
}

export default function TourExperiences({ tour }: TourExperiencesProps) {
  const experiences = tour.relationships.experiences

  if (experiences.length === 0) {
    return null
  }

  return (
    <section>
      <h2 style={{ color: 'red' }}>Experiences</h2>

      <div>
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </section>
  )
}
