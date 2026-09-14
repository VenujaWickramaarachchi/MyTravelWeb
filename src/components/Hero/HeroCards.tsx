import Image from 'next/image'
import type { HeroItem } from '@/types/hero'

interface HeroCardsProps {
  destinations: HeroItem[]
  activeIndex: number
  onSelect: (index: number) => void
  onPrev: () => void
  onNext: () => void
}

// Configuration for each position in the cascading stack
// Position 0: Active (largest, foreground, scale 1.0)
// Position 1: Second (~88% of active, shifted right)
// Position 2: Third (~76% of active, shifted right)
// Position 3: Fourth (~64% of active, shifted right, hidden on mobile)
interface TierConfig {
  scaleClass: string
  translateClass: string
  zIndexClass: string
  opacityClass: string
  visibilityClass: string
}

const TIER_CONFIGS: TierConfig[] = [
  {
    // Position 0: Active (Largest)
    scaleClass: 'scale-100',
    translateClass: 'translate-x-0',
    zIndexClass: 'z-40',
    opacityClass: 'opacity-100',
    visibilityClass: 'block',
  },
  {
    // Position 1: Second (~88% of active)
    scaleClass: 'scale-[0.85] sm:scale-[0.86] lg:scale-[0.88]',
    translateClass: 'translate-x-[52%] sm:translate-x-[56%] lg:translate-x-[62%]',
    zIndexClass: 'z-30',
    opacityClass: 'opacity-90',
    visibilityClass: 'block',
  },
  {
    // Position 2: Third (~76% of active)
    scaleClass: 'scale-[0.72] sm:scale-[0.74] lg:scale-[0.76]',
    translateClass: 'translate-x-[92%] sm:translate-x-[100%] lg:translate-x-[112%]',
    zIndexClass: 'z-20',
    opacityClass: 'opacity-80',
    visibilityClass: 'block',
  },
  {
    // Position 3: Fourth (~64% of active, hidden on mobile for clean fit)
    scaleClass: 'scale-[0.60] lg:scale-[0.64]',
    translateClass: 'translate-x-[136%] lg:translate-x-[152%]',
    zIndexClass: 'z-10',
    opacityClass: 'opacity-65',
    visibilityClass: 'hidden md:block',
  },
]

export default function HeroCards({
  destinations,
  activeIndex,
  onSelect,
  onPrev,
  onNext,
}: HeroCardsProps) {
  if (!destinations || destinations.length === 0) {
    return null
  }

  // Display up to 4 cascading cards based on available destinations
  const visibleCount = Math.min(destinations.length, TIER_CONFIGS.length)
  const visibleTiers = TIER_CONFIGS.slice(0, visibleCount)

  return (
    <div className='flex flex-col gap-4 sm:gap-5 z-10 w-full lg:w-[540px] xl:w-[620px] 2xl:w-[640px] shrink-0'>
      {/* Cascading Cards Stage */}
      <div className='relative w-full h-[260px] sm:h-[320px] md:h-[350px] lg:h-[390px] xl:h-[425px] select-none'>
        {visibleTiers.map((tier, position) => {
          // Circular index calculation: position 0 is always activeIndex
          const destIndex = (activeIndex + position) % destinations.length
          const destination = destinations[destIndex]
          const isActive = position === 0
          const imageUrl =
            destination.heroImage?.url || destination.galleryImages?.[0]?.url

          return (
            <button
              type='button'
              key={position}
              onClick={() => onSelect(destIndex)}
              aria-label={
                isActive
                  ? `Active destination: ${destination.title}`
                  : `Select destination ${destination.title}`
              }
              aria-current={isActive ? 'true' : undefined}
              data-tier={position}
              data-destination-id={destination.id}
              className={`absolute bottom-0 left-0 origin-bottom-left text-left rounded-lg overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:z-50 ${tier.visibilityClass} ${tier.scaleClass} ${tier.translateClass} ${tier.zIndexClass} ${tier.opacityClass} w-[190px] sm:w-[230px] md:w-[250px] lg:w-[280px] xl:w-[305px] h-[260px] sm:h-[320px] md:h-[350px] lg:h-[390px] xl:h-[425px] ${isActive
                  ? 'border-2 border-gold/90 ring-2 ring-gold/30 shadow-[0_12px_36px_rgba(0,0,0,0.6)]'
                  : 'border border-white/25 hover:border-gold/50 shadow-[0_8px_24px_rgba(0,0,0,0.4)]'
                }`}
            >
              {/* Card Image */}
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={destination.heroImage?.alt || destination.title}
                  fill
                  sizes='(max-width: 640px) 190px, (max-width: 1024px) 250px, 310px'
                  className='object-cover object-center'
                />
              ) : (
                <div className='w-full h-full bg-[#18151D] flex items-center justify-center text-ivory/40 text-xs font-serif p-3 text-center'>
                  {destination.title}
                </div>
              )}

              {/* Neutral Editorial Gradient Overlay for Text Contrast (No purple tint) */}
              <div
                className='absolute inset-0 pointer-events-none'
                style={{
                  background:
                    'linear-gradient(to top, rgba(0, 0, 0, 0.90) 0%, rgba(0, 0, 0, 0.40) 45%, transparent 75%)',
                }}
                aria-hidden='true'
              />

              {/* Active Indicator Badge */}
              {isActive && (
                <div className='absolute top-3 left-3 z-10 bg-gold text-ink text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-pill shadow-xs pointer-events-none'>
                  Active
                </div>
              )}

              {/* Bottom Card Destination Info */}
              <div className='absolute bottom-0 inset-x-0 p-3 sm:p-4 text-left pointer-events-none z-10'>
                {destination.location && (
                  <span
                    className={`block uppercase font-semibold truncate ${isActive
                        ? 'text-[10px] sm:text-xs tracking-widest text-gold mb-0.5'
                        : 'text-[9px] sm:text-[10px] tracking-wider text-ivory/60 mb-0.5'
                      }`}
                  >
                    {destination.location}
                  </span>
                )}
                <span
                  className={`block font-serif font-medium text-ivory leading-tight truncate ${isActive
                      ? 'text-base sm:text-lg lg:text-xl'
                      : 'text-xs sm:text-sm lg:text-base'
                    }`}
                >
                  {destination.title}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Controls Bar: Progress Counter & Prev/Next Buttons */}
      <div className='flex items-center justify-between pt-3 sm:pt-4 border-t border-white/10'>
        {/* Editorial Counter */}
        <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ivory/80'>
          <span className='text-gold font-serif text-lg leading-none'>
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span className='text-ivory/40'>/</span>
          <span>{String(destinations.length).padStart(2, '0')}</span>
        </div>

        {/* Navigation Buttons */}
        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={onPrev}
            aria-label='Previous destination'
            className='w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-white/10 hover:bg-gold hover:text-ink hover:border-gold text-ivory flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer'
          >
            <svg
              className='w-4 h-4 transform rotate-180'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
          <button
            type='button'
            onClick={onNext}
            aria-label='Next destination'
            className='w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-white/10 hover:bg-gold hover:text-ink hover:border-gold text-ivory flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
