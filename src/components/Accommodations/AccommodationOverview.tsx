import { Accommodation } from '@/types/accommodation'

interface Props {
  accommodation: Accommodation
  className?: string
}

export default function AccommodationOverview({
  accommodation,
  className = '',
}: Props) {
  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10'>
        {/* Description / Overview */}
        {accommodation.description && (
          <div className='space-y-4'>
            <header>
              <p className='text-xs font-semibold uppercase tracking-[0.22em] text-amethyst mb-1'>
                Property Overview
              </p>
              <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
                About {accommodation.title}
              </h2>
            </header>

            <div
              className='prose-editorial'
              dangerouslySetInnerHTML={{
                __html: accommodation.description,
              }}
            />
          </div>
        )}

        {/* Why Stay Here */}
        {accommodation.whyStayHere && (
          <div className='p-6 sm:p-8 rounded border border-line bg-ivory/60 space-y-3'>
            <header>
              <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-1'>
                Unique Appeal
              </p>
              <h3 className='font-serif text-2xl font-normal text-ink'>
                Why Stay Here
              </h3>
            </header>

            <div
              className='prose-editorial text-sm sm:text-base leading-relaxed'
              dangerouslySetInnerHTML={{
                __html: accommodation.whyStayHere,
              }}
            />
          </div>
        )}
      </div>
    </section>
  )
}
