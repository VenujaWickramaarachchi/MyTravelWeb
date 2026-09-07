import { getExperiences } from '@/lib/api/experience'
import EntityCard from '@/components/entities/EntityCard'
import EntityGrid from '@/components/entities/EntityGrid'

export default async function ExperiencesPage() {
  const experiences = await getExperiences()

  return (
    <main>
      <section>
        <div>
          <h1>Experiences</h1>

          <p>
            Discover authentic Sri Lankan experiences, from adventure and
            wildlife to culture, food, wellness, and unforgettable local
            moments.
          </p>
        </div>
      </section>

      <section>
        <div>
          {experiences.length === 0 ? (
            <p>No experiences available.</p>
          ) : (
            <EntityGrid>
              {experiences.map((experience: any) => (
                <EntityCard
                  key={experience.id}
                  title={experience.title}
                  slug={experience.slug}
                  href={`/experiences/${experience.slug}`}
                  image={experience.heroImage}
                  description={experience.description}
                />
              ))}
            </EntityGrid>
          )}
        </div>
      </section>
    </main>
  )
}
