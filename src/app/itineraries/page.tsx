import { getItineraries } from '@/lib/api/itinerary'
import EntityGrid from '@/components/entities/EntityGrid'
import ItineraryCard from '@/components/entities/Itinerary/ItineraryCard'

export default async function ItinerariesPage() {
  const itineraries = await getItineraries()

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12'>
      <header className='max-w-3xl space-y-3'>
        <p className='text-xs font-semibold uppercase tracking-[0.22em] text-violet'>
          Inspiring Island Routes
        </p>
        <h1 className='font-serif text-4xl sm:text-5xl font-normal text-ink tracking-tight'>
          Sri Lanka Travel Itineraries
        </h1>
        <p className='text-base sm:text-lg text-ink/75 leading-relaxed pt-2'>
          Explore carefully planned travel routes connecting the island’s most iconic
          regions, heritage sites, wildlife sanctuaries, and coastal retreats.
        </p>
      </header>

      <section>
        {itineraries.length === 0 ? (
          <div className='p-12 text-center rounded border border-line bg-ivory/50 space-y-2'>
            <h2 className='font-serif text-xl font-medium text-ink'>No itineraries currently available</h2>
            <p className='text-sm text-ink/70'>We are updating our curated travel routes. Please check back soon or contact us for custom planning.</p>
          </div>
        ) : (
          <EntityGrid columns={3}>
            {itineraries.map((itinerary: any) => (
              <ItineraryCard key={itinerary.id} itinerary={itinerary} />
            ))}
          </EntityGrid>
        )}
      </section>
    </main>
  )
}
