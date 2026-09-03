interface Props {
  destination: any
}

export default function DestinationOverview({ destination }: Props) {
  return (
    <section>
      <h2>About {destination.title.rendered}</h2>

      <p>{destination.acf.short_description}</p>

      <div
        dangerouslySetInnerHTML={{
          __html: destination.acf.destination_overview,
        }}
      />
    </section>
  )
}
