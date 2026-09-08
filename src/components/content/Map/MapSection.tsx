interface Props {
  latitude?: number
  longitude?: number
  title?: string
  google_maps_embed?: string
  locationAddress?: string
  className?: string
}

export default function MapSection({
  latitude,
  longitude,
  google_maps_embed,
  locationAddress,
  title = 'Location & Map',
  className = '',
}: Props) {
  const mapUrl = `https://www.google.com/maps?q=${latitude || 7.8731},${longitude || 80.7718}&output=embed`

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-2'>
            Getting There & Orientation
          </p>
          <h2 className='font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-ink'>
            {title}
          </h2>
        </header>

        <div className='rounded overflow-hidden border border-line bg-paper shadow-xs'>
          {google_maps_embed ? (
            <div
              className='w-full aspect-[16/9] sm:aspect-[21/9] min-h-[350px] [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0'
              dangerouslySetInnerHTML={{ __html: google_maps_embed }}
            />
          ) : (
            <iframe
              src={mapUrl}
              className='w-full aspect-[16/9] sm:aspect-[21/9] min-h-[350px] border-0'
              loading='lazy'
              allowFullScreen
              title={title}
            />
          )}

          {locationAddress && (
            <div className='p-4 sm:p-5 border-t border-line bg-ivory/60 flex items-start gap-2.5 text-sm text-ink/80'>
              <span className='text-base'>📍</span>
              <div>
                <strong className='font-semibold text-ink block text-xs uppercase tracking-wider mb-0.5'>
                  Location Address
                </strong>
                <span>{locationAddress}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
