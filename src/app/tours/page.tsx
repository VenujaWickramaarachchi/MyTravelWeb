import { getTours } from '@/lib/api/tour'
import EntityCard from '@/components/entities/EntityCard'
import EntityGrid from '@/components/entities/EntityGrid'

export default async function ToursPage() {
  const tours = await getTours()

  return (
    <main>
      <section>
        <div>
          <h1>Tours</h1>

          <p>
            Discover unforgettable Sri Lanka tours designed around culture,
            nature, wildlife, beaches, adventure, and authentic experiences.
          </p>
        </div>
      </section>

      <section>
        <div>
          {tours.length === 0 ? (
            <p>No tours available.</p>
          ) : (
            <EntityGrid>
              {tours.map((tour: any) => (
                <EntityCard
                  key={tour.id}
                  title={tour.title}
                  slug={tour.slug}
                  href={`/tours/${tour.slug}`}
                  image={tour.heroImage}
                  description={tour.description}
                />
              ))}
            </EntityGrid>
          )}
        </div>
      </section>
    </main>
  )
}
