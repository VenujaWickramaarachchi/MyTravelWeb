import Image from 'next/image'
import type { Attraction } from '@/types/attraction'
import type { MediaImage } from '@/types/media-image'

interface Props {
  attraction: Attraction
}

export default function AttractionHeroGrid({ attraction }: Props) {
  // Collect all available unique photos (Hero image first, then gallery images)
  const rawPhotos: (MediaImage | null | undefined)[] = [
    attraction.heroImage,
    ...(attraction.galleryImages || []),
  ]

  const photos: MediaImage[] = rawPhotos.filter(
    (photo): photo is MediaImage => Boolean(photo && photo.url),
  )

  if (photos.length === 0) {
    return (
      <div className='w-full h-48 sm:h-64 bg-paper border-b border-line flex items-center justify-center text-ink/60 text-sm'>
        No preview imagery available
      </div>
    )
  }

  const primaryPhoto = photos[0]
  const secondPhoto = photos[1] || photos[0]
  const thirdPhoto = photos[2] || photos[1] || photos[0]
  const fourthPhoto = photos[3] || photos[2] || photos[1]

  const hasAtLeastThree = photos.length >= 3
  const hasAtLeastFour = photos.length >= 4

  return (
    <section className='relative w-full max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 pt-0 sm:pt-6'>
      {/* ==============================================================
          MOBILE VIEW (< 768px): Single Powerful Edge-to-Edge Cinematic Hero Image
          Remove all horizontal margins/padding around image container to flush screen
          ============================================================== */}
      <div className='block sm:hidden'>
        <div className='relative w-full aspect-[4/3] rounded-none overflow-hidden bg-ink/5 border-b border-line group'>
          <Image
            src={primaryPhoto.url}
            alt={primaryPhoto.alt || attraction.title}
            fill
            priority
            quality={90}
            sizes='100vw'
            className='object-cover object-center transform-gpu transition-transform duration-[1800ms] ease-out group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-[#1F0735]/40 via-transparent to-transparent pointer-events-none' />

          {/* Photo count pill */}
          <div className='absolute bottom-3 right-3 z-20 px-3 py-1 rounded-full bg-paper/95 backdrop-blur-md border border-line text-[11px] font-sans font-medium text-ink tracking-wider flex items-center gap-1.5 shadow-sm'>
            <svg
              className='w-3.5 h-3.5 text-gold'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={1.75}
              aria-hidden='true'
            >
              <rect x='3' y='3' width='18' height='18' rx='2' />
              <circle cx='8.5' cy='8.5' r='1.5' />
              <polyline points='21 15 16 10 5 21' />
            </svg>
            <span>{photos.length} Photos</span>
          </div>
        </div>
      </div>

      {/* ==============================================================
          TABLET VIEW (768px - 1023px): 2-Image Clean Split
          ============================================================== */}
      <div className='hidden sm:block lg:hidden'>
        <div className='grid grid-cols-12 gap-3 h-[380px] sm:h-[420px] rounded-2xl overflow-hidden border border-line p-1 bg-paper/60'>
          {/* Main Left Image (60%) */}
          <div className='col-span-7 relative h-full rounded-xl overflow-hidden bg-ink/5 group'>
            <Image
              src={primaryPhoto.url}
              alt={primaryPhoto.alt || attraction.title}
              fill
              priority
              quality={90}
              sizes='60vw'
              className='object-cover object-center transform-gpu transition-transform duration-[1800ms] ease-out group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-[#1F0735]/25 via-transparent to-transparent pointer-events-none' />
          </div>

          {/* Secondary Right Image (40%) */}
          <div className='col-span-5 relative h-full rounded-xl overflow-hidden bg-ink/5 group'>
            <Image
              src={secondPhoto.url}
              alt={secondPhoto.alt || attraction.title}
              fill
              quality={90}
              sizes='40vw'
              className='object-cover object-center transform-gpu transition-transform duration-[1800ms] ease-out group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-[#1F0735]/25 via-transparent to-transparent pointer-events-none' />

            {/* Photo count pill */}
            <div className='absolute bottom-3 right-3 z-20 px-3 py-1 rounded-full bg-paper/95 backdrop-blur-md border border-line text-[11px] font-sans font-medium text-ink tracking-wider flex items-center gap-1.5 shadow-sm'>
              <svg
                className='w-3.5 h-3.5 text-gold'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={1.75}
                aria-hidden='true'
              >
                <rect x='3' y='3' width='18' height='18' rx='2' />
                <circle cx='8.5' cy='8.5' r='1.5' />
                <polyline points='21 15 16 10 5 21' />
              </svg>
              <span>{photos.length} Photos</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==============================================================
          DESKTOP VIEW (1024px+): High-End Masonry Mosaic Grid
          (Resolves all dead space with seamless edge-to-edge photography)
          ============================================================== */}
      <div className='hidden lg:block'>
        <div className='grid grid-cols-12 gap-3 h-[490px] xl:h-[530px] rounded-3xl overflow-hidden border border-line p-1.5 bg-paper shadow-2xs'>
          {/* Main Hero Featured Landscape (Left 58%) */}
          <div className='col-span-7 relative h-full rounded-2xl overflow-hidden bg-ink/5 group cursor-pointer'>
            <Image
              src={primaryPhoto.url}
              alt={primaryPhoto.alt || attraction.title}
              fill
              priority
              quality={90}
              sizes='(min-width: 1280px) 780px, 60vw'
              className='object-cover object-center transform-gpu transition-transform duration-[2000ms] ease-out group-hover:scale-[1.035]'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-[#1F0735]/30 via-transparent to-transparent pointer-events-none' />
          </div>

          {/* Right Column (42%) */}
          <div className='col-span-5 h-full flex flex-col gap-3'>
            {hasAtLeastThree ? (
              <>
                {/* Secondary Top Photo */}
                <div className='relative flex-1 rounded-2xl overflow-hidden bg-ink/5 group cursor-pointer'>
                  <Image
                    src={secondPhoto.url}
                    alt={secondPhoto.alt || attraction.title}
                    fill
                    quality={90}
                    sizes='(min-width: 1280px) 540px, 40vw'
                    className='object-cover object-center transform-gpu transition-transform duration-[2000ms] ease-out group-hover:scale-[1.035]'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-[#1F0735]/25 via-transparent to-transparent pointer-events-none' />
                </div>

                {/* Secondary Bottom Row */}
                {hasAtLeastFour ? (
                  <div className='grid grid-cols-2 gap-3 flex-1'>
                    {/* Third Photo */}
                    <div className='relative h-full rounded-2xl overflow-hidden bg-ink/5 group cursor-pointer'>
                      <Image
                        src={thirdPhoto.url}
                        alt={thirdPhoto.alt || attraction.title}
                        fill
                        quality={90}
                        sizes='(min-width: 1280px) 270px, 20vw'
                        className='object-cover object-center transform-gpu transition-transform duration-[2000ms] ease-out group-hover:scale-[1.035]'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-[#1F0735]/25 via-transparent to-transparent pointer-events-none' />
                    </div>

                    {/* Fourth Photo */}
                    <div className='relative h-full rounded-2xl overflow-hidden bg-ink/5 group cursor-pointer'>
                      <Image
                        src={fourthPhoto.url}
                        alt={fourthPhoto.alt || attraction.title}
                        fill
                        quality={90}
                        sizes='(min-width: 1280px) 270px, 20vw'
                        className='object-cover object-center transform-gpu transition-transform duration-[2000ms] ease-out group-hover:scale-[1.035]'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-[#1F0735]/25 via-transparent to-transparent pointer-events-none' />

                      {/* Photo count badge */}
                      <div className='absolute bottom-3 right-3 z-20 px-3 py-1.5 rounded-full bg-paper/95 backdrop-blur-md border border-line text-[11px] font-sans font-semibold text-ink tracking-wider flex items-center gap-1.5 shadow-md hover:bg-white transition-colors'>
                        <svg
                          className='w-3.5 h-3.5 text-gold'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          strokeWidth={2}
                          aria-hidden='true'
                        >
                          <rect x='3' y='3' width='18' height='18' rx='2' />
                          <circle cx='8.5' cy='8.5' r='1.5' />
                          <polyline points='21 15 16 10 5 21' />
                        </svg>
                        <span>{photos.length} Photos</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* If exactly 3 photos total */
                  <div className='relative flex-1 rounded-2xl overflow-hidden bg-ink/5 group cursor-pointer'>
                    <Image
                      src={thirdPhoto.url}
                      alt={thirdPhoto.alt || attraction.title}
                      fill
                      quality={90}
                      sizes='(min-width: 1280px) 540px, 40vw'
                      className='object-cover object-center transform-gpu transition-transform duration-[2000ms] ease-out group-hover:scale-[1.035]'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-[#1F0735]/25 via-transparent to-transparent pointer-events-none' />

                    {/* Photo count badge */}
                    <div className='absolute bottom-3 right-3 z-20 px-3 py-1.5 rounded-full bg-paper/95 backdrop-blur-md border border-line text-[11px] font-sans font-semibold text-ink tracking-wider flex items-center gap-1.5 shadow-md'>
                      <svg
                        className='w-3.5 h-3.5 text-gold'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                        aria-hidden='true'
                      >
                        <rect x='3' y='3' width='18' height='18' rx='2' />
                        <circle cx='8.5' cy='8.5' r='1.5' />
                        <polyline points='21 15 16 10 5 21' />
                      </svg>
                      <span>{photos.length} Photos</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* If only 2 photos total */
              <div className='relative h-full rounded-2xl overflow-hidden bg-ink/5 group cursor-pointer'>
                <Image
                  src={secondPhoto.url}
                  alt={secondPhoto.alt || attraction.title}
                  fill
                  quality={90}
                  sizes='(min-width: 1280px) 540px, 40vw'
                  className='object-cover object-center transform-gpu transition-transform duration-[2000ms] ease-out group-hover:scale-[1.035]'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-[#1F0735]/25 via-transparent to-transparent pointer-events-none' />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

