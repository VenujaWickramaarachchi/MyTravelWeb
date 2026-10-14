import { TravelGuide } from '@/types/travel-guide'

interface Props {
  travelGuide: TravelGuide
  className?: string
}

export default function TravelGuideOverview({
  travelGuide,
  className = '',
}: Props) {
  if (!travelGuide.guideIntroduction) return null

  return (
    <section className={`my-10 sm:my-14 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4'>
        <div
          className='prose-editorial text-lg text-ink/85 leading-relaxed font-light'
          dangerouslySetInnerHTML={{
            __html: travelGuide.guideIntroduction,
          }}
        />
      </div>
    </section>
  )
}
