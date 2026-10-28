import { ItineraryPage } from '@/types/pages/itinerary-page'
import ExperienceCard from '@/components/entities/Experience/ExperienceCard'
import EntityGrid from '@/components/entities/EntityGrid'
import { BespokeLotusIcon } from '@/components/Shared/CardIcons'

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
    <section className={`my-12 sm:my-20 lg:my-24 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8'>
        <header className='space-y-1 sm:space-y-1.5'>
          <div className='flex items-center gap-2 text-fern'>
            <BespokeLotusIcon className='w-3.5 h-3.5 text-fern' />
            <p className='text-xs font-semibold uppercase tracking-widest text-fern'>
              Immersive Encounters
            </p>
          </div>
          <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight -ml-[2px]'>
            Key Experiences Along This Route
          </h2>
          <p className='text-[15px] sm:text-base text-ink/75 leading-relaxed font-light max-w-2xl'>
            Signature excursions, wildlife encounters, cultural landmarks, and scenic highlights woven into this itinerary.
          </p>
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
