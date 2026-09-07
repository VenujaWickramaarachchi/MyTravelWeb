import type { ReactNode } from 'react'

interface EntityGridProps {
  children: ReactNode
}

export default function EntityGrid({ children }: EntityGridProps) {
  return <div>{children}</div>
}
