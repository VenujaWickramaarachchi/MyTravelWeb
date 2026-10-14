import { TravelGuide } from '@/types/travel-guide'

interface Props {
  travelGuide: TravelGuide
  className?: string
}

export default function TravelGuideMainContent({
  travelGuide,
  className = '',
}: Props) {
  if (!travelGuide.mainContent) {
    return null
  }

  return (
    <article className={`my-12 sm:my-16 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div
          className='prose-editorial max-w-none'
          dangerouslySetInnerHTML={{
            __html: travelGuide.mainContent,
          }}
        />
      </div>
    </article>
  )
}
