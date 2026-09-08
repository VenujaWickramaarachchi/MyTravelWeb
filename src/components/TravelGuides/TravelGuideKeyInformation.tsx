import { TravelGuide } from '@/types/travel-guide'

interface Props {
  travelGuide: TravelGuide
  className?: string
}

export default function TravelGuideKeyInformation({
  travelGuide,
  className = '',
}: Props) {
  if (!travelGuide.keyInformation) {
    return null
  }

  return (
    <section className={`my-12 sm:my-16 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4'>
        <div className='p-6 sm:p-8 rounded border border-line bg-paper shadow-xs space-y-4'>
          <header>
            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep mb-1'>
              At a Glance
            </p>
            <h2 className='font-serif text-2xl sm:text-3xl font-normal text-ink'>
              Key Information
            </h2>
          </header>

          <div
            className='prose-editorial text-sm sm:text-base leading-relaxed'
            dangerouslySetInnerHTML={{
              __html: travelGuide.keyInformation,
            }}
          />
        </div>
      </div>
    </section>
  )
}
