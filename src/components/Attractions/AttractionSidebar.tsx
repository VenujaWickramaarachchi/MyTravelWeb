'use client'

import NextLink from 'next/link'
import Image from 'next/image'
import type { Attraction } from '@/types/attraction'
import type { Tour } from '@/types/tour'
import {
  BespokeLotusIcon,
  SunSeasonIcon,
  LightbulbTipIcon,
  ArrowRightIcon,
} from '@/components/Shared/CardIcons'

interface Props {
  attraction: Attraction
  tours?: Tour[]
  mode?: 'sticky' | 'tablet-banner'
  className?: string
}

function getLocalAttractionTip(attraction: Attraction): string {
  const titleLower = (attraction.title || '').toLowerCase()
  const locLower = (attraction.location || '').toLowerCase()

  if (titleLower.includes('sigiriya') || locLower.includes('sigiriya')) {
    return 'Start your climb by 7:00 AM to beat the midday sun and crowds. Carry at least 1.5L of water and wear shoes with good traction.'
  }
  if (titleLower.includes('dambulla') || locLower.includes('dambulla')) {
    return 'Cover shoulders and knees before entering the temple caves. Socks are helpful during sunny hours as rock surfaces can get hot.'
  }
  if (titleLower.includes('yala') || titleLower.includes('safari')) {
    return 'Morning game safaris offer the highest probability of leopard sightings. Neutral-colored clothing is recommended.'
  }
  if (titleLower.includes('galle') || locLower.includes('galle')) {
    return 'Walk the historic ramparts around sunset for panoramic Indian Ocean vistas and ocean breezes.'
  }
  if (titleLower.includes('kandy') || titleLower.includes('tooth')) {
    return 'White or light-colored attire covering shoulders and knees is customary when visiting the sacred Temple of the Tooth.'
  }

  return 'Early morning and late afternoon visits provide the best lighting for photography and a more tranquil atmosphere.'
}

