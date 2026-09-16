'use client'

import Image from 'next/image'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import type { HeroItem } from '@/types/hero'

interface HeroCardsProps {
  destinations: HeroItem[]
  activeIndex: number
  isTransitioning?: boolean
  onSelect: (index: number) => void
  onPrev: () => void
  onNext: () => void
  heroRef?: React.RefObject<HTMLElement | null>
}

interface CardStyle {
  x: number
  scale: number
  rotateY: number
  opacity: number
  zIndex: number
}

interface QueueItem {
  destinationIndex: number
  instanceId: number
}

const CARD_STYLES: CardStyle[] = [
  {
    // Top / front card (Position 0)
    x: 0,
    scale: 1,
    rotateY: -3,
    opacity: 1,
    zIndex: 30,
  },
  {
    // Second card (Position 1)
    x: 145,
    scale: 0.88,
    rotateY: -6,
    opacity: 0.88,
    zIndex: 20,
  },
  {
    // Third card (Position 2 - last card visible on screen)
    x: 280,
    scale: 0.74,
    rotateY: -9,
    opacity: 0.65,
    zIndex: 10,
  },
  {
    // Fourth card (Position 3 - staged off-screen to the right)
    x: 420,
    scale: 0.62,
    rotateY: -12,
    opacity: 0,
    zIndex: 5,
  },
]

