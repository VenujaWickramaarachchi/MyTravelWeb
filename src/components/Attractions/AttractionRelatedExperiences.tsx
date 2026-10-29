import ExperienceCard from '@/components/entities/Experience/ExperienceCard'
import EntityGrid from '@/components/entities/EntityGrid'
import { BespokeLotusIcon } from '@/components/Shared/CardIcons'
import { Experience } from '@/types/experience'

interface Props {
  experiences: Experience[]
  className?: string
  attractionTitle?: string
}

export default function AttractionRelatedExperiences({
  experiences,
  className = '',
  attractionTitle = 'This Attraction',
}: Props) {
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
            Experiences Around {attractionTitle}
          </h2>
          <p className='text-[15px] sm:text-base text-ink/75 leading-relaxed font-light max-w-2xl'>
            Curated local activities, cultural immersions, and guided adventures surrounding this landmark.
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
