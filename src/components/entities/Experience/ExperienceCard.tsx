import Link from 'next/link'
import Image from 'next/image'
import { Experience } from '@/types/experience'
import {
  LocationPinIcon,
  ClockDurationIcon,
  SparkStarIcon,
  ArrowRightIcon,
} from '@/components/Shared/CardIcons'

interface Props {
  experience: Experience
  density?: 'standard' | 'compact'
}

export default function ExperienceCard({
  experience,
  density = 'standard',
}: Props) {
  const isCompact = density === 'compact'

  const cleanDescription =
    experience.shortDescription?.replace(/<[^>]*>?/gm, '').trim() || ''

  const imageUrl =
    experience.heroImage?.url ||
    experience.galleryImages?.[0]?.url ||
    experience.socialImage?.url ||
    (typeof experience.heroImage === 'string' ? experience.heroImage : null)

  const sideLabel = experience.location
    ? `${experience.location.toUpperCase()}`
    : 'CURATED EXPERIENCE'

  return (
    <article className='h-full'>
      <Link
        href={`/experiences/${experience.slug}`}
        className={`group card-editorial h-full aspect-[4/5] min-h-0 w-full select-none text-left ${
          isCompact ? 'card-compact' : ''
        }`}
      >
        {/* Full-Bleed Photography Surface */}
        <div className='absolute inset-0 z-0 overflow-hidden bg-ivory'>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={experience.heroImage?.alt || experience.title}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              loading='lazy'
              className='object-cover object-[center_35%] transition-transform duration-700 ease-luxury group-hover:scale-[1.025]'
            />
          ) : (
            <div className='absolute inset-0 bg-violet-deep flex items-center justify-center text-ivory/40 font-serif'>
              <span>{experience.title}</span>
            </div>
          )}
        </div>

        {/* Multi-Stop Cinematic Scrims */}
        <div className='absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent pointer-events-none z-10' />
        <div className='card-scrim-dark z-10' />

        {/* Mobile Horizontal Brand Strip (< md) */}
        <div className='md:hidden relative z-20 flex items-center justify-between px-4 py-2 bg-violet-deep/85 backdrop-blur-sm border-b border-white/10'>
          <span className='text-[10px] font-semibold tracking-[0.2em] text-white/90 uppercase truncate max-w-[70%]'>
            {sideLabel}
          </span>
          {experience.featuredExperience && (
            <span className='inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.16em] font-bold text-gold'>
              <SparkStarIcon size={11} className='text-gold' />
              Featured
            </span>
          )}
        </div>

        {/* Main Card Body with Asymmetrical Desktop Layout */}
        <div className='relative z-20 flex flex-1 min-h-0 w-full'>
          {/* Left / Primary Content Area */}
          <div
            className={`flex flex-col justify-between flex-1 min-w-0 ${
              isCompact ? 'p-3 sm:p-3.5' : 'p-3.5 sm:p-4'
            }`}
          >
            {/* Top Row: Editorial Nature Badge & Category */}
            <div className='hidden md:flex items-center justify-between gap-2'>
              {experience.featuredExperience ? (
                <span className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-[9px] uppercase tracking-[0.2em] font-semibold text-gold'>
                  <SparkStarIcon size={10} className='text-gold' />
                  Signature Experience
                </span>
              ) : (
                <span className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-fern/30 bg-fern/30 backdrop-blur-xs text-[9px] uppercase tracking-[0.18em] font-semibold text-white'>
                  Encounter
                </span>
              )}
            </div>

            {/* Bottom Content Stack: Glass Info + Typography + Pill CTA */}
            <div
              className={`mt-auto ${
                isCompact
                  ? 'pt-2 space-y-2 sm:space-y-2.5'
                  : 'pt-2.5 space-y-2 sm:space-y-2.5'
              }`}
            >
              {/* Floating Glass Information Panel */}
              {(experience.typicalDuration || experience.location) && (
                <div className='card-glass p-2.5 sm:p-3 space-y-1.5'>
                  {experience.location && (
                    <div className='flex items-center gap-1.5 text-white/90'>
                      <LocationPinIcon className='text-gold shrink-0' size={12} />
                      <span className='text-xs sm:text-[13px] font-medium truncate'>
                        {experience.location}
                      </span>
                    </div>
                  )}

                  {experience.typicalDuration && (
                    <div className='flex items-center gap-1.5 text-white/80 pt-1 border-t border-white/10'>
                      <ClockDurationIcon className='text-lilac shrink-0' size={12} />
                      <span className='text-[11px] sm:text-xs font-light truncate'>
                        {experience.typicalDuration}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Title & Optional Description */}
              <div>
                <h3 className='card-editorial-title line-clamp-2'>
                  {experience.title}
                </h3>

                {!isCompact && cleanDescription && (
                  <p className='mt-1 text-xs text-white/75 leading-relaxed line-clamp-1 font-light'>
                    {cleanDescription}
                  </p>
                )}
              </div>

              {/* Floating Pill CTA */}
              <div className='card-pill-cta w-full'>
                <span>Explore</span>
                <span className='cta-arrow'>
                  <ArrowRightIcon size={13} />
                </span>
              </div>
            </div>
          </div>

          {/* Right Asymmetrical Vertical Side Panel (Desktop & Tablet: ≥ md) */}
          <aside className='hidden md:flex card-side-panel'>
            <span className='card-side-label'>
              {sideLabel}
            </span>
          </aside>
        </div>
      </Link>
    </article>
  )
}