export default function AttractionSidebar({
  attraction,
  tours = [],
  mode = 'sticky',
  className = '',
}: Props) {
  const isBanner = mode === 'tablet-banner'
  const localTip = getLocalAttractionTip(attraction)

  // Use up to 3 featured tours
  const featuredTours = tours.slice(0, 3)

  // Fallback curated tours if none are explicitly linked in CMS
  const fallbackTours = [
    {
      title: `The Cultural Triangle & Ancient Kingdoms`,
      subtitle: '6 Days / 5 Nights • Luxury Heritage Circuit',
      slug: 'classic-island-circuit',
      imageUrl:
        attraction.heroImage?.url ||
        attraction.galleryImages?.[0]?.url ||
        '/images/destinations/sigiriya.jpg',
    },
    {
      title: `Signature Sri Lanka Expedition`,
      subtitle: '10 Days / 9 Nights • Private Chauffeured Journey',
      slug: 'signature-sri-lanka',
      imageUrl:
        attraction.galleryImages?.[1]?.url ||
        attraction.heroImage?.url ||
        '/images/destinations/kandy.jpg',
    },
  ]

  const itemsToRender =
    featuredTours.length > 0
      ? featuredTours.map((t) => ({
          title: t.title,
          subtitle: `${
            t.durationDays
              ? `${t.durationDays} Days / ${t.durationNights || t.durationDays - 1} Nights`
              : 'Private Journey'
          }${t.priceFrom ? ` — From $${t.priceFrom.toLocaleString()}` : ''}`,
          slug: t.slug,
          imageUrl:
            t.heroImage?.url ||
            t.galleryImages?.[0]?.url ||
            attraction.heroImage?.url,
        }))
      : fallbackTours

  const primaryTourSlug = itemsToRender[0]?.slug || 'classic-island-circuit'

  return (
    <aside
      className={`rounded-2xl border border-line bg-paper shadow-sm overflow-hidden ${
        isBanner ? 'p-5 sm:p-7 my-6 lg:hidden' : 'p-6 sm:p-7'
      } ${className}`}
    >
      {/* Sidebar Header */}
      <div className='pb-4 sm:pb-5 border-b border-line space-y-1.5'>
        <div className='flex items-center justify-between'>
          <span className='text-xs font-semibold uppercase tracking-widest text-gold-deep'>
            Trip Planner
          </span>
          <BespokeLotusIcon className='w-3.5 h-3.5 text-gold' />
        </div>
        <h3 className='font-serif text-xl sm:text-2xl font-normal text-ink'>
          Tours Visiting This Attraction
        </h3>
        <p className='text-[13px] sm:text-sm text-ink/70 font-light leading-relaxed'>
          Private chauffeured itineraries curated by dedicated Sri Lanka specialists.
        </p>
      </div>

      {/* 1. Curated Tours Hub */}
      <div className='py-4 sm:py-5 border-b border-line space-y-3.5'>
        <div className='flex items-center justify-between'>
          <span className='text-xs font-medium uppercase tracking-widest text-ink/50 block'>
            Featured Itineraries
          </span>
          <span className='text-xs font-mono uppercase tracking-wider text-gold-deep'>
            Handcrafted
          </span>
        </div>

        <div className='space-y-2.5'>
          {itemsToRender.map((item, idx) => (
            <NextLink
              key={idx}
              href={`/tours/${item.slug}`}
              className='group flex items-center gap-3 p-2 rounded-xl hover:bg-ivory/60 border border-transparent hover:border-line transition-all duration-300'
            >
              {/* Thumbnail Image */}
              <div className='relative w-14 h-14 rounded-xl overflow-hidden bg-ink/10 flex-shrink-0 border border-line'>
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes='56px'
                    className='object-cover object-center group-hover:scale-105 transition-transform duration-500'
                  />
                ) : (
                  <div className='w-full h-full bg-violet/10 flex items-center justify-center text-violet text-xs'>
                    Tour
                  </div>
                )}
              </div>

              {/* Text Info */}
              <div className='min-w-0 flex-1 space-y-0.5'>
                <h4 className='font-serif text-sm sm:text-[15px] font-medium text-ink leading-snug line-clamp-2 group-hover:text-violet transition-colors'>
                  {item.title}
                </h4>
                <p className='text-xs font-sans text-ink/60 truncate'>
                  {item.subtitle}
                </p>
              </div>

              <div className='text-line group-hover:text-gold transition-colors flex-shrink-0 pr-1'>
                <ArrowRightIcon className='w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform' />
              </div>
            </NextLink>
          ))}
        </div>
      </div>

      {/* 2. Contextual Value-Adds (Local Tips & Best Time) */}
      <div className='py-4 sm:py-5 border-b border-line space-y-3'>
        {/* Local Travel Tip */}
        <div className='p-3.5 sm:p-4 rounded-xl bg-ivory/50 border border-line/80 space-y-1.5'>
          <div className='flex items-center gap-2 text-gold-deep'>
            <LightbulbTipIcon className='w-4 h-4 text-gold' />
            <span className='text-xs font-semibold uppercase tracking-widest'>
              Visitor Tip
            </span>
          </div>
          <p className='text-[14px] sm:text-[15px] text-ink/80 leading-relaxed font-light'>
            {localTip}
          </p>
        </div>

        {/* Best Time To Go Badge */}
        <div className='flex items-center justify-between px-3.5 sm:px-4 py-2.5 rounded-xl bg-paper border border-line'>
          <div className='flex items-center gap-2 text-ink'>
            <SunSeasonIcon className='w-3.5 h-3.5 text-gold-deep' />
            <span className='text-xs font-mono uppercase tracking-widest text-ink/60'>
              Best Time:
            </span>
          </div>
          <span className='font-medium text-ink text-[14px] sm:text-[15px]'>
            {attraction.bestTime || 'Early Morning'}
          </span>
        </div>
      </div>

      {/* 3. Actionable CTAs & Consultation */}
      <div className='pt-4 sm:pt-5 space-y-3'>
        {/* Primary CTA: Prominent 'View Tour' CTA button to drive bookings */}
        <NextLink
          href={`/tours/${primaryTourSlug}`}
          className='group flex items-center justify-between w-full min-h-[48px] px-5 py-3.5 rounded-xl bg-violet-deep hover:bg-violet text-ivory text-sm sm:text-[15px] font-medium tracking-wide transition-colors duration-300 shadow-sm cursor-pointer'
        >
          <span>View Tour Itinerary</span>
          <div className='flex items-center text-gold group-hover:translate-x-1.5 transition-transform duration-500 ease-luxury'>
            <ArrowRightIcon className='w-4 h-4' />
          </div>
        </NextLink>

        {/* Tailor-Made Journey Consultation */}
        <NextLink
          href={`/contact?attraction=${encodeURIComponent(attraction.title)}`}
          className='group flex items-center justify-between w-full min-h-[44px] px-5 py-3 rounded-xl bg-paper hover:bg-ivory border border-line text-ink hover:text-violet-deep text-xs font-semibold uppercase tracking-widest transition-colors duration-300'
        >
          <span>Tailor-Made Consultation</span>
          <ArrowRightIcon className='w-3.5 h-3.5 text-gold-deep group-hover:translate-x-1 transition-transform duration-300' />
        </NextLink>

        {/* Assurance Subtext */}
        <div className='pt-1.5 sm:pt-2 text-center'>
          <p className='text-xs text-ink/60 font-light flex items-center justify-center gap-1.5'>
            <span className='w-1.5 h-1.5 rounded-full bg-gold inline-block' />
            <span>Dedicated private chauffeur • 100% tailor-made</span>
          </p>
        </div>
      </div>
    </aside>
  )
}
