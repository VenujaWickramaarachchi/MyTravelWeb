import { Destination } from '@/types/destination'

interface Props {
  destination: Destination
}

export default function DestinationOverview({ destination }: Props) {
  return (
    <section className='my-16 sm:my-20'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12'>
        {/* Main Overview */}
        <div className='space-y-4'>
          <header>
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-2'>
              Overview
            </p>
            <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
              About {destination.title}
            </h2>
          </header>

          {destination.description && (
            <p className='text-lg text-ink/80 leading-relaxed font-light italic border-l-2 border-gold pl-4 py-1'>
              {destination.description}
            </p>
          )}

          {destination.overview && (
            <div
              className='prose-editorial pt-2'
              dangerouslySetInnerHTML={{
                __html: destination.overview,
              }}
            />
          )}
        </div>

        {/* Things to Do */}
        {destination.thingsToDo && (
          <div className='pt-8 border-t border-line space-y-4'>
            <header>
              <p className='text-xs font-semibold uppercase tracking-[0.22em] text-fern mb-1'>
                Highlights & Activities
              </p>
              <h2 className='font-serif text-2xl sm:text-3xl font-normal text-ink'>
                Things to Do in {destination.title}
              </h2>
            </header>

            <div
              className='prose-editorial'
              dangerouslySetInnerHTML={{
                __html: destination.thingsToDo,
              }}
            />
          </div>
        )}

        {/* Destination Type if present */}
        {Array.isArray(destination.destinationType) && destination.destinationType.length > 0 && (
          <div className='pt-6 border-t border-line'>
            <h3 className='font-serif text-xl font-medium text-ink mb-2'>
              Destination Style
            </h3>
            <div className='flex flex-wrap gap-2'>
              {destination.destinationType.map((type: any, index: number) => (
                <span key={index} className='px-3 py-1 bg-ivory rounded-full text-xs font-semibold text-ink/80'>
                  {typeof type === 'string' ? type : type?.name || String(type)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
