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
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-2'>
            Clear Transparency
          </p>
          <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
            Inclusions & Exclusions
          </h2>
        </header>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Inclusions */}
          {inclusions.length > 0 && (
            <div className='p-6 sm:p-7 rounded border border-line bg-paper space-y-4'>
              <h3 className='font-serif text-xl font-medium text-fern flex items-center gap-2'>
                <span className='w-5 h-5 rounded-full bg-fern/10 text-fern flex items-center justify-center text-xs font-bold'>
                  ✓
                </span>
                <span>What's Included</span>
              </h3>

              <ul className='space-y-3 text-sm text-ink/80'>
                {inclusions.map((item, index) => (
                  <li key={`inclusion-${index}`} className='flex items-start gap-2.5'>
                    <span className='text-fern font-bold mt-0.5'>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Exclusions */}
          {exclusions.length > 0 && (
            <div className='p-6 sm:p-7 rounded border border-line bg-ivory/50 space-y-4'>
              <h3 className='font-serif text-xl font-medium text-ink/75 flex items-center gap-2'>
                <span className='w-5 h-5 rounded-full bg-ink/10 text-ink/60 flex items-center justify-center text-xs font-bold'>
                  ✕
                </span>
                <span>Not Included</span>
              </h3>

              <ul className='space-y-3 text-sm text-ink/70'>
                {exclusions.map((item, index) => (
                  <li key={`exclusion-${index}`} className='flex items-start gap-2.5'>
                    <span className='text-ink/40 font-bold mt-0.5'>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
