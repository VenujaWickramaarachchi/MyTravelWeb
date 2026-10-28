'use client'

import NextLink from 'next/link'
import type { ItineraryPage } from '@/types/pages/itinerary-page'
import {
  BespokeLotusIcon,
  ArrowRightIcon,
  CheckIcon,
  ShieldTrustIcon,
} from '@/components/Shared/CardIcons'

interface Props {
  itinerary: ItineraryPage
  mode?: 'sticky' | 'tablet-banner'
  className?: string
}

export default function ItinerarySidebar({
  itinerary,
  mode = 'sticky',
  className = '',
}: Props) {
  const isBanner = mode === 'tablet-banner'
  const daysCount = itinerary.relationships?.itineraryDays?.length || 0
  const durationText = daysCount > 0 ? `${daysCount} Days / ${Math.max(1, daysCount - 1)} Nights` : 'Curated Route'

  // Check if a connected private tour exists for this itinerary
  const relatedTour = itinerary.relationships?.relatedTours?.[0]
  const formattedPrice = relatedTour?.priceFrom
    ? `${relatedTour.currency || '$'} ${relatedTour.priceFrom.toLocaleString()}`
    : null

  const tourUrl = relatedTour ? `/tours/${relatedTour.slug}` : `/contact?itinerary=${encodeURIComponent(itinerary.title)}`

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
            Route Planner
          </span>
          <BespokeLotusIcon className='w-3.5 h-3.5 text-gold' />
        </div>
        <p className='text-xs font-mono uppercase tracking-widest text-ink/50'>
          {durationText} • Private Circuit
        </p>
        <h3 className='font-serif text-xl sm:text-2xl font-normal text-ink'>
          Experience This Route
        </h3>
      </div>

      {/* Pricing Hub (If connected to tour or estimated guide rate) */}
      <div className='py-4 sm:py-5 border-b border-line space-y-1'>
        <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
          {formattedPrice ? 'Guide Price for Route' : 'Tailor-Made Circuit'}
        </span>
        <div className='flex items-baseline gap-2'>
          {formattedPrice ? (
            <>
              <span className='text-xs font-sans text-ink/60 uppercase tracking-wider'>From</span>
              <span className='text-2xl sm:text-3xl font-serif font-medium text-ink'>
                {formattedPrice}
              </span>
            </>
          ) : (
            <span className='text-xl sm:text-2xl font-serif font-medium text-ink'>
              Bespoke Quotation
            </span>
          )}
        </div>
        <p className='text-xs text-ink/65 font-light leading-relaxed pt-1'>
          {relatedTour?.priceDescription ||
            'Includes private executive vehicle, personal chauffeur-guide, handpicked boutique stays, and curated excursions.'}
        </p>
      </div>

      {/* Actionable CTAs */}
      <div className='py-4 sm:py-5 border-b border-line space-y-3'>
        {/* Primary CTA: View Connected Tour or Book Route */}
        <NextLink
          href={tourUrl}
          className='group flex items-center justify-between w-full min-h-[48px] px-5 py-3.5 rounded-xl bg-violet-deep hover:bg-violet text-ivory text-sm sm:text-[15px] font-medium tracking-wide transition-colors duration-300 shadow-sm cursor-pointer'
        >
          <span>{relatedTour ? 'View This Tour' : 'Book This Itinerary'}</span>
          <div className='flex items-center text-gold group-hover:translate-x-1.5 transition-transform duration-500 ease-luxury'>
            <ArrowRightIcon className='w-4 h-4' />
          </div>
        </NextLink>

        {/* Secondary CTA: Customize Itinerary */}
        <NextLink
          href={`/contact?itinerary=${encodeURIComponent(itinerary.title)}&action=customize`}
          className='group flex items-center justify-between w-full min-h-[44px] px-5 py-3 rounded-xl bg-paper hover:bg-ivory border border-line text-ink hover:text-violet-deep text-xs font-semibold uppercase tracking-widest transition-colors duration-300'
        >
          <span>Customize Route & Pacing</span>
          <ArrowRightIcon className='w-3.5 h-3.5 text-gold-deep group-hover:translate-x-1 transition-transform duration-300' />
        </NextLink>
      </div>

      {/* Journey Guarantees */}
      <div className='pt-4 sm:pt-5 space-y-2.5'>
        <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block mb-3'>
          Every Private Journey Includes:
        </span>

        <ul className='space-y-2.5'>
          <li className='flex items-start gap-2.5 text-xs text-ink/80 leading-relaxed font-light'>
            <span className='w-4 h-4 rounded-full bg-gold/15 text-gold-deep flex items-center justify-center flex-shrink-0 mt-0.5'>
              <CheckIcon className='w-2.5 h-2.5' />
            </span>
            <span>100% Tailor-made with flexible departure dates</span>
          </li>
          <li className='flex items-start gap-2.5 text-xs text-ink/80 leading-relaxed font-light'>
            <span className='w-4 h-4 rounded-full bg-gold/15 text-gold-deep flex items-center justify-center flex-shrink-0 mt-0.5'>
              <CheckIcon className='w-2.5 h-2.5' />
            </span>
            <span>Dedicated private English-speaking chauffeur-guide</span>
          </li>
          <li className='flex items-start gap-2.5 text-xs text-ink/80 leading-relaxed font-light'>
            <span className='w-4 h-4 rounded-full bg-gold/15 text-gold-deep flex items-center justify-center flex-shrink-0 mt-0.5'>
              <CheckIcon className='w-2.5 h-2.5' />
            </span>
            <span>Handpicked boutique retreats & luxury 5-star villas</span>
          </li>
          <li className='flex items-start gap-2.5 text-xs text-ink/80 leading-relaxed font-light'>
            <span className='w-4 h-4 rounded-full bg-gold/15 text-gold-deep flex items-center justify-center flex-shrink-0 mt-0.5'>
              <CheckIcon className='w-2.5 h-2.5' />
            </span>
            <span>24/7 Island Concierge & real-time WhatsApp support</span>
          </li>
        </ul>

        {/* Trust Subtext */}
        <div className='pt-3 text-center border-t border-line/60 mt-4'>
          <p className='text-xs text-ink/60 font-light flex items-center justify-center gap-1.5'>
            <ShieldTrustIcon className='w-3.5 h-3.5 text-gold-deep' />
            <span>Best Rate Guarantee • Zero Obligation Inquiry</span>
          </p>
        </div>
      </div>
    </aside>
  )
}
