'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Destination } from '@/types/destination'
import type { MediaImage } from '@/types/media-image'

interface Props {
  destination: Destination
  className?: string
}

export default function DestinationInlinePhotos({ destination, className = '' }: Props) {
  // Collect gallery photos that can be used inline
  const gallery = destination.galleryImages || []

  // If there are at least 5 photos, use photos 4 & 5 (0,1,2,3 were in the top hero)
  // If fewer, use whatever extra photos are available
  let inlinePhotos: MediaImage[] = []
  if (gallery.length >= 5) {
    inlinePhotos = [gallery[3], gallery[4]].filter(Boolean)
  } else if (gallery.length >= 2) {
    inlinePhotos = [gallery[gallery.length - 2], gallery[gallery.length - 1]].filter(Boolean)
  } else if (gallery.length === 1) {
    inlinePhotos = [gallery[0]]
  }

  const [loaded, setLoaded] = useState<Record<number, boolean>>({})

  if (inlinePhotos.length === 0) return null

  return (
    <div className={`my-10 sm:my-14 ${className}`}>
      {inlinePhotos.length === 2 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {inlinePhotos.map((photo, idx) => (
            <div
              key={photo.id || idx}
              className='relative aspect-[4/3] rounded-2xl overflow-hidden bg-ink/10 border border-line group'
            >
              {!loaded[idx] && (
                <div
                  className='absolute inset-0 bg-gradient-to-r from-ink/10 via-ink/20 to-ink/10 animate-[shimmer_1.8s_infinite] pointer-events-none z-10'
                  style={{ backgroundSize: '200% 100%' }}
                />
              )}
              <Image
                src={photo.url}
                alt={photo.alt || `${destination.title} scenery`}
                fill
                quality={88}
                sizes='(min-width: 1024px) 38vw, 100vw'
                onLoad={() => setLoaded((prev) => ({ ...prev, [idx]: true }))}
                className={`object-cover object-center transform-gpu transition-all duration-[2000ms] group-hover:scale-105 ${
                  loaded[idx] ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-[#1F0735]/40 via-transparent to-transparent pointer-events-none' />

              {/* Editorial Caption Tag */}
              {photo.alt && (
                <span className='absolute bottom-3 left-3 z-20 text-[11px] font-sans font-medium text-ivory/90 tracking-wide px-2.5 py-1 rounded bg-[#1F0735]/60 backdrop-blur-xs'>
                  {photo.alt}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className='relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-ink/10 border border-line group'>
          <Image
            src={inlinePhotos[0].url}
            alt={inlinePhotos[0].alt || destination.title}
            fill
            quality={90}
            sizes='(min-width: 1024px) 68vw, 100vw'
            className='object-cover object-center transform-gpu transition-all duration-[2000ms] group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-[#1F0735]/35 via-transparent to-transparent pointer-events-none' />
        </div>
      )}
    </div>
  )
}
