interface Props {
  destination: any
}

export default function DestinationHero({ destination }: Props) {
  return (
    <section>
      <h1>{destination.heroTitle}</h1>

      <p>{destination.heroSubtitle}</p>
    </section>
  )
}
