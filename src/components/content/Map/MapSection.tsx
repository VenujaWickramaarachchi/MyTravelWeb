import { BespokeLotusIcon } from '@/components/Shared/CardIcons'

interface Props {
  latitude?: number
  longitude?: number
  title?: string
  google_maps_embed?: string
  locationAddress?: string
  className?: string
  contained?: boolean
}

export default function MapSection({
  latitude,
  longitude,
  google_maps_embed,
  locationAddress,
  title = 'Location & Geography',
  className = '',
  contained = false,
}: Props) {
  const mapUrl = `https://www.google.com/maps?q=${latitude || 7.8731},${longitude || 80.7718}&output=embed`

  const content = (
    <div className='space-y-4 sm:space-y-6'>
      <header className='space-y-1 sm:space-y-1.5'>
        <div className='flex items-center gap-2 text-gold-deep'>
          <BespokeLotusIcon className='w-3.5 h-3.5 text-gold' />
          <p className='text-xs font-semibold uppercase tracking-widest text-gold-deep'>
            Getting There & Orientation
          </p>
        </div>
        <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight -ml-[2px]'>
          {title}
        </h2>
      </header>

      <div className='rounded-2xl overflow-hidden border border-line bg-paper shadow-xs'>
        {google_maps_embed ? (
          <div
            className='w-full aspect-[16/9] min-h-[300px] sm:min-h-[340px] [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0'
            dangerouslySetInnerHTML={{ __html: google_maps_embed }}
          />
        ) : (
          <iframe
            src={mapUrl}
            className='w-full aspect-[16/9] min-h-[300px] sm:min-h-[340px] border-0'
            loading='lazy'
            allowFullScreen
            title={title}
          />
        )}

        {locationAddress && (
          <div className='p-4 sm:p-5 border-t border-line bg-paper flex items-start gap-3 text-[15px] sm:text-base text-ink/80'>
            <span className='text-base text-gold'>📍</span>
            <div>
              <strong className='font-semibold text-ink block text-xs font-mono uppercase tracking-widest mb-0.5'>
                Location Coordinates & Address
              </strong>
              <span className='text-[15px] sm:text-base font-light text-ink/85'>{locationAddress}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  if (contained) {
    return <section className={className}>{content}</section>
  }

  return (
    <section className={`my-12 sm:my-16 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>{content}</div>
    </section>
  )
}

