import { getAttractions } from '@/lib/api/attraction'
import EntityCard from '@/components/entities/EntityCard'
import EntityGrid from '@/components/entities/EntityGrid'

export default async function AttractionsPage() {
  const attractions = await getAttractions()

  return (
    <main>
      <section>
        <div>
          <h1>Attractions</h1>

          <p>
            Explore Sri Lanka's most remarkable attractions, from ancient
            landmarks and cultural sites to scenic viewpoints, beaches, and
            natural wonders.
          </p>
        </div>
      </section>

      <section>
        <div>
          {attractions.length === 0 ? (
            <p>No attractions available.</p>
          ) : (
            <EntityGrid>
              {attractions.map((attraction: any) => (
                <EntityCard
                  key={attraction.id}
                  title={attraction.title}
                  slug={attraction.slug}
                  href={`/attractions/${attraction.slug}`}
                  image={attraction.heroImage}
                  description={attraction.description}
                />
              ))}
            </EntityGrid>
          )}
        </div>
      </section>
    </main>
  )
}
