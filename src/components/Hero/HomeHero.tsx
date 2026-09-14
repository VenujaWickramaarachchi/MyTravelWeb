'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import HeroContent from './HeroContent'
import HeroCards from './HeroCards'
import type { HeroItem } from '@/types/hero'

interface HomeHeroProps {
  destinations: HeroItem[]
}

export default function HomeHero({ destinations }: HomeHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Graceful Fallback if no destinations with hero images are available
  if (!destinations || destinations.length === 0) {
    return (
      <section className='relative bg-violet-deep text-ivory overflow-hidden pt-36 pb-24 sm:py-36 lg:py-44 border-b border-white/10'>
        {/* Subtle ambient glow */}
        <div
          className='absolute inset-0 opacity-20 pointer-events-none'
          style={{
            backgroundImage:
              'radial-gradient(ellipse at top center, #8B5FBF 0%, transparent 70%)',
          }}
          aria-hidden='true'
        />

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='max-w-3.5xl mx-auto space-y-6'>
            <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs tracking-[0.2em] uppercase font-semibold text-gold'>
              <span>Ayubowan</span>
              <span className='text-ivory/60'>•</span>
              <span>Sri Lanka Tailor-Made</span>
            </div>

            <h1 className='font-serif text-4xl sm:text-5xl lg:text-6.5xl font-normal leading-[1.12] tracking-tight text-ivory'>
              Discover the Soul & Splendour of Sri Lanka
            </h1>

            <p className='text-lg sm:text-xl text-lilac leading-relaxed max-w-2xl mx-auto font-light'>
              Experience an island of ancient kingdoms, misty tea highlands, wild
              leopard sanctuaries, and tranquil tropical shores through thoughtfully
              curated private journeys.
            </p>

            <div className='pt-4 flex flex-col sm:flex-row items-center justify-center gap-4'>
              <Link href='/tours' className='btn-primary'>
                <span>Explore Handcrafted Tours</span>
                <span className='btn-arrow' aria-hidden='true'>→</span>
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

  // Active destination
  const safeIndex = Math.min(Math.max(0, activeIndex), destinations.length - 1)
  const activeDestination = destinations[safeIndex] || destinations[0]

  const heroImageSrc =
    activeDestination.heroImage?.url ||
    activeDestination.galleryImages?.[0]?.url ||
    ''

  const cleanDescription =
    (activeDestination.heroSubTitle || '')
      .replace(/<[^>]*>?/gm, '')
      .trim()

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? destinations.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === destinations.length - 1 ? 0 : prev + 1))
  }

  const handleSelect = (index: number) => {
    setActiveIndex(index)
  }
  const activeHref =
    activeDestination.type === 'destination'
      ? `/destinations/${activeDestination.slug}`
      : activeDestination.type === 'attraction'
        ? `/attractions/${activeDestination.slug}`
        : `/experiences/${activeDestination.slug}`

  return (
    <section className='relative w-full min-h-[720px] min-h-[100svh] max-h-[1050px] overflow-hidden flex flex-col justify-between pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 text-ivory bg-[#0B0B0C] select-none'>
      {/* Full-Bleed Background Image */}
      {heroImageSrc && (
        <div className='absolute inset-0 z-0 overflow-hidden pointer-events-none'>
          <Image
            src={heroImageSrc}
            alt={activeDestination.heroImage?.alt || activeDestination.title}
            fill
            priority
            sizes='100vw'
            className='object-cover object-center transition-none'
          />
        </div>
      )}

      {/* Editorial Vignette & Contrast Overlays — Neutral/Black (No purple wash) */}
      <div
        className='absolute inset-0 z-[1] pointer-events-none'
        style={{
          background:
            'linear-gradient(to right, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.58) 38%, rgba(0, 0, 0, 0.18) 72%, rgba(0, 0, 0, 0.45) 100%)',
        }}
        aria-hidden='true'
      />
      <div
        className='absolute inset-x-0 top-0 h-44 z-[1] pointer-events-none'
        style={{
          background:
            'linear-gradient(to bottom, rgba(0, 0, 0, 0.65) 0%, transparent 100%)',
        }}
        aria-hidden='true'
      />
      <div
        className='absolute inset-x-0 bottom-0 h-36 z-[1] pointer-events-none'
        style={{
          background:
            'linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, transparent 100%)',
        }}
        aria-hidden='true'
      />

      {/* Main Content Area */}
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between gap-10 lg:gap-12'>
        {/* Main Grid: Left Editorial Content + Right Destination Cards */}
        <div className='flex flex-col lg:flex-row lg:items-end justify-between gap-10 sm:gap-12 lg:gap-8 xl:gap-12 flex-1 my-auto w-full'>
          {/* Left Editorial Content */}
          <HeroContent
            title={activeDestination.heroTitle || activeDestination.title}
            description={cleanDescription}
            location={activeDestination.location}
            ctaHref={activeHref}
          />

          {/* Right Destination Cards & Carousel Track */}
          <HeroCards
            destinations={destinations}
            activeIndex={safeIndex}
            onSelect={handleSelect}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>

        {/* Sub-bar: Island Attributes / Editorial Touchpoints */}
        <div className='pt-6 sm:pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left max-w-5xl'>
          <div>
            <span className='block text-gold text-base sm:text-lg font-serif font-medium leading-tight'>
              8 UNESCO
            </span>
            <span className='text-xs text-lilac font-light'>World Heritage Sites</span>
          </div>
          <div>
            <span className='block text-gold text-base sm:text-lg font-serif font-medium leading-tight'>
              1,340 km
            </span>
            <span className='text-xs text-lilac font-light'>Tropical Coastlines</span>
          </div>
          <div>
            <span className='block text-gold text-base sm:text-lg font-serif font-medium leading-tight'>
              26 Parks
            </span>
            <span className='text-xs text-lilac font-light'>National Wildlife Reserves</span>
          </div>
          <div>
            <span className='block text-gold text-base sm:text-lg font-serif font-medium leading-tight'>
              100% Private
            </span>
            <span className='text-xs text-lilac font-light'>Chauffeur-Guided Travel</span>
          </div>
        </div>
      </div>
    </section>
  )
}
