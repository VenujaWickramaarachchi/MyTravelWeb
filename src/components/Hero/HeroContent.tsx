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
      {/* Eyebrow */}
      <div className='inline-flex items-center gap-2 mb-4 sm:mb-6 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs tracking-[0.2em] uppercase font-semibold text-gold w-fit'>
        <span>Discover Sri Lanka</span>
        {location && (
          <>
            <span className='text-ivory/50'>•</span>
            <span className='text-ivory/90'>{location}</span>
          </>
        )}
      </div>

      {/* Main Destination Heading */}
      <h1 className='font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-6.5xl font-normal leading-[1.12] tracking-tight text-ivory'>
        {title}
      </h1>

      {/* Editorial Description */}
      {description && (
        <p className='mt-4 sm:mt-6 text-base sm:text-lg text-lilac/90 leading-relaxed font-light max-w-xl line-clamp-3 sm:line-clamp-4'>
          {description}
        </p>
      )}

      {/* Primary CTA */}
      <div className='mt-8 sm:mt-10 flex items-center gap-4'>
        <Link href={ctaHref} className='btn-primary'>
          <span>Explore Destination</span>
          <span className='btn-arrow' aria-hidden='true'>
            →
          </span>
        </Link>
      </div>
    </div>
  )
}
