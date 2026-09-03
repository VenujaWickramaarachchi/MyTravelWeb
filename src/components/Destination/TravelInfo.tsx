interface Props {
  destination: any
}

export default function TravelInfo({ destination }: Props) {
  return (
    <section>
      <h2>How To Get There</h2>

      <div
        dangerouslySetInnerHTML={{
          __html: destination.acf.how_to_get_there,
        }}
      />
    </section>
  )
}
