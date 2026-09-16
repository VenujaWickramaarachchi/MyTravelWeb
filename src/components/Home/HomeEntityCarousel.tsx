'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'

interface HomeEntityCarouselProps {
  children: React.ReactNode
  ariaLabel?: string
}

export default function HomeEntityCarousel({
  children,
  ariaLabel = 'Editorial card carousel',
}: HomeEntityCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isHoveredRef = useRef(false)
  const isInteractingRef = useRef(false)
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const posRef = useRef(0)
  const setWidthRef = useRef(0)
  const [isPaused, setIsPaused] = useState(false)

  // Filter valid children
  const rawChildren = React.Children.toArray(children).filter(Boolean)
  const itemCount = rawChildren.length
  const isInfinite = itemCount >= 4

  // Render 3 contiguous sets to guarantee infinite smooth glide
  const renderedItems = isInfinite
    ? [...rawChildren, ...rawChildren, ...rawChildren]
    : rawChildren

  // Calculate the exact pixel width of one complete set of cards including gaps
  const updateSetWidth = useCallback(() => {
    const el = containerRef.current
    if (!el || !isInfinite) return 0

    const items = el.querySelectorAll<HTMLElement>('.carousel-snap-item')
    if (items.length > itemCount && items[itemCount]) {
      const width = items[itemCount].offsetLeft - items[0].offsetLeft
      setWidthRef.current = width
      return width
    }

    // Fallback: estimate from first card + gap
    const firstItem = items[0]
    const gap = window.innerWidth >= 1024 ? 24 : 16
    const estimated = ((firstItem?.offsetWidth || 280) + gap) * itemCount
    setWidthRef.current = estimated
    return estimated
  }, [itemCount, isInfinite])

  // Continuous smooth glide animation loop
  useEffect(() => {
    if (!isInfinite) return
    const el = containerRef.current
    if (!el) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    let animationFrameId: number

    // Calm, luxury editorial drift speed (~32px per second at 60fps)
    const speed = 0.52

    const tick = () => {
      const setWidth = setWidthRef.current

      if (
        setWidth > 0 &&
        !isHoveredRef.current &&
        !isInteractingRef.current &&
        !isPaused
      ) {
        posRef.current += speed

        // When Set 0 fully passes and Item 0 of Set 1 aligns, normalize back to 0
        if (posRef.current >= setWidth) {
          posRef.current -= setWidth
        }

        el.scrollLeft = posRef.current
      }

      animationFrameId = requestAnimationFrame(tick)
    }

    // Initial measurement after mount
    const measureTimer = setTimeout(() => {
      updateSetWidth()
      animationFrameId = requestAnimationFrame(tick)
    }, 60)

    const handleResize = () => {
      updateSetWidth()
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      clearTimeout(measureTimer)
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [isInfinite, isPaused, updateSetWidth])

  // Track manual scrolling to keep posRef in sync
  const handleScroll = () => {
    const el = containerRef.current
    const setWidth = setWidthRef.current
    if (!el || setWidth <= 0) return

    if (isInteractingRef.current || isHoveredRef.current) {
      posRef.current = el.scrollLeft % setWidth
    }
  }

  // Touch handlers for seamless mobile swipe
  const handleTouchStart = () => {
    isInteractingRef.current = true
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current)
    }
  }

  const handleTouchEnd = () => {
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current)
    }
    interactionTimeoutRef.current = setTimeout(() => {
      const el = containerRef.current
      const setWidth = setWidthRef.current
      if (el && setWidth > 0) {
        posRef.current = el.scrollLeft % setWidth
      }
      isInteractingRef.current = false
    }, 1800)
  }

  // Manual arrow navigation
  const handleNav = (direction: 'left' | 'right') => {
    const el = containerRef.current
    const setWidth = setWidthRef.current
    if (!el || setWidth <= 0) return

    isInteractingRef.current = true
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current)
    }

    const item = el.querySelector<HTMLElement>('.carousel-snap-item')
    const cardWidth = item?.offsetWidth || 280
    const gap = window.innerWidth >= 1024 ? 24 : 16
    const delta = (cardWidth + gap) * (direction === 'left' ? -1 : 1)

    // Pre-wrap if moving left near the start
    if (direction === 'left' && el.scrollLeft < Math.abs(delta)) {
      el.scrollLeft += setWidth
    }

    el.scrollBy({
      left: delta,
      behavior: 'smooth',
    })

    interactionTimeoutRef.current = setTimeout(() => {
      posRef.current = el.scrollLeft % setWidth
      isInteractingRef.current = false
    }, 1000)
  }

  return (
    <div
      className='carousel-viewport relative w-full'
      role='region'
      aria-label={ariaLabel}
      onMouseEnter={() => {
        isHoveredRef.current = true
      }}
      onMouseLeave={() => {
        const el = containerRef.current
        const setWidth = setWidthRef.current
        if (el && setWidth > 0) {
          posRef.current = el.scrollLeft % setWidth
        }
        isHoveredRef.current = false
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onFocusCapture={() => {
        isHoveredRef.current = true
      }}
      onBlurCapture={() => {
        const el = containerRef.current
        const setWidth = setWidthRef.current
        if (el && setWidth > 0) {
          posRef.current = el.scrollLeft % setWidth
        }
        isHoveredRef.current = false
      }}
    >
      {/* Desktop Controls: Luxury Navigation Arrows & Pause Indicator */}
      <div className='flex items-center justify-end gap-2.5 mb-4'>
        <button
          type='button'
          onClick={() => setIsPaused((prev) => !prev)}
          aria-label={isPaused ? 'Resume carousel autoplay' : 'Pause carousel autoplay'}
          className='sr-only focus:not-sr-only focus:px-3 focus:py-1 focus:text-xs focus:rounded-full focus:bg-violet-deep focus:text-white'
        >
          {isPaused ? 'Play Autoplay' : 'Pause Autoplay'}
        </button>

        <div className='hidden md:flex items-center gap-2'>
          <button
            type='button'
            onClick={() => handleNav('left')}
            aria-label='Previous slide'
            className='flex h-9 w-9 items-center justify-center rounded-full border border-violet/20 bg-paper/80 backdrop-blur-sm text-violet transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer'
          >
            <span aria-hidden='true' className='text-sm leading-none'>←</span>
          </button>

          <button
            type='button'
            onClick={() => handleNav('right')}
            aria-label='Next slide'
            className='flex h-9 w-9 items-center justify-center rounded-full border border-violet/20 bg-paper/80 backdrop-blur-sm text-violet transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer'
          >
            <span aria-hidden='true' className='text-sm leading-none'>→</span>
          </button>
        </div>
      </div>

      {/* Horizontal Continuous Smooth Track */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className='carousel-smooth-container flex gap-4 sm:gap-5 lg:gap-6 pb-4 pt-1 px-1 -mx-1 select-none focus:outline-none'
        tabIndex={0}
      >
        {renderedItems.map((child, idx) => (
          <div
            key={`carousel-item-${idx}`}
            className='carousel-snap-item w-[clamp(280px,84vw,370px)] sm:w-[clamp(290px,43vw,360px)] lg:w-[clamp(300px,28vw,360px)] xl:w-[clamp(310px,21vw,360px)] aspect-[4/5] h-auto min-h-0 shrink-0'
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
