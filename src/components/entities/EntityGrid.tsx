import type { ReactNode } from 'react'

interface EntityGridProps {
  children: ReactNode
  columns?: 2 | 3 | 4
  className?: string
}

export default function EntityGrid({
  children,
  columns = 3,
  className = '',
}: EntityGridProps) {
  const colClass =
    columns === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : columns === 4
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

  return (
    <div className={`grid ${colClass} gap-6 lg:gap-8 ${className}`}>
      {children}
    </div>
  )
}
