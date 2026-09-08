import { getExperiences } from '@/lib/api/experience'
import EntityGrid from '@/components/entities/EntityGrid'
import ExperienceCard from '@/components/entities/Experience/ExperienceCard'

export default async function ExperiencesPage() {
  const experiences = await getExperiences()

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12'>
      <header className='max-w-3xl space-y-3'>
        <p className='text-xs font-semibold uppercase tracking-[0.22em] text-fern'>
          Authentic Island Moments
        </p>
        <h1 className='font-serif text-4xl sm:text-5xl font-normal text-ink tracking-tight'>
          Immersive Experiences in Sri Lanka
        </h1>
        <p className='text-base sm:text-lg text-ink/75 leading-relaxed pt-2'>
          Beyond ordinary sightseeing: participate in traditional tea plucking, track
          leopards at sunrise, learn age-old spice cookery, and connect deeply with the
          living cultures of Sri Lanka.
        </p>
      </header>

      <section>
        {experiences.length === 0 ? (
          <div className='p-12 text-center rounded border border-line bg-ivory/50 space-y-2'>
            <h2 className='font-serif text-xl font-medium text-ink'>No experiences currently available</h2>
            <p className='text-sm text-ink/70'>We are curating new authentic local experiences. Please check back soon.</p>
          </div>
        ) : (
          <EntityGrid columns={3}>
            {experiences.map((experience: any) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </EntityGrid>
        )}
      </section>
    </main>
  )
}
