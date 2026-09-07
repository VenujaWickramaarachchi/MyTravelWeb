import Link from 'next/link'
import { getDestinations } from '@/lib/api/destination'

import { Destination } from '@/types/destination'

export default async function DestinationsPage() {
  const destinations = await getDestinations()

  return (
    <main>
      <section>
        <div>
          <h1>Destinations</h1>

          <p>
            Explore the diverse destinations of Sri Lanka, from golden beaches
            and historic cities to misty mountains and wildlife-rich regions.
          </p>
        </div>
      </section>

      <section>
        <div>
          {destinations.length === 0 ? (
            <p>No destinations available.</p>
          ) : (
            <div>
              {destinations.map((destination: any) => (
                <article key={destination.id}>
                  <Link href={`/destinations/${destination.slug}`}>
                    {destination.heroImage?.url ? (
                      <img
                        src={destination.heroImage.url}
                        alt={destination.heroImage.alt || destination.title}
                      />
                    ) : null}

                    <div>
                      <h2>{destination.title}</h2>

                      {destination.description ? (
                        <p>{destination.description}</p>
                      ) : null}

                      {destination.location ? (
                        <p>{destination.location}</p>
                      ) : null}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
