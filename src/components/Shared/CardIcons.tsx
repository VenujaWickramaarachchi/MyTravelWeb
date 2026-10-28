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
