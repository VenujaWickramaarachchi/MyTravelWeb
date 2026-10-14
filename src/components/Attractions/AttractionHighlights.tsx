import { Attraction } from '@/types/attraction'

interface Props {
  attraction: Attraction
  className?: string
}

export default function AttractionHighlights({
  attraction,
  className = '',
}: Props) {
  if (!attraction.whatToSee && !attraction.attractionHighlights) {
    return null
  }

  return (
    <section className={`my-16 sm:my-20 bg-ivory/60 py-16 border-y border-line ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10'>
        {attraction.whatToSee && (
          <div className='space-y-3'>
            <header>
              <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-1'>
                Sightseeing Focus
              </p>
              <h2 className='font-serif text-2xl sm:text-3xl font-normal text-ink'>
                What to See
              </h2>
            </header>
            <div
              className='prose-editorial text-sm sm:text-base leading-relaxed'
              dangerouslySetInnerHTML={{
                __html: attraction.whatToSee,
              }}
            />
          </div>
        )}

        {attraction.attractionHighlights && (
          <div className='p-6 sm:p-7 rounded border border-line bg-paper space-y-3'>
            <h3 className='font-serif text-xl sm:text-2xl font-medium text-ink'>
              Key Highlights
            </h3>
            <div
              className='prose-editorial text-sm sm:text-base leading-relaxed'
              dangerouslySetInnerHTML={{
                __html: attraction.attractionHighlights,
              }}
            />
          </div>
        )}
      </div>
    </section>
  )
}
