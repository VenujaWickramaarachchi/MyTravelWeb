'use client'

import Link from 'next/link'

interface HeroContentProps {
  title: string
  description: string
  location?: string
  ctaHref: string
}

export default function HeroContent({
  title,
  description,
  location,
  ctaHref,
}: HeroContentProps) {
  return (
    <div className='w-full lg:max-w-md xl:max-w-xl 2xl:max-w-2xl text-left z-10 flex flex-col justify-center'>
      {/* Eyebrow / Destination Tag */}
      <div className='min-h-[32px] sm:min-h-[36px] flex items-center mb-3 sm:mb-5'>
        <div
          data-hero-content
          className='inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold text-gold w-fit'
        >
          <span>Discover Sri Lanka</span>
          {location && (
            <>
              <span className='text-ivory/50'>•</span>
              <span className='text-ivory/90'>{location}</span>
            </>
          )}
        </div>
      </div>

      {/* Main Destination Heading — Stable Minimum Height to Prevent Jumps */}
      <div className='min-h-[4.25rem] sm:min-h-[5.5rem] lg:min-h-[7.25rem] xl:min-h-[8.25rem] flex items-center'>
        <h1
          data-hero-content
          className='font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl xl:text-6xl font-normal leading-[1.1] tracking-tight text-ivory line-clamp-2 sm:line-clamp-3'
        >
          {title}
        </h1>
      </div>

      {/* Editorial Description — Stable Minimum Height */}
      <div className='min-h-[4rem] sm:min-h-[4.75rem] lg:min-h-[5.25rem] mt-3 sm:mt-4 lg:mt-5 flex items-start'>
        {description ? (
          <p
            data-hero-content
            className='text-xs sm:text-sm lg:text-base xl:text-lg text-lilac/90 leading-relaxed font-light max-w-xl line-clamp-3 sm:line-clamp-4'
          >
            {description}
          </p>
        ) : (
          <div className='w-full' />
        )}
      </div>

      {/* Primary CTA Button */}
      <div
        data-hero-content
        className='mt-6 sm:mt-8 lg:mt-9 flex items-center gap-4'
      >
        <Link
          href={ctaHref}
          className='btn-primary text-xs sm:text-sm lg:text-[0.9375rem] py-2.5 px-6 sm:py-3 sm:px-7.5 min-h-[44px] sm:min-h-[48px]'
        >
          <span>Explore Destination</span>
          <span className='btn-arrow text-base' aria-hidden='true'>
            →
          </span>
        </Link>
      </div>
    </div>
  )
}
