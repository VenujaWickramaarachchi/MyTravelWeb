import { Accommodation } from '@/types/accommodation'

interface Props {
  accommodation: Accommodation
}

export default function AccommodationHero({ accommodation }: Props) {
  const imageUrl = accommodation.heroImage?.url || accommodation.gallery?.url

  return (
    <section className='relative bg-violet-deep text-ivory overflow-hidden py-20 sm:py-28 border-b border-white/10'>
      {/* Background image overlay */}
      {imageUrl && (
        <div className='absolute inset-0 z-0'>
          <img
            src={imageUrl}
            alt={accommodation.heroImage?.alt || accommodation.title}
            className='w-full h-full object-cover opacity-35'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-violet-deep via-violet-deep/60 to-violet-deep/80' />
        </div>
      )}

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-3xl space-y-4'>
          <div className='flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-amethyst'>
            <span>Boutique Accommodation</span>
            {accommodation.stars && (
              <>
                <span className='text-ivory/50'>•</span>
                <span className='text-gold'>{accommodation.stars} Star</span>
              </>
            )}
            {accommodation.location && (
              <>
                <span className='text-ivory/50'>•</span>
                <span>{accommodation.location}</span>
              </>
            )}
          </div>

          <h1 className='font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-ivory tracking-tight leading-[1.12]'>
            {accommodation.heroTitle || accommodation.title}
          </h1>

          {accommodation.heroSubTitle && (
            <p className='text-lg sm:text-xl text-lilac leading-relaxed font-light'>
              {accommodation.heroSubTitle}
            </p>
          )}

          {accommodation.description && (
            <p className='text-base text-ivory/85 leading-relaxed pt-1'>
              {accommodation.description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
