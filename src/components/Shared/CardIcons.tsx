interface IconProps {
  className?: string
  size?: number
}

export function LocationPinIcon({ className = 'w-4 h-4', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden='true'
    >
      <path d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' />
      <circle cx='12' cy='10' r='3' />
    </svg>
  )
}

export function ClockDurationIcon({ className = 'w-4 h-4', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden='true'
    >
      <circle cx='12' cy='12' r='10' />
      <polyline points='12 6 12 12 16 14' />
    </svg>
  )
}

export function SparkStarIcon({ className = 'w-3.5 h-3.5', size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden='true'
    >
      <path d='M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z' />
    </svg>
  )
}

export function ArrowRightIcon({ className = 'w-4 h-4', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden='true'
    >
      <path d='M5 12h14' />
      <path d='m12 5 7 7-7 7' />
    </svg>
  )
}

export function RouteConnectorIcon({ className = 'w-3.5 h-3.5', size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden='true'
    >
      <circle cx='5' cy='12' r='3' />
      <circle cx='19' cy='12' r='3' />
      <line x1='8' y1='12' x2='16' y2='12' />
    </svg>
  )
}

export function BespokeLotusIcon({ className = 'w-3.5 h-3.5', size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.35'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden='true'
    >
      {/* Central Petal */}
      <path d='M12 3C10.6 6.5 10.2 9.5 12 13.5C13.8 9.5 13.4 6.5 12 3Z' fill='currentColor' fillOpacity='0.25' />
      {/* Left Petal */}
      <path d='M10.5 10.5C7.5 8 5 8.5 3 10.5C5 14 8.5 14.5 11 14.5' />
      {/* Right Petal */}
      <path d='M13.5 10.5C16.5 8 19 8.5 21 10.5C19 14 15.5 14.5 13 14.5' />
      {/* Delicate Lotus Base */}
      <path d='M8.5 17.5C10.5 18.5 13.5 18.5 15.5 17.5' />
      <circle cx='12' cy='19' r='0.75' fill='currentColor' />
    </svg>
  )
}

export function SunSeasonIcon({ className = 'w-4 h-4', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden='true'
    >
      <circle cx='12' cy='12' r='4' />
      <path d='M12 2v2' />
      <path d='M12 20v2' />
      <path d='m4.93 4.93 1.41 1.41' />
      <path d='m17.66 17.66 1.41 1.41' />
      <path d='M2 12h2' />
      <path d='M20 12h2' />
      <path d='m6.34 17.66-1.41 1.41' />
      <path d='m19.07 4.93-1.41 1.41' />
    </svg>
  )
}

export function CompassVibeIcon({ className = 'w-4 h-4', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden='true'
    >
      <circle cx='12' cy='12' r='10' />
      <polygon points='16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76' fill='currentColor' fillOpacity='0.15' />
    </svg>
  )
}

export function CarTransitIcon({ className = 'w-4 h-4', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden='true'
    >
      <path d='M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 3c-.1.3-.1.6-.1.9v4c0 .6.4 1 1 1h2' />
      <circle cx='7' cy='17' r='2' />
      <path d='M9 17h6' />
      <circle cx='17' cy='17' r='2' />
    </svg>
  )
}

export function TrainTransitIcon({ className = 'w-4 h-4', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden='true'
    >
      <rect x='4' y='3' width='16' height='15' rx='3' />
      <path d='M4 11h16' />
      <path d='M12 3v8' />
      <path d='m8 18-3 3' />
      <path d='m16 18 3 3' />
      <circle cx='8' cy='15' r='1' fill='currentColor' />
      <circle cx='16' cy='15' r='1' fill='currentColor' />
    </svg>
  )
}

export function ChevronDownIcon({ className = 'w-4 h-4', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.75'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden='true'
    >
      <path d='m6 9 6 6 6-6' />
    </svg>
  )
}

export function LightbulbTipIcon({ className = 'w-4 h-4', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden='true'
    >
      <path d='M9 18h6' />
      <path d='M10 22h4' />
      <path d='M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5' />
    </svg>
  )
}

export function LuggagePackIcon({ className = 'w-4 h-4', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden='true'
    >
      <rect x='6' y='7' width='12' height='14' rx='2' />
      <path d='M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3' />
      <line x1='6' y1='12' x2='18' y2='12' />
      <circle cx='9' cy='21' r='1' />
      <circle cx='15' cy='21' r='1' />
    </svg>
  )
}

export function CheckIcon({ className = 'w-4 h-4', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden='true'
    >
      <polyline points='20 6 9 17 4 12' />
    </svg>
  )
}

export function ShieldTrustIcon({ className = 'w-4 h-4', size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden='true'
    >
      <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
      <polyline points='9 12 11 14 15 10' />
    </svg>
  )
}
