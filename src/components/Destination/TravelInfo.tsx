import { Destination } from '@/types/destination'

interface Props {
  destination: Destination
}

export default function TravelInfo({ destination }: Props) {
  const hasQuickStats =
    destination.bestTimetoVisit || destination.recommendedDuration

  return (
    <section className='my-16 sm:my-20 bg-ivory/60 py-16 border-y border-line'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-2'>
            Practical Essentials
          </p>
          <h2 className='font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-ink'>
            Travel Information & Advice
          </h2>
        </header>

        {/* Quick Facts Strip */}
        {hasQuickStats && (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {destination.bestTimetoVisit && (
              <div className='p-5 rounded bg-paper border border-line space-y-1'>
                <span className='text-xs uppercase tracking-wider text-gold-deep font-semibold block'>
                  🗓️ Best Time to Visit
                </span>
                <p className='text-base font-medium text-ink'>
                  {destination.bestTimetoVisit}
                </p>
              </div>
            )}

            {destination.recommendedDuration && (
              <div className='p-5 rounded bg-paper border border-line space-y-1'>
                <span className='text-xs uppercase tracking-wider text-violet font-semibold block'>
                  ⏱️ Recommended Stay
                </span>
                <p className='text-base font-medium text-ink'>
                  {destination.recommendedDuration}
                </p>
              </div>
            )}
          </div>
        )}

        {/* How to get there */}
        {destination.howtoGetThere && (
          <div className='space-y-3'>
            <h3 className='font-serif text-xl sm:text-2xl font-medium text-ink'>
              How to Get There
            </h3>
            <div
              className='prose-editorial text-sm sm:text-base leading-relaxed'
              dangerouslySetInnerHTML={{
                __html: destination.howtoGetThere,
              }}
            />
          </div>
        )}

        {/* Travel Tips */}
        {destination.travelTips && (
          <div className='p-6 rounded border border-line bg-paper space-y-3'>
            <h3 className='font-serif text-xl font-medium text-ink flex items-center gap-2'>
              <span className='text-gold'>💡</span>
              <span>Local Travel Tips</span>
            </h3>
            <div
              className='prose-editorial text-sm sm:text-base leading-relaxed'
              dangerouslySetInnerHTML={{
                __html: destination.travelTips,
              }}
            />
          </div>
        )}
      </div>
    </section>
  )
}
