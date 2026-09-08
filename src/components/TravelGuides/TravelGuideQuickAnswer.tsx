import { TravelGuide } from '@/types/travel-guide'

interface Props {
  travelGuide: TravelGuide
  className?: string
}

export default function TravelGuideQuickAnswer({
  travelGuide,
  className = '',
}: Props) {
  if (!travelGuide.quickAnswer) {
    return null
  }

  return (
    <section className={`my-10 sm:my-14 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='p-6 sm:p-8 rounded border-l-4 border-gold bg-ivory/80 border-y border-r border-line space-y-3'>
          <div className='flex items-center gap-2'>
            <span className='text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep'>
              Quick Answer & Summary
            </span>
          </div>

          <div
            className='prose-editorial text-base sm:text-lg leading-relaxed text-ink/90 font-medium'
            dangerouslySetInnerHTML={{
              __html: travelGuide.quickAnswer,
            }}
          />
        </div>
      </div>
    </section>
  )
}
