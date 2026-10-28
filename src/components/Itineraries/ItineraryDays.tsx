'use client'

import { useState } from 'react'
import type { ItineraryPage } from '@/types/pages/itinerary-page'
import type { TourItineraryDay } from '@/types/pages/tour-itinerary-day'
import { CheckIcon } from '@/components/Shared/CardIcons'

interface Props {
  itinerary: ItineraryPage
  className?: string
}

function parseTextLines(raw: string | undefined | null): string[] {
  if (!raw) return []
  return raw
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .split(/\r?\n/)
    .map((l) => l.trim().replace(/^[-•*]\s*/, ''))
    .filter((l) => l.length > 3)
}

export default function ItineraryDays({
  itinerary,
  className = '',
}: Props) {
  const days: TourItineraryDay[] = itinerary.relationships?.itineraryDays || []

  // Ensure Day 1 is expanded by default
  const defaultDayKey = days.length > 0 ? (days[0].dayNumber ?? 1) : 1
  const [openDays, setOpenDays] = useState<number[]>([defaultDayKey])

  if (!days || days.length === 0) {
    return null
  }

  const toggleDay = (key: number) => {
    setOpenDays((prev) =>
      prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key],
    )
  }

  const expandAll = () => {
    setOpenDays(days.map((d, idx) => d.dayNumber ?? idx + 1))
  }

  const collapseAll = () => {
    setOpenDays([])
  }

  const allOpen = days.length > 0 && openDays.length === days.length

  return (
    <section className={`space-y-6 pt-2 ${className}`}>
      {/* Section Header */}
      <header className='flex flex-col sm:flex-row sm:items-end justify-between gap-4'>
        <div>
          <span className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep block mb-1.5'>
            Timeline & Journey Details
          </span>
          <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight -ml-[2px]'>
            Day-by-Day Itinerary
          </h2>
        </div>

        {/* Expand / Collapse All Toggle */}
        {days.length > 1 && (
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

      {/* Accordion List */}
      <div className='space-y-3.5 pt-1'>
        {days.map((day, index) => {
          const dayKey = day.dayNumber ?? index + 1
          const isOpen = openDays.includes(dayKey)
          const hasRoute = Boolean(day.startingLocation || day.endingLocation)
          const hasJourneyStats = Boolean(
            day.drivingTime || day.distance || day.departureTime || day.arrivalTime,
          )

          const activityBullets = [
            ...parseTextLines(day.activities),
            ...parseTextLines(day.dayHighlights),
          ]

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

                  {/* Included in this day (Clean Bulleted Checklist - No Heavy Blocks) */}
                  {activityBullets.length > 0 && (
                    <div className='space-y-2 pt-1'>
                      <span className='text-xs font-mono uppercase tracking-widest text-ink/50 block'>
                        Included In This Day:
                      </span>
                      <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5'>
                        {activityBullets.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className='flex items-start gap-2.5 text-[14px] sm:text-[15px] text-ink/80 font-light leading-relaxed'
                          >
                            <span className='w-4 h-4 rounded-full bg-gold/15 text-gold-deep flex items-center justify-center flex-shrink-0 mt-0.5'>
                              <CheckIcon className='w-2.5 h-2.5' />
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Places Visited / Included Experiences Pills */}
                  {(day.relationships?.placesVisited?.length > 0 ||
                    day.relationships?.experiences?.length > 0) && (
                    <div className='pt-2 flex flex-wrap gap-2'>
                      {day.relationships?.placesVisited?.map((place) => (
                        <span
                          key={place.id}
                          className='inline-flex items-center text-xs font-medium text-ink bg-ivory border border-line px-2.5 py-1 rounded-md'
                        >
                          📍 {place.title}
                        </span>
                      ))}
                      {day.relationships?.experiences?.map((exp) => (
                        <span
                          key={exp.id}
                          className='inline-flex items-center text-xs font-medium text-fern bg-fern/10 border border-fern/20 px-2.5 py-1 rounded-md'
                        >
                          ✦ {exp.title}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Stay & Meals Footer Strip */}
                  {(day.meals?.length > 0 || day.relationships?.accommodation) && (
                    <div className='pt-3 sm:pt-4 border-t border-line/60 flex flex-wrap items-center justify-between gap-3 text-xs text-ink/80'>
                      {day.relationships?.accommodation && (
                        <div className='flex items-center gap-1.5'>
                          <span>🏨 Stay:</span>
                          <span className='font-semibold text-violet-deep'>
                            {day.relationships.accommodation.title}
                          </span>
                        </div>
                      )}

                      {day.meals?.length > 0 && (
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
