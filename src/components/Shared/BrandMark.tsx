import type { MediaImage } from '@/types/media-image'

interface BrandMarkProps {
  logo?: MediaImage | null
  light?: boolean
  className?: string
  showTagline?: boolean
}

export default function BrandMark({
  logo,
  light = false,
  className = '',
  showTagline = true,
}: BrandMarkProps) {
  if (logo?.url) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <img
          src={logo.url}
          alt={logo.alt || 'Viora Lanka'}
          className='h-9 w-auto object-contain'
        />
      </div>
    )
  }

  // 5-petal compass flower mark with gold destination center
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        className='w-8 h-8 flex-shrink-0'
        viewBox='0 0 48 48'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
      >
        {/* 5 Petals arranged in radial compass geometry */}
        <path
          d='M24 6C26 12 28 17 24 21C20 17 22 12 24 6Z'
          fill={light ? '#F8F4E9' : '#3B0F6B'}
        />
        <path
          d='M41.1 18.4C37.3 23.3 32.7 25.9 28.5 22.8C29.7 17.5 35 15.2 41.1 18.4Z'
          fill={light ? '#F8F4E9' : '#5B1E96'}
        />
        <path
          d='M34.6 38.4C29 36.6 26.2 32 28.8 28.5C34.1 28.3 37.8 33 34.6 38.4Z'
          fill={light ? '#F8F4E9' : '#3B0F6B'}
        />
        <path
          d='M13.4 38.4C10.2 33 13.9 28.3 19.2 28.5C21.8 32 19 36.6 13.4 38.4Z'
          fill={light ? '#F8F4E9' : '#5B1E96'}
        />
        <path
          d='M6.9 18.4C13 15.2 18.3 17.5 19.5 22.8C15.3 25.9 10.7 23.3 6.9 18.4Z'
          fill={light ? '#F8F4E9' : '#3B0F6B'}
        />
        {/* Precious Gold Destination Center */}
        <circle cx='24' cy='24' r='3.75' fill='#D9A62E' />
        <circle cx='24' cy='24' r='1.25' fill={light ? '#3B0F6B' : '#FFFFFF'} />
      </svg>
      <div className='flex flex-col'>
        <span
          className={`font-serif text-xl tracking-tight leading-none ${
            light ? 'text-ivory' : 'text-ink'
          }`}
        >
          Viora Lanka
        </span>
        {showTagline && (
          <span
            className={`text-[10px] tracking-[0.25em] uppercase font-sans mt-0.5 font-medium ${
              light ? 'text-lilac' : 'text-gold-deep'
            }`}
          >
            Journeys
          </span>
        )}
      </div>
    </div>
  )
}
