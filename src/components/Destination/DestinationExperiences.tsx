import ExperienceCard from '@/components/entities/Experience/ExperienceCard'

import { Experience } from '@/types/experience'

interface Props {
  experiences: Experience[]
}

export default function DestinationExperiences({ experiences }: Props) {
  console.log('Experiences received:', experiences)
  return (
    <section>
      <h2 style={{ color: 'red' }}>Experiences</h2>

      <div>
        {experiences.map((experience: any) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </section>
  )
}
