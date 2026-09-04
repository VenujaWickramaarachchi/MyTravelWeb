import ExperienceCard from '@/components/entities/Experience/ExperienceCard'

import { Experience } from '@/types/experience'

interface Props {
  experiences: Experience[]
}

export default function AttractionRelatedExperiences({ experiences }: Props) {
  return (
    <section>
      <h2 style={{ color: 'red' }}>Related Experiences</h2>

      <div>
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </section>
  )
}
