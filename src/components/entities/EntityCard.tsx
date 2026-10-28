'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  BespokeLotusIcon,
} from '@/components/Shared/CardIcons'

interface EntityCardProps {
  title: string
  slug?: string
  href: string
  image?: {
    url?: string
    alt?: string
  } | null
  description?: string
  badge?: string
  eyebrow?: string
  density?: 'standard' | 'compact'
  aspectRatio?: '4/3' | '1/1' | '4/5'
}

export default function EntityCard({
  title,
  href,
  image,
  description,
  badge,
  eyebrow,
  density = 'standard',
  aspectRatio = '4/3',
}: EntityCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const isCompact = density === 'compact'

  const cleanDescription =
    description?.replace(/<[^>]*>?/gm, '').trim() || ''

  const sideLabel = eyebrow
    ? `${eyebrow.toUpperCase()}`
    : 'EDITORIAL GUIDE'

  // Streamlined Data: Eyebrow label or generic guide indicator
  const streamlinedData = sideLabel

  // Tailored editorial proportion: Default to 4:3 with 1:1 or 4:5 options
  const aspectClass =
    aspectRatio === '1/1'
      ? 'aspect-square'
      : aspectRatio === '4/5'
      ? 'aspect-[4/5]'
      : 'aspect-[4/3]'

  return (
    <article className='h-full'>
      <Link
        href={href}
        className={`group relative flex flex-col h-full ${aspectClass} min-h-0 w-full overflow-hidden rounded-[14px] border border-white/12 bg-[#2B0E45] select-none text-left transition-[border-color,box-shadow,transform] duration-500 ease-luxury hover:border-[#D9A62E]/40 hover:shadow-[0_22px_48px_-12px_rgba(43,14,69,0.7)] hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-[#D9A62E] ${
          isCompact ? 'card-compact' : ''
        }`}
      >
        {/* Pre-UI Skeleton Loader & Full-Bleed Photography Surface */}
        <div className='absolute inset-0 w-full h-full overflow-hidden bg-[#2B0E45]'>
          {/* Brand Skeleton Loader: Warm deep ink/violet shimmer before image load */}
          <div
            className={`absolute inset-0 w-full h-full bg-[#2B0E45] overflow-hidden transition-opacity duration-1000 ease-luxury ${
              isImageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100 z-5'
            }`}
            aria-hidden='true'
          >
            <div className='absolute inset-0 -translate-x-full animate-[shimmer_2.4s_infinite_cubic-bezier(0.25,1,0.5,1)] bg-gradient-to-r from-transparent via-[#3B0F6B]/45 via-50% to-transparent' />
          </div>

          {image?.url ? (
            <Image
              src={image.url}
              alt={image.alt || title}
              fill
              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 500px'
              quality={90}
              loading='lazy'
              onLoad={() => setIsImageLoaded(true)}
              className={`w-full h-full object-cover object-center transform-gpu transition-all duration-[2000ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.045] ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          ) : (
            <div className='absolute inset-0 w-full h-full bg-[#2B0E45] flex items-center justify-center text-[#F8F4E9]/40 font-serif'>
              <span>{title}</span>
            </div>
          )}
        </div>

        {/* Brand-Tinted Gradients: Deep Ink (#2B0E45) & Deep Violet (#3B0F6B) */}
        {/* Subtle Top Brand Vignette for Floating Badge Legibility */}
        <div className='absolute inset-x-0 top-0 h-18 bg-gradient-to-b from-[#1F0735]/80 via-[#3B0F6B]/30 to-transparent pointer-events-none z-10' />
        {/* Crisp Brand-Tinted Bottom Gradient covering ~56% of the card height */}
        <div className='absolute inset-x-0 bottom-0 h-[56%] bg-gradient-to-t from-[#1F0735]/96 via-[#2B0E45]/70 via-35% via-[#3B0F6B]/35 via-70% to-transparent pointer-events-none z-10' />

        {/* Main Card Content Container */}
        <div
          className={`relative z-20 flex flex-col justify-between flex-1 h-full min-h-0 w-full ${
            isCompact ? 'p-3 sm:p-3.5' : 'p-3.5 sm:p-4 md:p-4.5'
          }`}
        >
          {/* Bespoke Iconography Top Badge in Marigold Gold (#D9A62E) */}
          <div className='flex items-center justify-between w-full'>
            <div className='inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium text-[#D9A62E] drop-shadow-[0_1px_3px_rgba(31,7,53,0.85)]'>
              <BespokeLotusIcon size={12} className='text-[#D9A62E] shrink-0' />
              <span className='mt-[1px]'>
                {badge || eyebrow || 'Curated Guide'}
              </span>
            </div>
          </div>

          {/* Condensed Bottom Content: Streamlined Data + Title with Optical Alignment + Sleek CTA */}
          <div
            className={`mt-auto ${
              isCompact ? 'space-y-1.5' : 'space-y-2'
            }`}
          >
            {/* Streamlined Single Line */}
            {streamlinedData && (
              <div className='text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-sans font-medium text-[#F8F4E9]/80 truncate'>
                {streamlinedData}
              </div>
            )}

            {/* Optical Margin Alignment: -ml-[2px] visually aligns capital serif letters */}
            <div>
              <h3
                className={`font-serif font-normal text-[#F8F4E9] leading-[1.25] tracking-[-0.015em] line-clamp-2 -ml-[2px] transition-colors duration-300 group-hover:text-[#D9A62E] ${
                  isCompact
                    ? 'text-sm sm:text-base'
                    : 'text-base sm:text-lg lg:text-[19px]'
                }`}
              >
                {title}
              </h3>

              {!isCompact && cleanDescription && (
                <p className='mt-1 hidden sm:line-clamp-1 text-xs text-[#F8F4E9]/65 font-sans font-light leading-relaxed'>
                  {cleanDescription}
                </p>
              )}
            </div>

            {/* Elegant CTA with Fluid Glide Animation in Marigold Gold (#D9A62E) */}
            <div className='pt-1.5 sm:pt-2 flex items-center justify-between border-t border-[#F8F4E9]/15 text-[#F8F4E9]/85'>
              <span className='text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium text-[#D9A62E] transition-colors duration-300 group-hover:text-[#F0DCA0]'>
                Discover More
              </span>
              <span className='inline-flex text-[#D9A62E] transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5'>
                <svg
                  width='15'
                  height='15'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.35'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  aria-hidden='true'
                >
                  <path d='M4 12h16' />
                  <path d='m14 6 6 6-6 6' />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
