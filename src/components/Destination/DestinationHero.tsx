import { Destination } from '@/types/destination'

interface Props {
  destination: Destination
}

export default function DestinationHero({ destination }: Props) {
  return (
    <section className='relative bg-violet-deep text-ivory overflow-hidden py-20 sm:py-28 border-b border-white/10'>
      {/* Background Image overlay if available */}
      {destination.heroImage?.url && (
        <div className='absolute inset-0 z-0'>
          <img
            src={destination.heroImage.url}
            alt={destination.heroImage.alt || destination.title}
            className='w-full h-full object-cover opacity-35'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-violet-deep via-violet-deep/60 to-violet-deep/80' />
        </div>
      )}

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-3xl space-y-4'>
          <div className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold'>
            <span>Destination Guide</span>
            {destination.location && (
              <>
                <span className='text-ivory/50'>•</span>
                <span>{destination.location}</span>
              </>
            )}
          </div>

          <h1 className='font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-ivory tracking-tight leading-[1.12]'>
            {destination.heroTitle || destination.title}
          </h1>

          {destination.heroSubTitle && (
            <p className='text-lg sm:text-xl text-lilac leading-relaxed font-light pt-1'>
              {destination.heroSubTitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