const HeroCards = forwardRef<HTMLDivElement, HeroCardsProps>(
  function HeroCards(
    {
      destinations,
      activeIndex,
      isTransitioning = false,
      onSelect,
      onPrev,
      onNext,
    },
    ref,
  ) {
    const cardsRef = useRef<HTMLDivElement>(null)
    const instanceCounter = useRef(0)

    const createQueue = (currentActive: number, total: number): QueueItem[] => {
      if (total <= 1) return []
      return [
        {
          destinationIndex: (currentActive + 1) % total,
          instanceId: ++instanceCounter.current,
        },
        {
          destinationIndex: (currentActive + 2) % total,
          instanceId: ++instanceCounter.current,
        },
        {
          destinationIndex: (currentActive + 3) % total,
          instanceId: ++instanceCounter.current,
        },
        {
          destinationIndex: (currentActive + 4) % total,
          instanceId: ++instanceCounter.current,
        },
      ]
    }

    const [cardQueue, setCardQueue] = useState<QueueItem[]>(() =>
      createQueue(activeIndex, destinations?.length ?? 0),
    )

    const cardQueueRef = useRef<QueueItem[]>(cardQueue)
    cardQueueRef.current = cardQueue

    const localTransitioning = useRef(false)
    const previousActiveIndex = useRef(activeIndex)
    const transitionTimeline = useRef<gsap.core.Timeline | null>(null)
    const enterDirection = useRef<'forward' | 'backward' | null>(null)

    /*
     * ------------------------------------------------------------
     * APPLY CARD STYLES ON QUEUE UPDATE (Desktop Only)
     * ------------------------------------------------------------
     */
    useEffect(() => {
      const container = cardsRef.current
      if (!container) return

      // Don't run GSAP transforms if on mobile/tablet viewport
      if (window.innerWidth < 1024) return

      const cards = Array.from(
        container.querySelectorAll<HTMLElement>('[data-hero-card]'),
      )

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (prefersReducedMotion) {
        cards.forEach((card, index) => {
          const style = CARD_STYLES[index] || CARD_STYLES[CARD_STYLES.length - 1]
          gsap.set(card, {
            x: style.x,
            yPercent: -50,
            scale: style.scale,
            rotateY: 0,
            opacity: style.opacity,
            zIndex: style.zIndex,
          })
        })
        enterDirection.current = null
        return
      }

      if (enterDirection.current === 'backward') {
        // Backward transition: cards animate from their previous slot to new slot
        // cards[0] enters DOWN from above into Position 0
        gsap.fromTo(
          cards[0],
          {
            x: CARD_STYLES[0].x,
            yPercent: -175,
            scale: 1.12,
            rotateY: 0,
            opacity: 0,
            zIndex: CARD_STYLES[0].zIndex,
          },
          {
            x: CARD_STYLES[0].x,
            yPercent: -50,
            scale: CARD_STYLES[0].scale,
            rotateY: CARD_STYLES[0].rotateY,
            opacity: CARD_STYLES[0].opacity,
            duration: 0.75,
            ease: 'power3.out',
            onComplete: () => {
              previousActiveIndex.current = activeIndex
              localTransitioning.current = false
            },
          },
        )

        // cards[1] moves from Position 0 to Position 1
        if (cards[1]) {
          gsap.fromTo(
            cards[1],
            {
              x: CARD_STYLES[0].x,
              yPercent: -50,
              scale: CARD_STYLES[0].scale,
              rotateY: CARD_STYLES[0].rotateY,
              opacity: CARD_STYLES[0].opacity,
              zIndex: CARD_STYLES[1].zIndex,
            },
            {
              x: CARD_STYLES[1].x,
              yPercent: -50,
              scale: CARD_STYLES[1].scale,
              rotateY: CARD_STYLES[1].rotateY,
              opacity: CARD_STYLES[1].opacity,
              duration: 0.75,
              ease: 'power3.out',
            },
          )
        }

        // cards[2] moves from Position 1 to Position 2
        if (cards[2]) {
          gsap.fromTo(
            cards[2],
            {
              x: CARD_STYLES[1].x,
              yPercent: -50,
              scale: CARD_STYLES[1].scale,
              rotateY: CARD_STYLES[1].rotateY,
              opacity: CARD_STYLES[1].opacity,
              zIndex: CARD_STYLES[2].zIndex,
            },
            {
              x: CARD_STYLES[2].x,
              yPercent: -50,
              scale: CARD_STYLES[2].scale,
              rotateY: CARD_STYLES[2].rotateY,
              opacity: CARD_STYLES[2].opacity,
              duration: 0.75,
              ease: 'power3.out',
            },
          )
        }

        // cards[3] moves from Position 2 off-screen to Position 3
        if (cards[3]) {
          gsap.fromTo(
            cards[3],
            {
              x: CARD_STYLES[2].x,
              yPercent: -50,
              scale: CARD_STYLES[2].scale,
              rotateY: CARD_STYLES[2].rotateY,
              opacity: CARD_STYLES[2].opacity,
              zIndex: CARD_STYLES[3].zIndex,
            },
            {
              x: CARD_STYLES[3].x,
              yPercent: -50,
              scale: CARD_STYLES[3].scale,
              rotateY: CARD_STYLES[3].rotateY,
              opacity: CARD_STYLES[3].opacity,
              duration: 0.75,
              ease: 'power3.out',
            },
          )
        }

        enterDirection.current = null
        return
      }

      // Default resting state for all cards
      cards.forEach((card, index) => {
        const style = CARD_STYLES[index] || CARD_STYLES[CARD_STYLES.length - 1]
        gsap.set(card, {
          x: style.x,
          yPercent: -50,
          scale: style.scale,
          rotateY: style.rotateY,
          opacity: style.opacity,
          zIndex: style.zIndex,
        })
      })

      enterDirection.current = null
    }, [cardQueue])

    /*
     * ------------------------------------------------------------
     * QUEUE RESET ON LENGTH CHANGE
     * ------------------------------------------------------------
     */
    useEffect(() => {
      if (!destinations || destinations.length <= 1) return
      const queue = createQueue(activeIndex, destinations.length)
      cardQueueRef.current = queue
      setCardQueue(queue)
      previousActiveIndex.current = activeIndex
    }, [destinations?.length])

    /*
     * ------------------------------------------------------------
     * MAIN CAROUSEL TRANSITION EFFECT (DESKTOP GSAP)
     * ------------------------------------------------------------
     */
    useEffect(() => {
      if (!destinations || destinations.length <= 1) return
      if (previousActiveIndex.current === activeIndex) return

      const container = cardsRef.current
      if (!container) return

      // Do not run on mobile/tablet viewports
      if (window.innerWidth < 1024) {
        const newQueue = createQueue(activeIndex, destinations.length)
        cardQueueRef.current = newQueue
        setCardQueue(newQueue)
        previousActiveIndex.current = activeIndex
        return
      }

      const queue = cardQueueRef.current
      if (queue.length < 3) return

      const previousIndex = previousActiveIndex.current
      const length = destinations.length

      const movedForward =
        (activeIndex - previousIndex + length) % length === 1
      const movedBackward =
        (previousIndex - activeIndex + length) % length === 1

      const cards = Array.from(
        container.querySelectorAll<HTMLElement>('[data-hero-card]'),
      )

      if (cards.length < 3) {
        previousActiveIndex.current = activeIndex
        return
      }

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      transitionTimeline.current?.kill()
      localTransitioning.current = true

      if (prefersReducedMotion) {
        const newQueue = createQueue(activeIndex, length)
        cardQueueRef.current = newQueue
        setCardQueue(newQueue)
        previousActiveIndex.current = activeIndex
        localTransitioning.current = false
        return
      }

      if (movedForward) {
        /*
         * FORWARD TRANSITION:
         * 1. Top card (Card 0) moves straight UP out of the screen, expanding and
         *    dissolving into the hero section (no looping to back).
         * 2. Card 1 moves up to Position 0.
         * 3. Card 2 moves up to Position 1.
         * 4. Last card (Card 3) comes onto the screen from off-screen into Position 2.
         */
        const timeline = gsap.timeline({
          onComplete: () => {
            const currentQ = cardQueueRef.current
            const newQueue: QueueItem[] = [
              currentQ[1],
              currentQ[2],
              currentQ[3] || {
                destinationIndex: (currentQ[2].destinationIndex + 1) % length,
                instanceId: ++instanceCounter.current,
              },
              {
                destinationIndex:
                  ((currentQ[3]?.destinationIndex ?? currentQ[2].destinationIndex) + 1) %
                  length,
                instanceId: ++instanceCounter.current,
              },
            ]
            cardQueueRef.current = newQueue
            setCardQueue(newQueue)
            previousActiveIndex.current = activeIndex
            localTransitioning.current = false
          },
        })

        // Top card moves straight UP out of the screen like expanding into the hero section
        timeline.to(
          cards[0],
          {
            yPercent: -175,
            scale: 1.12,
            rotateY: 0,
            opacity: 0,
            duration: 0.75,
            ease: 'power2.inOut',
          },
          0,
        )

        // Card 1 moves up to Position 0
        if (cards[1]) {
          timeline.to(
            cards[1],
            {
              x: CARD_STYLES[0].x,
              yPercent: -50,
              scale: CARD_STYLES[0].scale,
              rotateY: CARD_STYLES[0].rotateY,
              opacity: CARD_STYLES[0].opacity,
              zIndex: CARD_STYLES[0].zIndex,
              duration: 0.75,
              ease: 'power3.inOut',
            },
            0,
          )
        }

        // Card 2 moves up to Position 1
        if (cards[2]) {
          timeline.to(
            cards[2],
            {
              x: CARD_STYLES[1].x,
              yPercent: -50,
              scale: CARD_STYLES[1].scale,
              rotateY: CARD_STYLES[1].rotateY,
              opacity: CARD_STYLES[1].opacity,
              zIndex: CARD_STYLES[1].zIndex,
              duration: 0.75,
              ease: 'power3.inOut',
            },
            0.03,
          )
        }

        // Last card (Card 3) comes onto the screen from off-screen into Position 2
        if (cards[3]) {
          timeline.to(
            cards[3],
            {
              x: CARD_STYLES[2].x,
              yPercent: -50,
              scale: CARD_STYLES[2].scale,
              rotateY: CARD_STYLES[2].rotateY,
              opacity: CARD_STYLES[2].opacity,
              zIndex: CARD_STYLES[2].zIndex,
              duration: 0.75,
              ease: 'power3.inOut',
            },
            0.06,
          )
        }

        transitionTimeline.current = timeline
      } else if (movedBackward) {
        /*
         * BACKWARD TRANSITION:
         * 1. Incoming card comes down from the hero section into Position 0.
         * 2. Card 0 moves to Position 1.
         * 3. Card 1 moves to Position 2.
         * 4. Card 2 moves off-screen to Position 3.
         */
        enterDirection.current = 'backward'
        const currentQ = cardQueueRef.current
        const incomingCard: QueueItem = {
          destinationIndex:
            (currentQ[0].destinationIndex - 1 + length) % length,
          instanceId: ++instanceCounter.current,
        }
        const newQueue: QueueItem[] = [
          incomingCard,
          currentQ[0],
          currentQ[1],
          currentQ[2],
        ]
        cardQueueRef.current = newQueue
        setCardQueue(newQueue)
      } else {
        /*
         * DIRECT SELECTION / JUMP:
         * Subtle dissolve and cross-fade to selected target
         */
        const newQueue = createQueue(activeIndex, length)

        const timeline = gsap.timeline({
          onComplete: () => {
            previousActiveIndex.current = activeIndex
            localTransitioning.current = false
          },
        })

        timeline.to(cards, {
          opacity: 0,
          scale: 0.9,
          duration: 0.25,
          stagger: 0.03,
          ease: 'power2.inOut',
        })

        timeline.call(() => {
          cardQueueRef.current = newQueue
          setCardQueue(newQueue)
        })

        timeline.to(cards, {
          opacity: (i) => CARD_STYLES[i]?.opacity ?? 1,
          scale: (i) => CARD_STYLES[i]?.scale ?? 1,
          duration: 0.45,
          stagger: 0.04,
          ease: 'power2.out',
        })

        transitionTimeline.current = timeline
      }

      return () => {
        transitionTimeline.current?.kill()
      }
    }, [activeIndex, destinations?.length])

    /*
     * ------------------------------------------------------------
     * SAFETY
     * ------------------------------------------------------------
     */
    if (!destinations || destinations.length <= 1) {
      return null
    }

    const disableActions = isTransitioning || localTransitioning.current

    return (
      <div
        ref={ref}
        className='hidden lg:block relative z-10 w-[490px] xl:w-[525px] shrink-0 ml-auto'
      >
        {/* Cascading Card Composition — Right Edge Flush With max-w-7xl Container */}
        <div
          ref={cardsRef}
          className='relative h-[340px] xl:h-[370px] w-full overflow-visible'
          style={{
            perspective: '1400px',
            perspectiveOrigin: '50% 50%',
          }}
        >
          {cardQueue.map((item, position) => {
            const destination = destinations[item.destinationIndex]
            if (!destination) return null

            const imageUrl =
              destination.heroImage?.url ||
              destination.galleryImages?.[0]?.url ||
              ''

            const isOffscreen = position >= 3
            const style =
              CARD_STYLES[position] || CARD_STYLES[CARD_STYLES.length - 1]

            return (
              <button
                key={`hero-card-${item.instanceId}`}
                type='button'
                data-hero-card
                data-position={position}
                data-destination-id={destination.id}
                onClick={() => {
                  if (disableActions || isOffscreen) return
                  onSelect(item.destinationIndex)
                }}
                disabled={disableActions || isOffscreen}
                tabIndex={isOffscreen ? -1 : 0}
                aria-hidden={isOffscreen ? 'true' : undefined}
                aria-label={`Select ${destination.title}`}
                className={`absolute left-0 top-1/2 -translate-y-1/2 origin-center overflow-hidden rounded-[18px] border border-white/20 bg-black/30 text-left shadow-[0_20px_50px_rgba(0,0,0,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-[box-shadow,border-color] duration-300 hover:shadow-[0_25px_65px_rgba(0,0,0,0.7)] hover:border-gold/40 w-[205px] h-[300px] xl:w-[220px] xl:h-[320px] ${
                  isOffscreen ? 'pointer-events-none' : 'cursor-pointer'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  zIndex: style?.zIndex ?? 10,
                }}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={destination.title}
                    fill
                    sizes='230px'
                    className='object-cover object-[center_35%]'
                  />
                ) : (
                  <div className='absolute inset-0 bg-violet-deep' />
                )}

                {/* Card Editorial Vignette */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent' />

                <div className='absolute inset-x-0 bottom-0 p-4'>
                  <p className='mb-1 text-[9px] uppercase tracking-[0.2em] text-gold font-semibold'>
                    {destination.type}
                  </p>

                  <h3 className='text-sm sm:text-base font-serif font-medium leading-tight text-white line-clamp-1'>
                    {destination.title}
                  </h3>

                  {destination.location && (
                    <p className='mt-1 text-[11px] text-white/70 truncate font-light'>
                      {destination.location}
                    </p>
                  )}
                </div>
              </button>
            )
          })}

          {/* Desktop Navigation Row — Aligned to Right Boundary */}
          <div className='absolute right-0 bottom-0 z-50 flex items-center gap-3.5'>
            <span className='text-xs tracking-[0.18em] text-white/70 font-medium select-none'>
              <span className='text-gold font-serif text-sm font-semibold'>
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className='mx-1.5 opacity-40'>/</span>
              <span>{String(destinations.length).padStart(2, '0')}</span>
            </span>

            <button
              type='button'
              data-hero-control='prev'
              onClick={() => {
                if (disableActions) return
                onPrev()
              }}
              disabled={disableActions}
              aria-label='Previous destination'
              className='flex h-9 w-9 xl:h-10 xl:w-10 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <span aria-hidden='true' className='text-base leading-none'>←</span>
            </button>

            <button
              type='button'
              data-hero-control='next'
              onClick={() => {
                if (disableActions) return
                onNext()
              }}
              disabled={disableActions}
              aria-label='Next destination'
              className='flex h-9 w-9 xl:h-10 xl:w-10 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <span aria-hidden='true' className='text-base leading-none'>→</span>
            </button>
          </div>
        </div>
      </div>
    )
  },
)

HeroCards.displayName = 'HeroCards'

export default HeroCards
