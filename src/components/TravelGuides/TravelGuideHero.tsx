import { TravelGuide } from '@/types/travel-guide'

interface Props {
  travelGuide: TravelGuide
}

export default function TravelGuideHero({ travelGuide }: Props) {
  return (
    <header className='relative bg-violet-deep text-ivory overflow-hidden py-20 sm:py-28 border-b border-white/10'>
      {/* Background image overlay */}
      {travelGuide.heroImage?.url && (
        <div className='absolute inset-0 z-0'>
          <img
            src={travelGuide.heroImage.url}
            alt={travelGuide.heroImage.alt || travelGuide.title}
            className='w-full h-full object-cover opacity-35'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-violet-deep via-violet-deep/60 to-violet-deep/80' />
        </div>
      )}

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-3xl space-y-4'>
          <div className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold'>
            <span>Editorial Travel Guide</span>
            {travelGuide.lastReviewed && (
              <>
                <span className='text-ivory/50'>•</span>
                <span>Reviewed: {travelGuide.lastReviewed}</span>
              </>
            )}
          </div>

          <h1 className='font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-ivory tracking-tight leading-[1.12]'>
            {travelGuide.heroTitle || travelGuide.title}
          </h1>

          {travelGuide.heroSubtitle && (
            <p className='text-lg sm:text-xl text-lilac leading-relaxed font-light'>
              {travelGuide.heroSubtitle}
            </p>
          )}

          {travelGuide.shortDescription && (
            <p className='text-base text-ivory/85 leading-relaxed pt-1'>
              {travelGuide.shortDescription}
            </p>
          )}
        </div>
      </div>
    </header>
  )
}
