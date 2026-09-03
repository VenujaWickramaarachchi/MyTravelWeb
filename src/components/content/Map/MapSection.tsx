interface Props {
  latitude?: number
  longitude?: number
  title?: string
  google_maps_embed?: string
}

export default function MapSection({
  latitude,
  longitude,
  google_maps_embed,
  title = 'Location',
}: Props) {
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`

  const mapEmbed = google_maps_embed

  return (
    <section>
      <h2>{title}</h2>

      {mapEmbed ? (
        <div dangerouslySetInnerHTML={{ __html: mapEmbed }} />
      ) : (
        <iframe
          src={mapUrl}
          width='100%'
          height='400'
          style={{
            border: 0,
          }}
          loading='lazy'
          allowFullScreen
        />
      )}
    </section>
  )
}
