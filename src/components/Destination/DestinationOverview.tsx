interface Props {
  destination: any
}

export default function DestinationOverview({ destination }: Props) {
  return (
    <section>
      <h2>About {destination.title}</h2>

      <p>{destination.description}</p>

      <div
        dangerouslySetInnerHTML={{
          __html: destination.overview,
        }}
      />
    </section>
  )
}
