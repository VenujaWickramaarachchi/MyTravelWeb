import { ItineraryDayPage } from '@/types/pages/itinerary-day-page'

interface Props {
  day: ItineraryDayPage
}

export default function ItineraryDayCard({ day }: Props) {
  const hasRoute = day.startingLocation || day.endingLocation
  const hasJourneyStats =
    day.drivingTime || day.distance || day.departureTime || day.arrivalTime

  return (
    <div className='relative pl-8 sm:pl-12 pb-12 last:pb-0'>
      {/* Timeline vertical connector line */}
      <div
        className='absolute left-3.5 sm:left-5 top-8 bottom-0 w-px bg-line'
        aria-hidden='true'
      />

      {/* Timeline Day Number marker */}
      <div
        className='absolute left-0 sm:left-1.5 top-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-violet-deep text-ivory flex items-center justify-center font-serif text-xs sm:text-sm font-semibold border-2 border-gold shadow-xs'
        aria-hidden='true'
      >
        {day.dayNumber ?? '•'}
      </div>

      {/* Day Content Card */}
      <article className='bg-paper rounded border border-line p-6 sm:p-8 space-y-5'>
        {/* Day Header */}
        <div className='space-y-2'>
          <div className='flex flex-wrap items-center gap-2'>
            <span className='text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep'>
              Day {day.dayNumber}
            </span>

            {hasRoute && (
              <span className='inline-flex items-center text-xs font-medium text-ink/75 bg-ivory border border-line px-2.5 py-0.5 rounded'>
                {day.startingLocation}
                {day.startingLocation && day.endingLocation && ' → '}
                {day.endingLocation}
              </span>
            )}
          </div>

          <h3 className='font-serif text-2xl sm:text-3xl font-medium text-ink leading-snug'>
            {day.dayTitle}
          </h3>
        </div>

        {/* Journey metadata strip */}
        {hasJourneyStats && (
          <div className='flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 pb-3 text-xs text-ink/70 border-b border-line/50'>
            {day.drivingTime && (
              <span className='inline-flex items-center gap-1'>
                <span>🚗 Travel time:</span>
                <strong className='font-semibold text-ink'>{day.drivingTime}</strong>
              </span>
            )}
            {day.distance && (
              <span className='inline-flex items-center gap-1'>
                <span>📏 Distance:</span>
                <strong className='font-semibold text-ink'>
                  {day.distance} {day.distanceUnit || 'km'}
                </strong>
              </span>
            )}
            {day.departureTime && (
              <span className='inline-flex items-center gap-1'>
                <span>Departure:</span>
                <strong className='font-semibold text-ink'>{day.departureTime}</strong>
              </span>
            )}
            {day.arrivalTime && (
              <span className='inline-flex items-center gap-1'>
                <span>Arrival:</span>
                <strong className='font-semibold text-ink'>{day.arrivalTime}</strong>
              </span>
            )}
          </div>
        )}

        {/* Day Images if available */}
        {(day.dayImage1?.url || day.dayImage2?.url) && (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1'>
            {day.dayImage1?.url && (
              <div className='relative aspect-[16/10] rounded overflow-hidden bg-ivory border border-line'>
                <img
                  src={day.dayImage1.url}
                  alt={day.dayImage1.alt || day.dayTitle}
                  className='w-full h-full object-cover'
                  loading='lazy'
                />
              </div>
            )}
            {day.dayImage2?.url && (
              <div className='relative aspect-[16/10] rounded overflow-hidden bg-ivory border border-line'>
                <img
                  src={day.dayImage2.url}
                  alt={day.dayImage2.alt || day.dayTitle}
                  className='w-full h-full object-cover'
                  loading='lazy'
                />
              </div>
            )}
          </div>
        )}

        {/* Description */}
        {day.dayDescription && (
          <div
            className='prose-editorial text-sm sm:text-base leading-relaxed text-ink/85'
            dangerouslySetInnerHTML={{
              __html: day.dayDescription,
            }}
          />
        )}

        {/* Highlights */}
        {day.dayHighlights && (
          <div className='bg-ivory/70 border-l-3 border-gold p-4 rounded-r'>
            <h4 className='text-xs uppercase tracking-wider font-semibold text-gold-deep mb-1'>
              Day Highlights
            </h4>
            <div
              className='text-sm text-ink/85 leading-relaxed'
              dangerouslySetInnerHTML={{
                __html: day.dayHighlights,
              }}
            />
          </div>
        )}

        {/* Activities */}
        {day.activities && (
          <div className='space-y-1.5'>
            <h4 className='text-xs uppercase tracking-wider font-semibold text-ink/70'>
              Planned Activities
            </h4>
            <div
              className='text-sm text-ink/80 leading-relaxed'
              dangerouslySetInnerHTML={{
                __html: day.activities,
              }}
            />
          </div>
        )}

        {/* Places Visited & Experiences Badges */}
        {(day.relationships.placesVisited.length > 0 ||
          day.relationships.experiences.length > 0) && (
          <div className='pt-2 space-y-3'>
            {day.relationships.placesVisited.length > 0 && (
              <div>
                <span className='text-xs font-semibold uppercase tracking-wider text-ink/60 block mb-2'>
                  Places Visited
                </span>
                <div className='flex flex-wrap gap-2'>
                  {day.relationships.placesVisited.map((place) => (
                    <span
                      key={place.id}
                      className='inline-flex items-center text-xs font-medium text-ink bg-ivory border border-line px-3 py-1 rounded'
                    >
                      📍 {place.title}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {day.relationships.experiences.length > 0 && (
              <div>
                <span className='text-xs font-semibold uppercase tracking-wider text-ink/60 block mb-2'>
                  Included Experiences
                </span>
                <div className='flex flex-wrap gap-2'>
                  {day.relationships.experiences.map((experience) => (
                    <span
                      key={experience.id}
                      className='inline-flex items-center text-xs font-medium text-fern bg-fern/10 border border-fern/20 px-3 py-1 rounded'
                    >
                      ✦ {experience.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer: Meals & Accommodation */}
        {(day.meals.length > 0 || day.relationships.accommodation) && (
          <div className='pt-4 border-t border-line/60 flex flex-wrap items-center justify-between gap-3 text-xs'>
            {day.relationships.accommodation && (
              <div className='flex items-center gap-1.5 text-ink/80'>
                <span>🏨 Stay:</span>
                <span className='font-semibold text-violet'>
                  {day.relationships.accommodation.title}
                </span>
              </div>
            )}

            {day.meals.length > 0 && (
              <div className='flex items-center gap-1.5 text-ink/80'>
                <span>🍽️ Meals:</span>
                <span className='font-medium text-ink'>
                  {day.meals.join(' • ')}
                </span>
              </div>
            )}
          </div>
        )}
      </article>
    </div>
  )
}
