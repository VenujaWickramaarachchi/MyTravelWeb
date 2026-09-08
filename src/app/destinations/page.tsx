import { getDestinations } from '@/lib/api/destination'
import EntityGrid from '@/components/entities/EntityGrid'
import DestinationCard from '@/components/entities/Destination/DestinationCard'
import SectionHeading from '@/components/Shared/SectionHeading'

export default async function DestinationsPage() {
  const destinations = await getDestinations()

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12'>
      <header className='max-w-3xl space-y-3'>
        <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep'>
          The Pearl of the Indian Ocean
        </p>
        <h1 className='font-serif text-4xl sm:text-5xl font-normal text-ink tracking-tight'>
          Destinations of Sri Lanka
        </h1>
        <p className='text-base sm:text-lg text-ink/75 leading-relaxed pt-2'>
          Explore the diverse regions and landscapes of Sri Lanka — from palm-fringed
          southern bays and misty highland tea plantations to UNESCO-listed ancient
          citadels and wildlife-dense national parks.
        </p>
      </header>

      <section>
        {destinations.length === 0 ? (
          <div className='p-12 text-center rounded border border-line bg-ivory/50 space-y-2'>
            <h2 className='font-serif text-xl font-medium text-ink'>No destinations available</h2>
            <p className='text-sm text-ink/70'>We are currently curating new destination guides. Please check back soon.</p>
          </div>
        ) : (
          <EntityGrid columns={3}>
            {destinations.map((destination: any) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </EntityGrid>
        )}
      </section>
    </main>
  )
}
