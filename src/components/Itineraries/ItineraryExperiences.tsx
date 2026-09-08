import { ItineraryPage } from '@/types/pages/itinerary-page'
import ExperienceCard from '@/components/entities/Experience/ExperienceCard'
import EntityGrid from '@/components/entities/EntityGrid'

interface Props {
  itinerary: ItineraryPage
  className?: string
}

export default function ItineraryExperiences({
  itinerary,
  className = '',
}: Props) {
  const experiences = itinerary.relationships.experiences

  if (!experiences || experiences.length === 0) {
    return null
  }

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-fern mb-2'>
            Island Activities
          </p>
          <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
            Included Experiences
          </h2>
        </header>

        <EntityGrid columns={3}>
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </EntityGrid>
      </div>
    </section>
  )
}
