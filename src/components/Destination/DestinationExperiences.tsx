import ExperienceCard from '@/components/entities/Experience/ExperienceCard'
import EntityGrid from '@/components/entities/EntityGrid'
import { Experience } from '@/types/experience'

interface Props {
  experiences: Experience[]
  className?: string
}

export default function DestinationExperiences({
  experiences,
  className = '',
}: Props) {
  if (!experiences || experiences.length === 0) return null

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-fern mb-2'>
            Local Encounters
          </p>
          <h2 className='font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-ink'>
            Experiences in This Destination
          </h2>
        </header>

        <EntityGrid columns={3}>
          {experiences.map((experience: any) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </EntityGrid>
      </div>
    </section>
  )
}
