import type { Destination } from '@/types/destination'
import {
  CarTransitIcon,
  SunSeasonIcon,
  LightbulbTipIcon,
  BespokeLotusIcon,
} from '@/components/Shared/CardIcons'

interface Props {
  destination: Destination
  className?: string
}

function parseBulletItems(raw: string | undefined | null, fallback: string[] = []): string[] {
  if (!raw) return fallback

  const clean = raw
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .trim()

  const lines = clean
    .split(/\n+/)
    .map((l) => l.trim().replace(/^[-•*]\s*/, ''))
    .filter((l) => l.length > 10)

  return lines.length > 0 ? lines : fallback
}

export default function DestinationTravelGrid({ destination, className = '' }: Props) {
  const hasTravelInfo =
    destination.howtoGetThere ||
    destination.travelTips ||
    destination.bestTimetoVisit ||
    destination.Weather

  if (!hasTravelInfo) return null

  const weatherBullets = parseBulletItems(destination.Weather, [
    'Warm tropical breezes with pleasant year-round temperatures.',
    'Calm sea conditions and clear skies during the regional peak travel season.',
  ])

  const travelTipsBullets = parseBulletItems(destination.travelTips, [
    `Connect with our private destination concierge for early morning excursions across ${destination.title}.`,
    'Reserve boutique heritage accommodations well in advance for peak season travel.',
    'Carry cash for local artisan markets and authentic roadside refreshment stops.',
  ])

  return (
    <section className={`space-y-4 sm:space-y-6 ${className}`}>
      {/* Section Header with Strict Global Typography */}
      <header className='space-y-1 sm:space-y-1.5'>
        <div className='flex items-center gap-2 text-gold-deep'>
          <BespokeLotusIcon className='w-3.5 h-3.5 text-gold' />
          <p className='text-xs font-semibold uppercase tracking-widest text-gold-deep'>
            Essential Advice
          </p>
        </div>
        <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight -ml-[2px]'>
          Travel Information & Practical Essentials
        </h2>
        <p className='text-[15px] sm:text-base text-ink/75 leading-relaxed font-light max-w-2xl'>
          Curated logistics and insider recommendations to help you experience {destination.title} with total ease.
        </p>
      </header>

      {/* Structured Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-1 sm:pt-2'>
        {/* Card 1: Arrival & Transit Logistics (Retained as Standard Narrative Paragraphs) */}
        <div className='p-5 sm:p-7 rounded-2xl bg-paper border border-line hover:border-gold/30 transition-colors duration-300 space-y-3.5 sm:space-y-4'>
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-violet/10 border border-violet/25 flex items-center justify-center text-violet flex-shrink-0'>
              <CarTransitIcon className='w-4 h-4 sm:w-5 sm:h-5' />
            </div>
            <div>
              <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                Transit & Access
              </span>
              <h3 className='font-serif text-lg md:text-xl lg:text-2xl font-medium text-ink leading-snug'>
                Getting There & Around
              </h3>
            </div>
          </div>
          {destination.howtoGetThere ? (
            <div
              className='prose-editorial text-[15px] sm:text-base text-ink/80 leading-relaxed font-light [&>p]:mb-2.5 [&>p:last-child]:mb-0 [&>ul]:space-y-2 [&>ul]:pt-1 [&>ul>li]:text-[15px] [&>ul>li]:sm:text-base [&>ul>li]:text-ink/80'
              dangerouslySetInnerHTML={{ __html: destination.howtoGetThere }}
            />
          ) : (
            <p className='text-[15px] sm:text-base text-ink/80 leading-relaxed font-light'>
              Easily accessible via private chauffeur along scenic expressways or on the historic mountain rail circuit.
            </p>
          )}
        </div>

        {/* Card 2: Climate & Ocean Conditions (Formatted into Scannable Bullet Points) */}
        <div className='p-5 sm:p-7 rounded-2xl bg-paper border border-line hover:border-gold/30 transition-colors duration-300 space-y-3.5 sm:space-y-4'>
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold-deep flex-shrink-0'>
              <SunSeasonIcon className='w-4 h-4 sm:w-5 sm:h-5' />
            </div>
            <div>
              <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                Best Season
              </span>
              <h3 className='font-serif text-lg md:text-xl lg:text-2xl font-medium text-ink leading-snug'>
                Weather & Ocean Conditions
              </h3>
            </div>
          </div>

          <div className='space-y-3 text-[15px] sm:text-base text-ink/80 leading-relaxed font-light'>
            <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gold/10 border border-gold/20 text-gold-deep text-xs font-medium uppercase tracking-wide'>
              <span>Peak Season:</span>
              <span className='font-semibold'>{destination.bestTimetoVisit || 'November to April'}</span>
            </div>

            {/* Weather Bulleted Points */}
            <ul className='space-y-2.5 pt-1'>
              {weatherBullets.map((bullet, idx) => {
                const colonIndex = bullet.indexOf(':')
                const hasLabel = colonIndex > 0 && colonIndex < 40

                return (
                  <li key={idx} className='flex items-start gap-2.5 group'>
                    <span className='w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0 group-hover:scale-125 transition-transform' />
                    <span className='text-[15px] sm:text-base text-ink/80 leading-relaxed font-light'>
                      {hasLabel ? (
                        <>
                          <strong className='font-medium text-ink'>{bullet.slice(0, colonIndex + 1)}</strong>
                          {bullet.slice(colonIndex + 1)}
                        </>
                      ) : (
                        bullet
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Card 3: Local Insider Tips (Formatted into Scannable Bullet Points) */}
        <div className='p-5 sm:p-7 rounded-2xl bg-paper border border-line hover:border-gold/30 transition-colors duration-300 space-y-3.5 sm:space-y-4 md:col-span-2'>
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold-deep flex-shrink-0'>
              <LightbulbTipIcon className='w-4 h-4 sm:w-5 sm:h-5 text-gold-deep' />
            </div>
            <div>
              <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                Local Secrets
              </span>
              <h3 className='font-serif text-lg md:text-xl lg:text-2xl font-medium text-ink leading-snug'>
                Insider Travel Recommendations
              </h3>
            </div>
          </div>

          {/* Insider Tips Bulleted Points */}
          <ul className='space-y-2.5 pt-1'>
            {travelTipsBullets.map((tip, idx) => (
              <li key={idx} className='flex items-start gap-2.5 group'>
                <span className='w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0 group-hover:scale-125 transition-transform' />
                <p className='text-[15px] sm:text-base text-ink/80 leading-relaxed font-light'>
                  {tip}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

