'use client'

import NextLink from 'next/link'
import Image from 'next/image'
import type { Destination } from '@/types/destination'
import type { Tour } from '@/types/tour'
import {
  BespokeLotusIcon,
  SunSeasonIcon,
  LightbulbTipIcon,
  ArrowRightIcon,
} from '@/components/Shared/CardIcons'

interface Props {
  destination: Destination
  tours?: Tour[]
  mode?: 'sticky' | 'tablet-banner'
  className?: string
}

function getLocalTip(destination: Destination): string {
  const titleLower = destination.title.toLowerCase()
  if (titleLower.includes('nuwara eliya')) {
    return 'Nuwara Eliya gets cold in the evenings—pack a light jacket or warm sweater for misty hill country nights.'
  }
  if (titleLower.includes('mirissa') || titleLower.includes('weligama')) {
    return 'Best ocean safari departures leave at 6:30 AM before winds pick up. Coconut Tree Hill is quietest at sunrise.'
  }
  if (titleLower.includes('sigiriya') || titleLower.includes('dambulla')) {
    return 'Climb Sigiriya Rock early in the morning to beat the midday heat, and carry temple-appropriate modest attire.'
  }
  if (titleLower.includes('yala')) {
    return 'Book morning game drives for the highest leopard encounter probability; bring neutral safari clothing.'
  }

  // Dynamic extraction from destination.travelTips if available
  if (destination.travelTips) {
    const plain = destination.travelTips.replace(/<[^>]*>?/gm, '').trim()
    const firstSentence = plain.split('.')[0]
    if (firstSentence && firstSentence.length > 15 && firstSentence.length < 120) {
      return `${firstSentence}.`
    }
  }

  return `Arrange private chauffeured transfers and reserve boutique heritage stays well in advance during peak season.`
}

export default function DestinationSidebar({
  destination,
  tours = [],
  mode = 'sticky',
  className = '',
}: Props) {
  const isBanner = mode === 'tablet-banner'
  const localTip = getLocalTip(destination)

  // Use up to 3 featured itineraries
  const featuredItineraries = tours.slice(0, 3)

  // Fallback itineraries if none are explicitly linked in CMS
  const fallbackItineraries = [
    {
      title: `The Ultimate ${destination.title} Escape`,
      subtitle: '4 Days / 3 Nights • Luxury Wellness & Stays',
      slug: 'signature-sri-lanka',
      imageUrl: destination.heroImage?.url || destination.galleryImages?.[0]?.url,
    },
    {
      title: `Grand Island Circuit featuring ${destination.title}`,
      subtitle: '8 Days / 7 Nights • Private Chauffeured Expedition',
      slug: 'classic-island-circuit',
      imageUrl: destination.galleryImages?.[1]?.url || destination.heroImage?.url,
    },
  ]

  const itemsToRender =
    featuredItineraries.length > 0
      ? featuredItineraries.map((t) => ({
          title: t.title,
          subtitle: `${
            t.durationDays
              ? `${t.durationDays} Days / ${t.durationNights || t.durationDays - 1} Nights`
              : 'Private Journey'
          }${t.priceFrom ? ` — From $${t.priceFrom.toLocaleString()}` : ''}`,
          slug: t.slug,
          imageUrl: t.heroImage?.url || t.galleryImages?.[0]?.url || destination.heroImage?.url,
        }))
      : fallbackItineraries

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
          Plan Your {destination.title} Journey
        </h3>
        <p className='text-[13px] sm:text-sm text-ink/70 font-light leading-relaxed'>
          Private chauffeured itineraries tailored by dedicated Sri Lanka specialists.
        </p>
      </div>

      {/* 1. Curated Itineraries Hub */}
      <div className='py-4 sm:py-5 border-b border-line space-y-3.5'>
        <div className='flex items-center justify-between'>
          <span className='text-xs font-medium uppercase tracking-widest text-ink/50 block'>
            Curated Itineraries
          </span>
          <span className='text-xs font-mono uppercase tracking-wider text-gold-deep'>Handcrafted</span>
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

      {/* 2. Contextual Value-Adds (Local Tips & Climate) */}
      <div className='py-4 sm:py-5 border-b border-line space-y-3'>
        {/* Local Travel Tip */}
        <div className='p-3.5 sm:p-4 rounded-xl bg-ivory/50 border border-line/80 space-y-1.5'>
          <div className='flex items-center gap-2 text-gold-deep'>
            <LightbulbTipIcon className='w-4 h-4 text-gold' />
            <span className='text-xs font-semibold uppercase tracking-widest'>
              Local Travel Tip
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
              Best Season:
            </span>
          </div>
          <span className='font-medium text-ink text-[14px] sm:text-[15px]'>
            {destination.bestTimetoVisit || 'Year-round'}
          </span>
        </div>
      </div>

      {/* 3. Actionable Anchor Navigation & Consultation CTAs */}
      <div className='pt-4 sm:pt-5 space-y-3'>
        {/* Anchor CTA: Smoothly Glides down to Curated Tours without page reload */}
        <a
          href='#featured-tours'
          className='group flex items-center justify-between w-full min-h-[48px] px-5 py-3.5 rounded-xl bg-violet-deep hover:bg-violet text-ivory text-sm sm:text-[15px] font-medium tracking-wide transition-colors duration-300 shadow-sm cursor-pointer'
        >
          <span>View {destination.title} Tours</span>
          <div className='flex items-center text-gold group-hover:translate-x-1.5 transition-transform duration-500 ease-luxury'>
            <ArrowRightIcon className='w-4 h-4' />
          </div>
        </a>

        {/* Tailor-Made Journey Consultation */}
        <NextLink
          href={`/contact?destination=${encodeURIComponent(destination.title)}`}
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
