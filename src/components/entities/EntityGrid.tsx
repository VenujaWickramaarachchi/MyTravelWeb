'use client'

import React, { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'

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
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const cards = el.children
    if (!cards || cards.length === 0) return

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768

      if (isMobile) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.04,
            ease: 'power1.out',
          },
        )
      } else {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power2.out',
          },
        )
      }
    }, el)

    return () => {
      ctx.revert()
    }
  }, [])

  const colClass =
    columns === 2
      ? 'grid-cols-1 sm:grid-cols-2 max-w-[800px] mx-auto'
      : columns === 4
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-[1400px] mx-auto'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1240px] mx-auto'

  return (
    <div
      ref={gridRef}
      className={`grid ${colClass} gap-6 lg:gap-8 justify-items-center sm:justify-items-stretch ${className}`}
    >
      {React.Children.map(children, (child) => {
        if (!child) return null
        return (
          <div className='w-full max-w-[380px] sm:max-w-none mx-auto h-full'>
            {child}
          </div>
        )
      })}
    </div>
  )
}

