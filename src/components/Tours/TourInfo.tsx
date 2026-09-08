import { Tour } from '@/types/tour'

interface TourInfoProps {
  tour: Tour
  className?: string
}

export default function TourInfo({ tour, className = '' }: TourInfoProps) {
  if (!tour.bestTimeToTravel && !tour.faqContent) return null

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
        {tour.bestTimeToTravel && (
          <div className='p-6 sm:p-7 rounded border border-line bg-paper space-y-2'>
            <span className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep block'>
              Seasonal Advice
            </span>
            <h3 className='font-serif text-2xl font-medium text-ink'>
              Best Time for This Tour
            </h3>
            <p className='text-sm sm:text-base text-ink/80 leading-relaxed pt-1'>
              {tour.bestTimeToTravel}
            </p>
          </div>
        )}

        {tour.faqContent && (
          <div className='p-6 sm:p-8 rounded border border-line bg-paper space-y-4'>
            <header>
              <p className='text-xs font-semibold uppercase tracking-[0.22em] text-violet mb-1'>
                Essential Questions
              </p>
              <h3 className='font-serif text-2xl sm:text-3xl font-normal text-ink'>
                Tour FAQs
              </h3>
            </header>

            <div
              className='prose-editorial text-sm sm:text-base leading-relaxed'
              dangerouslySetInnerHTML={{
                __html: tour.faqContent,
              }}
            />
          </div>
        )}
      </div>
    </section>
  )
}
