import { TravelGuide } from '@/types/travel-guide'

interface Props {
  travelGuide: TravelGuide
  className?: string
}

export default function TravelGuideAuthor({
  travelGuide,
  className = '',
}: Props) {
  if (!travelGuide.authorExpert && !travelGuide.lastReviewed) {
    return null
  }

  return (
    <section className={`my-12 sm:my-16 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='p-6 rounded border border-line bg-paper flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full bg-violet/10 text-violet flex items-center justify-center font-serif text-base font-semibold'>
              VL
            </div>
            <div>
              <span className='text-[11px] uppercase tracking-wider text-ink/60 font-semibold block'>
                Authored by Specialist
              </span>
              <p className='font-serif text-lg font-medium text-ink'>
                {travelGuide.authorExpert || 'Viora Lanka Editorial Team'}
              </p>
            </div>
          </div>

          {travelGuide.lastReviewed && (
            <div className='text-xs text-ink/60'>
              <span>Last Reviewed: </span>
              <strong className='font-semibold text-ink'>{travelGuide.lastReviewed}</strong>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
