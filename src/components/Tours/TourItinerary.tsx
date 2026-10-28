'use client'

import { useState } from 'react'
import { TourPage } from '@/types/pages/tour-page'
import type { TourItineraryDay } from '@/types/pages/tour-itinerary-day'

interface TourItineraryProps {
  tour: TourPage
  className?: string
}

export default function TourItinerary({
  tour,
  className = '',
}: TourItineraryProps) {
  const itineraryDays: TourItineraryDay[] = tour.relationships.itineraryDays || []

  // Ensure Day 1 is expanded by default
  const defaultDayKey = itineraryDays.length > 0 ? (itineraryDays[0].dayNumber ?? 1) : 1
  const [openDays, setOpenDays] = useState<number[]>([defaultDayKey])

  if (!tour.relationships.itinerary && itineraryDays.length === 0) {
    return null
  }

  const toggleDay = (key: number) => {
    setOpenDays((prev) =>
      prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key],
    )
  }

  const expandAll = () => {
    setOpenDays(itineraryDays.map((d, idx) => d.dayNumber ?? idx + 1))
  }

  const collapseAll = () => {
    setOpenDays([])
  }

  const allOpen = itineraryDays.length > 0 && openDays.length === itineraryDays.length

  return (
    <section className={`space-y-6 pt-2 ${className}`}>
      {/* Section Header */}
      <header className='flex flex-col sm:flex-row sm:items-end justify-between gap-4'>
        <div>
          <span className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep block mb-1.5'>
            Day by Day Journey
          </span>
          <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight -ml-[2px]'>
            Detailed Itinerary
          </h2>
        </div>

        {/* Expand / Collapse All Toggle */}
        {itineraryDays.length > 1 && (
          <button
            type='button'
            onClick={allOpen ? collapseAll : expandAll}
            className='text-xs font-semibold uppercase tracking-wider text-gold-deep hover:text-ink transition-colors pb-1 inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto'
          >
            <span>{allOpen ? 'Collapse All' : 'Expand All'}</span>
            <svg
              className={`w-3.5 h-3.5 transform transition-transform duration-200 ${
                allOpen ? 'rotate-180' : ''
              }`}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
            </svg>
          </button>
        )}
      </header>

      {/* Overview Note (if provided) */}
      {tour.relationships.itinerary?.itineraryOverview && (
        <div className='p-5 sm:p-6 rounded-xl border border-line bg-paper/80 space-y-2'>
          <h3 className='font-serif text-lg sm:text-xl font-medium text-ink'>
            {tour.relationships.itinerary.title}
          </h3>
          <div
            className='prose-editorial text-[15px] sm:text-base leading-relaxed text-ink/75 font-light'
            dangerouslySetInnerHTML={{
              __html: tour.relationships.itinerary.itineraryOverview,
            }}
          />
        </div>
      )}

      {/* Accordion List */}
      <div className='space-y-3.5 pt-1'>
        {itineraryDays.map((day, index) => {
          const dayKey = day.dayNumber ?? index + 1
          const isOpen = openDays.includes(dayKey)
          const hasRoute = Boolean(day.startingLocation || day.endingLocation)
          const hasJourneyStats = Boolean(
            day.drivingTime || day.distance || day.departureTime || day.arrivalTime,
          )

          return (
            <div
              key={day.id || dayKey}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'border-gold/40 bg-paper shadow-2xs'
                  : 'border-line bg-paper hover:border-gold/30'
              }`}
            >
              {/* Accordion Header / Trigger Button */}
              <button
                type='button'
                onClick={() => toggleDay(dayKey)}
                aria-expanded={isOpen}
                className='w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none group transition-colors'
              >
                <div className='flex items-center gap-3.5 sm:gap-4 min-w-0'>
                  {/* Day Badge */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-serif text-xs sm:text-sm font-semibold flex-shrink-0 transition-all ${
                      isOpen
                        ? 'bg-violet-deep text-ivory border-2 border-gold shadow-xs'
                        : 'bg-ivory border border-line text-ink/75 group-hover:border-gold/60 group-hover:text-ink'
                    }`}
                  >
                    {String(dayKey).padStart(2, '0')}
                  </div>

                  {/* Day Title and Route Pill */}
                  <div className='min-w-0 space-y-0.5'>
                    <div className='flex flex-wrap items-center gap-2'>
                      <span className='text-xs font-mono uppercase tracking-widest text-gold-deep'>
                        Day {dayKey}
                      </span>
                      {hasRoute && (
                        <span className='inline-flex items-center text-[11px] font-mono uppercase tracking-wider text-ink/60 bg-ivory border border-line px-2 py-0.5 rounded'>
                          {day.startingLocation}
                          {day.startingLocation && day.endingLocation && ' → '}
                          {day.endingLocation}
                        </span>
                      )}
                    </div>
                    <h3 className='font-serif text-base sm:text-lg font-medium text-ink group-hover:text-violet-deep transition-colors leading-snug truncate'>
                      {day.dayTitle}
                    </h3>
                  </div>
                </div>

                {/* Chevron Toggle Icon */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border transition-all duration-300 ${
                    isOpen
                      ? 'bg-gold/15 border-gold/30 text-gold-deep rotate-180'
                      : 'bg-ivory border-line text-ink/40 group-hover:text-gold-deep group-hover:border-gold/40'
                  }`}
                >
                  <svg
                    className='w-3.5 h-3.5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>
              </button>

              {/* Accordion Content Panel */}
              {isOpen && (
                <div className='border-t border-line/60 p-4 sm:p-6 space-y-4 sm:space-y-5 bg-paper/50'>
                  {/* Journey metadata strip */}
                  {hasJourneyStats && (
                    <div className='flex flex-wrap items-center gap-x-4 gap-y-2 pb-3 text-xs text-ink/70 border-b border-line/60'>
                      {day.drivingTime && (
                        <span className='inline-flex items-center gap-1.5'>
                          <span className='text-gold-deep'>🚗 Travel time:</span>
                          <strong className='font-medium text-ink'>{day.drivingTime}</strong>
                        </span>
                      )}
                      {day.distance && (
                        <span className='inline-flex items-center gap-1.5'>
                          <span className='text-gold-deep'>📏 Distance:</span>
                          <strong className='font-medium text-ink'>
                            {day.distance} {day.distanceUnit || 'km'}
                          </strong>
                        </span>
                      )}
                      {day.departureTime && (
                        <span className='inline-flex items-center gap-1.5'>
                          <span>Departure:</span>
                          <strong className='font-medium text-ink'>{day.departureTime}</strong>
                        </span>
                      )}
                      {day.arrivalTime && (
                        <span className='inline-flex items-center gap-1.5'>
                          <span>Arrival:</span>
                          <strong className='font-medium text-ink'>{day.arrivalTime}</strong>
                        </span>
                      )}
                    </div>
                  )}

                  {/* Day Description Prose */}
                  {day.dayDescription && (
                    <div
                      className='prose-editorial text-[15px] sm:text-base leading-relaxed text-ink/80 font-light'
                      dangerouslySetInnerHTML={{
                        __html: day.dayDescription,
                      }}
                    />
                  )}

                  {/* Inline Thumbnail Images (1 or 2 small relevant images beneath day description) */}
                  {(day.dayImage1?.url || day.dayImage2?.url) && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 max-w-xl'>
                      {day.dayImage1?.url && (
                        <div className='relative aspect-[16/10] rounded-xl overflow-hidden bg-ivory border border-line shadow-2xs group/img'>
                          <img
                            src={day.dayImage1.url}
                            alt={day.dayImage1.alt || day.dayTitle}
                            className='w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out'
                            loading='lazy'
                          />
                        </div>
                      )}
                      {day.dayImage2?.url && (
                        <div className='relative aspect-[16/10] rounded-xl overflow-hidden bg-ivory border border-line shadow-2xs group/img'>
                          <img
                            src={day.dayImage2.url}
                            alt={day.dayImage2.alt || day.dayTitle}
                            className='w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out'
                            loading='lazy'
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Day Highlights / Special Moments */}
                  {day.dayHighlights && (
                    <div className='bg-ivory/80 border-l-2 border-gold p-3.5 sm:p-4 rounded-r-lg space-y-1'>
                      <span className='text-xs uppercase tracking-wider font-semibold text-gold-deep block'>
                        Day Highlights
                      </span>
                      <div
                        className='text-xs sm:text-sm text-ink/85 leading-relaxed font-light'
                        dangerouslySetInnerHTML={{
                          __html: day.dayHighlights,
                        }}
                      />
                    </div>
                  )}

                  {/* Planned Activities */}
                  {day.activities && (
                    <div className='space-y-1 pt-1'>
                      <span className='text-xs uppercase tracking-wider font-semibold text-ink/60 block'>
                        Planned Activities
                      </span>
                      <div
                        className='text-xs sm:text-sm text-ink/80 leading-relaxed font-light'
                        dangerouslySetInnerHTML={{
                          __html: day.activities,
                        }}
                      />
                    </div>
                  )}

                  {/* Stay & Meals Footer Strip */}
                  {(day.meals.length > 0 || day.relationships.accommodation) && (
                    <div className='pt-3 sm:pt-4 border-t border-line/60 flex flex-wrap items-center justify-between gap-3 text-xs text-ink/80'>
                      {day.relationships.accommodation && (
                        <div className='flex items-center gap-1.5'>
                          <span>🏨 Stay:</span>
                          <span className='font-semibold text-violet-deep'>
                            {day.relationships.accommodation.title}
                          </span>
                        </div>
                      )}

                      {day.meals.length > 0 && (
                        <div className='flex items-center gap-1.5'>
                          <span>🍽️ Meals:</span>
                          <span className='font-medium text-ink'>
                            {day.meals.join(' • ')}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
