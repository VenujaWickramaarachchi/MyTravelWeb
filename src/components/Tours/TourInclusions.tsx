import { Tour } from '@/types/tour'

interface TourInclusionsProps {
  tour: Tour
  className?: string
}

export default function TourInclusions({
  tour,
  className = '',
}: TourInclusionsProps) {
  const inclusions = (tour.inclusions || '')
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)

  const exclusions = (tour.exclusions || '')
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)

  if (inclusions.length === 0 && exclusions.length === 0) {
    return null
  }

  return (
    <section className={`space-y-6 pt-2 ${className}`}>
      <header>
        <span className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep block mb-1.5'>
          Clear Transparency
        </span>
        <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight -ml-[2px]'>
          Inclusions & Exclusions
        </h2>
      </header>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Inclusions */}
        {inclusions.length > 0 && (
          <div className='p-5 sm:p-6 rounded-xl border border-line bg-paper space-y-4 shadow-2xs'>
            <h3 className='font-serif text-lg sm:text-xl font-medium text-fern flex items-center gap-2'>
              <span className='w-5 h-5 rounded-full bg-fern/15 text-fern flex items-center justify-center text-xs font-bold'>
                ✓
              </span>
              <span>What's Included</span>
            </h3>

            <ul className='space-y-2.5 text-[15px] text-ink/80 font-light leading-relaxed'>
              {inclusions.map((item, index) => (
                <li key={`inclusion-${index}`} className='flex items-start gap-2.5'>
                  <span className='text-fern font-bold mt-0.5 flex-shrink-0'>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Exclusions */}
        {exclusions.length > 0 && (
          <div className='p-5 sm:p-6 rounded-xl border border-line bg-ivory/50 space-y-4'>
            <h3 className='font-serif text-lg sm:text-xl font-medium text-ink/75 flex items-center gap-2'>
              <span className='w-5 h-5 rounded-full bg-ink/10 text-ink/60 flex items-center justify-center text-xs font-bold'>
                ✕
              </span>
              <span>Not Included</span>
            </h3>

            <ul className='space-y-2.5 text-[15px] text-ink/70 font-light leading-relaxed'>
              {exclusions.map((item, index) => (
                <li key={`exclusion-${index}`} className='flex items-start gap-2.5'>
                  <span className='text-ink/40 font-bold mt-0.5 flex-shrink-0'>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
