'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import Link from 'next/link'
import HeroContent from './HeroContent'
import HeroCards from './HeroCards'
import type { HeroItem } from '@/types/hero'

interface HomeHeroProps {
  destinations: HeroItem[]
}

interface ImageLayerState {
  src: string
  alt: string
  destinationIndex: number
}

export default function HomeHero({ destinations }: HomeHeroProps) {
  // Navigation index requested by user or autoplay
  const [activeIndex, setActiveIndex] = useState(0)

  // Currently committed visual destination index (controls editorial content)
  const [visualIndex, setVisualIndex] = useState(0)

  // Dual persistent layers: Layer A & Layer B
  const [layerA, setLayerA] = useState<ImageLayerState>(() => {
    const first = destinations?.[0]
    return {
      src: first?.heroImage?.url || first?.galleryImages?.[0]?.url || '',
      alt: first?.heroImage?.alt || first?.title || 'Sri Lanka Luxury Travel',
      destinationIndex: 0,
    }
  })

  const [layerB, setLayerB] = useState<ImageLayerState>({
    src: '',
    alt: '',
    destinationIndex: 0,
  })

  // Which layer is currently visible as the front: 'A' | 'B'
  const activeLayer = useRef<'A' | 'B'>('A')

  const layerARef = useRef<HTMLDivElement>(null)
  const layerBRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  const isTransitioningRef = useRef(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const contentTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const backgroundTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const scaleTweenRef = useRef<gsap.core.Tween | null>(null)

  /*
   * -------------------------------------------------------
   * CINEMATIC HERO IMAGE SCALE EFFECT ON INITIAL MOUNT
   * Starts at scale 1.08 and eases smoothly to 1.0 over 8s
   * -------------------------------------------------------
   */
  useEffect(() => {
    const layerAEl = layerARef.current
    if (!layerAEl) return

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      gsap.set(layerAEl, { scale: 1 })
      return
    }

    scaleTweenRef.current?.kill()
    scaleTweenRef.current = gsap.fromTo(
      layerAEl,
      { scale: 1.08 },
      {
        scale: 1.0,
        duration: 8,
        ease: 'power1.out',
      },
    )

    return () => {
      scaleTweenRef.current?.kill()
      contentTimelineRef.current?.kill()
      backgroundTimelineRef.current?.kill()
    }
  }, [])

  /*
   * -------------------------------------------------------
   * PRELOAD ADJACENT DESTINATION IMAGES
   * Keeps current, next, and previous images warm in browser memory
   * -------------------------------------------------------
   */
  const preloadAdjacentImages = useCallback(
    (index: number) => {
      if (!destinations || destinations.length <= 1) return
      const total = destinations.length
      const nextIndex = (index + 1) % total
      const prevIndex = (index - 1 + total) % total

      const targets = [
        destinations[nextIndex]?.heroImage?.url ||
          destinations[nextIndex]?.galleryImages?.[0]?.url,
        destinations[prevIndex]?.heroImage?.url ||
          destinations[prevIndex]?.galleryImages?.[0]?.url,
      ]

      targets.forEach((src) => {
        if (src && typeof window !== 'undefined') {
          const img = new window.Image()
          img.src = src
        }
      })
    },
    [destinations],
  )

  useEffect(() => {
    preloadAdjacentImages(0)
  }, [preloadAdjacentImages])

  /*
   * -------------------------------------------------------
   * TRANSITION TO AN INDEX
   *
   * Sequence:
   * Request → preload/decode incoming image → lock interaction →
   * crossfade incoming layer over current layer → commit visualIndex →
   * swap layer roles → preload next/previous → unlock interaction
   * -------------------------------------------------------
   */
  const animateToIndex = useCallback(
    async (targetIndex: number) => {
      if (!destinations || destinations.length === 0) return
      if (targetIndex === activeIndex || isTransitioningRef.current) return

      const total = destinations.length
      const safeTarget = ((targetIndex % total) + total) % total
      const targetDestination = destinations[safeTarget]
      if (!targetDestination) return

      const incomingSrc =
        targetDestination.heroImage?.url ||
        targetDestination.galleryImages?.[0]?.url ||
        ''
      const incomingAlt =
        targetDestination.heroImage?.alt ||
        targetDestination.title ||
        'Sri Lanka Destination'

      // Lock interaction immediately to protect against rapid clicks
      isTransitioningRef.current = true
      setIsTransitioning(true)
      setActiveIndex(safeTarget)

      // 1. IMAGE READINESS & PRE-DECODE
      if (incomingSrc && typeof window !== 'undefined') {
        const img = new window.Image()
        img.src = incomingSrc
        try {
          await img.decode()
        } catch {
          // If decode() rejects, verify if the image buffer is already loaded
          if (!img.complete || img.naturalWidth === 0) {
            // Cancel transition gracefully if image cannot be loaded
            isTransitioningRef.current = false
            setIsTransitioning(false)
            return
          }
        }
      }

      // 2. PREPARE INCOMING LAYER
      const incomingIsB = activeLayer.current === 'A'
      const currentLayerEl = incomingIsB
        ? layerARef.current
        : layerBRef.current
      const incomingLayerEl = incomingIsB
        ? layerBRef.current
        : layerARef.current

      if (incomingIsB) {
        setLayerB({
          src: incomingSrc,
          alt: incomingAlt,
          destinationIndex: safeTarget,
        })
      } else {
        setLayerA({
          src: incomingSrc,
          alt: incomingAlt,
          destinationIndex: safeTarget,
        })
      }

      // Check user reduced-motion preference
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // 3. EDITORIAL CONTENT TRANSITION
      const content = contentRef.current
      if (content) {
        const elements = content.querySelectorAll('[data-hero-content]')
        contentTimelineRef.current?.kill()

        const contentTimeline = gsap.timeline()

        if (prefersReducedMotion) {
          contentTimeline.call(() => {
            setVisualIndex(safeTarget)
          })
        } else {
          // Subtle fade + small 8px upward movement
          contentTimeline.to(elements, {
            opacity: 0,
            y: -8,
            duration: 0.25,
            stagger: 0.025,
            ease: 'power2.in',
          })

          contentTimeline.call(() => {
            setVisualIndex(safeTarget)
          })

          // Subtle cascade into position
          contentTimeline.fromTo(
            elements,
            {
              opacity: 0,
              y: 8,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.045,
              ease: 'power2.out',
            },
            '+=0.03',
          )
        }

        contentTimelineRef.current = contentTimeline
      } else {
        setVisualIndex(safeTarget)
      }

      // 4. BACKGROUND CROSSFADE TRANSITION
      if (currentLayerEl && incomingLayerEl) {
        backgroundTimelineRef.current?.kill()

        const bgTimeline = gsap.timeline({
          onComplete: () => {
            // Swap active layer role
            activeLayer.current = incomingIsB ? 'B' : 'A'

            // Hide the outgoing layer
            gsap.set(currentLayerEl, {
              opacity: 0,
              zIndex: 1,
              scale: 1,
            })

            // Keep incoming layer at top
            gsap.set(incomingLayerEl, {
              zIndex: 2,
            })

            // Preload next and previous images
            preloadAdjacentImages(safeTarget)

            // Unlock interaction
            isTransitioningRef.current = false
            setIsTransitioning(false)
          },
        })

        if (prefersReducedMotion) {
          gsap.set(incomingLayerEl, {
            opacity: 1,
            zIndex: 2,
            scale: 1,
          })
          bgTimeline.call(() => {
            activeLayer.current = incomingIsB ? 'B' : 'A'
            gsap.set(currentLayerEl, { opacity: 0, zIndex: 1 })
            isTransitioningRef.current = false
            setIsTransitioning(false)
          })
        } else {
          // Prepare incoming layer at scale 1.08 and 0 opacity
          gsap.set(incomingLayerEl, {
            zIndex: 2,
            opacity: 0,
            scale: 1.08,
            transformOrigin: 'center 35%',
          })

          gsap.set(currentLayerEl, {
            zIndex: 1,
          })

          // Start smooth 8s cinematic scale effect for the incoming hero image
          scaleTweenRef.current?.kill()
          scaleTweenRef.current = gsap.fromTo(
            incomingLayerEl,
            { scale: 1.08 },
            {
              scale: 1.0,
              duration: 8,
              ease: 'power1.out',
            },
          )

          // Crossfade opacity over 1.1s
          bgTimeline.to(
            incomingLayerEl,
            {
              opacity: 1,
              duration: 1.1,
              ease: 'sine.inOut',
            },
            0,
          )
        }

        backgroundTimelineRef.current = bgTimeline
      } else {
        setVisualIndex(safeTarget)
        isTransitioningRef.current = false
        setIsTransitioning(false)
      }
    },
    [activeIndex, destinations, preloadAdjacentImages],
  )

  const handlePrev = useCallback(() => {
    if (isTransitioningRef.current) return
    const total = destinations.length
    const previousIndex = (activeIndex - 1 + total) % total
    animateToIndex(previousIndex)
  }, [activeIndex, animateToIndex, destinations.length])

  const handleNext = useCallback(() => {
    if (isTransitioningRef.current) return
    const total = destinations.length
    const nextIndex = (activeIndex + 1) % total
    animateToIndex(nextIndex)
  }, [activeIndex, animateToIndex, destinations.length])

  const handleSelect = useCallback(
    (index: number) => {
      if (isTransitioningRef.current) return
      animateToIndex(index)
    },
    [animateToIndex],
  )

  /*
   * -------------------------------------------------------
   * AUTOPLAY — 8s interval (paused when transitioning)
   * -------------------------------------------------------
   */
  useEffect(() => {
    if (!destinations || destinations.length <= 1) return
    const autoplay = window.setTimeout(() => {
      if (!isTransitioningRef.current) {
        handleNext()
      }
    }, 8000)

    return () => {
      window.clearTimeout(autoplay)
    }
  }, [activeIndex, destinations, handleNext])

  /*
   * -------------------------------------------------------
   * FALLBACK
   * -------------------------------------------------------
   */
  if (!destinations || destinations.length === 0) {
    return (
      <section className='relative bg-violet-deep text-ivory overflow-hidden pt-32 pb-20 sm:py-36 lg:py-44 border-b border-white/10'>
        <div
          className='absolute inset-0 opacity-20 pointer-events-none'
          style={{
            backgroundImage:
              'radial-gradient(ellipse at top center, #8B5FBF 0%, transparent 70%)',
          }}
          aria-hidden='true'
        />

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='max-w-3xl mx-auto space-y-6'>
            <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs tracking-[0.2em] uppercase font-semibold text-gold'>
              <span>Ayubowan</span>
              <span className='text-ivory/60'>•</span>
              <span>Sri Lanka Tailor-Made</span>
            </div>

            <h1 className='font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] tracking-tight text-ivory'>
              Discover the Soul & Splendour of Sri Lanka
            </h1>

            <p className='text-base sm:text-lg text-lilac leading-relaxed max-w-2xl mx-auto font-light'>
              Experience an island of ancient kingdoms, misty tea highlands,
              wild leopard sanctuaries, and tranquil tropical shores through
              thoughtfully curated private journeys.
            </p>

            <div className='pt-4 flex flex-col sm:flex-row items-center justify-center gap-4'>
              <Link href='/tours' className='btn-primary'>
                <span>Explore Handcrafted Tours</span>
                <span className='btn-arrow' aria-hidden='true'>
                  →
                </span>
              </Link>

              <Link href='/destinations' className='btn-secondary-dark'>
                <span>Discover Destinations</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const safeVisualIndex = Math.min(
    Math.max(0, visualIndex),
    destinations.length - 1,
  )

  const activeDestination =
    destinations[safeVisualIndex] || destinations[0]

  const cleanDescription = (activeDestination.heroSubTitle || '')
    .replace(/<[^>]*>?/gm, '')
    .trim()

  const activeHref =
    activeDestination.type === 'destination'
      ? `/destinations/${activeDestination.slug}`
      : activeDestination.type === 'attraction'
        ? `/attractions/${activeDestination.slug}`
        : `/experiences/${activeDestination.slug}`

  return (
    <section
      ref={heroRef}
      className='relative w-full h-[100svh] min-h-[620px] sm:min-h-[660px] lg:min-h-[720px] max-h-[940px] overflow-hidden flex flex-col pt-20 sm:pt-32 lg:pt-36 pb-6 sm:pb-10 lg:pb-12 text-ivory bg-[#0B0B0C] select-none'
    >
      {/* =========================================================================
          1. FULL-BLEED DUAL-LAYER PERSISTENT BACKGROUND ENGINE
          Zero unmounting, zero image flashing, pre-decoded transitions
          ========================================================================= */}
      <div className='absolute inset-0 z-0 overflow-hidden pointer-events-none'>
        {/* Layer A */}
        <div
          ref={layerARef}
          className='absolute inset-0'
          style={{
            zIndex: 1,
            opacity: 1,
            transform: 'scale(1.08)',
            transformOrigin: 'center 35%',
            willChange: 'transform, opacity',
          }}
        >
          {layerA.src ? (
            <Image
              src={layerA.src}
              alt={layerA.alt}
              fill
              priority
              sizes='100vw'
              className='object-cover object-[center_35%]'
            />
          ) : (
            <div className='absolute inset-0 bg-[#0B0B0C]' />
          )}
        </div>

        {/* Layer B */}
        <div
          ref={layerBRef}
          className='absolute inset-0'
          style={{
            zIndex: 1,
            opacity: 0,
            transform: 'scale(1.08)',
            transformOrigin: 'center 35%',
            willChange: 'transform, opacity',
          }}
        >
          {layerB.src ? (
            <Image
              src={layerB.src}
              alt={layerB.alt}
              fill
              sizes='100vw'
              className='object-cover object-[center_35%]'
            />
          ) : (
            <div className='absolute inset-0 bg-[#0B0B0C]' />
          )}
        </div>
      </div>

      {/* =========================================================================
          2. DUAL ATMOSPHERIC BRAND OVERLAYS — LIGHTER, CINEMATIC PHOTOGRAPHY
          ========================================================================= */}
      {/* Layer 1: Subtle Viora Brand Violet Atmospheric Glow */}
      <div
        className='absolute inset-0 z-[1] pointer-events-none'
        style={{
          background:
            'radial-gradient(ellipse at 25% 45%, rgba(59, 15, 107, 0.16) 0%, rgba(43, 14, 69, 0.08) 55%, transparent 100%)',
        }}
        aria-hidden='true'
      />

      {/* Layer 2: Soft Text Readability Gradient — Lighter, Photography-First */}
      <div
        className='absolute inset-0 z-[1] pointer-events-none'
        style={{
          background:
            'linear-gradient(to right, rgba(11, 11, 12, 0.60) 0%, rgba(11, 11, 12, 0.38) 38%, rgba(11, 11, 12, 0.06) 68%, rgba(11, 11, 12, 0.22) 100%)',
        }}
        aria-hidden='true'
      />

      {/* Soft Mobile-Specific Vertical Readability Gradient */}
      <div
        className='block lg:hidden absolute inset-0 z-[1] pointer-events-none'
        style={{
          background:
            'linear-gradient(to top, rgba(11, 11, 12, 0.85) 0%, rgba(11, 11, 12, 0.42) 50%, rgba(11, 11, 12, 0.18) 100%)',
        }}
        aria-hidden='true'
      />

      {/* Top Navbar Contrast Vignette */}
      <div
        className='absolute inset-x-0 top-0 h-32 z-[1] pointer-events-none'
        style={{
          background:
            'linear-gradient(to bottom, rgba(11, 11, 12, 0.50) 0%, transparent 100%)',
        }}
        aria-hidden='true'
      />

      {/* Bottom Sub-Bar Vignette */}
      <div
        className='absolute inset-x-0 bottom-0 h-28 z-[1] pointer-events-none'
        style={{
          background:
            'linear-gradient(to top, rgba(11, 11, 12, 0.65) 0%, transparent 100%)',
        }}
        aria-hidden='true'
      />

      {/* =========================================================================
          3. MAIN CONTENT AREA — FLUSH ALIGNED WITH WEBSITE MAX-W-7XL CONTAINER
          ========================================================================= */}
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between gap-6 lg:gap-10 min-h-0'>
        {/* Main Grid: Left Content + Right Desktop Cards */}
        <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 lg:gap-10 xl:gap-14 flex-1 min-h-0 w-full'>
          {/* Left Editorial Content */}
          <div
            ref={contentRef}
            className='w-full lg:w-[48%] xl:w-[46%] shrink-0'
          >
            <HeroContent
              title={activeDestination.heroTitle || activeDestination.title}
              description={cleanDescription}
              location={activeDestination.location}
              ctaHref={activeHref}
            />
          </div>

          {/* Right Destination Cards — Desktop Only (Right Edge Flush With max-w-7xl) */}
          <HeroCards
            destinations={destinations}
            activeIndex={activeIndex}
            isTransitioning={isTransitioning}
            onSelect={handleSelect}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>

        {/* Mobile/Tablet Dedicated Navigation Row — Placed in the Bottom Corner */}
        <div className='flex lg:hidden items-center justify-end gap-3.5 self-end pt-2 pb-1 z-20'>
          <span className='text-xs tracking-[0.18em] text-white/70 font-medium select-none'>
            <span className='text-gold font-serif text-sm font-semibold'>
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className='mx-1.5 opacity-40'>/</span>
            <span>{String(destinations.length).padStart(2, '0')}</span>
          </span>

          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={handlePrev}
              disabled={isTransitioning}
              aria-label='Previous destination'
              className='flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/30 backdrop-blur-sm text-white transition-all duration-300 hover:border-gold hover:text-gold active:bg-gold/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <span aria-hidden='true' className='text-base leading-none'>←</span>
            </button>

            <button
              type='button'
              onClick={handleNext}
              disabled={isTransitioning}
              aria-label='Next destination'
              className='flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/30 backdrop-blur-sm text-white transition-all duration-300 hover:border-gold hover:text-gold active:bg-gold/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <span aria-hidden='true' className='text-base leading-none'>→</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            4. SUB-BAR: ISLAND ATTRIBUTES & EDITORIAL TOUCHPOINTS
            ========================================================================= */}
        <div className='pt-3 sm:pt-6 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-6 text-left max-w-5xl shrink-0'>
          <div>
            <span className='block text-gold text-sm sm:text-base lg:text-lg font-serif font-medium leading-tight'>
              8 UNESCO
            </span>
            <span className='text-[11px] sm:text-xs text-lilac font-light'>
              World Heritage Sites
            </span>
          </div>

          <div>
            <span className='block text-gold text-sm sm:text-base lg:text-lg font-serif font-medium leading-tight'>
              1,340 km
            </span>
            <span className='text-[11px] sm:text-xs text-lilac font-light'>
              Tropical Coastlines
            </span>
          </div>

          <div>
            <span className='block text-gold text-sm sm:text-base lg:text-lg font-serif font-medium leading-tight'>
              26 Parks
            </span>
            <span className='text-[11px] sm:text-xs text-lilac font-light'>
              National Wildlife Reserves
            </span>
          </div>

          <div>
            <span className='block text-gold text-sm sm:text-base lg:text-lg font-serif font-medium leading-tight'>
              100% Private
            </span>
            <span className='text-[11px] sm:text-xs text-lilac font-light'>
              Chauffeur-Guided Travel
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}