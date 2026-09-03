interface Props {
  destination: any
}

export default function DestinationHero({ destination }: Props) {
  return (
    <section>
      <h1>{destination.acf.hero_title}</h1>

      <p>{destination.acf.hero_subtitle}</p>
    </section>
  )
}
