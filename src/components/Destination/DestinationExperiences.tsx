import ExperienceCard from '@/components/entities/Experience/ExperienceCard'

interface Props {
  experiences: any[]
}

export default function DestinationExperiences({ experiences }: Props) {
  console.log('Experiences received:', experiences)
  return (
    <section>
      <h2>Experiences</h2>

      <div>
        {experiences.map((experience: any) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </section>
  )
}
