interface Props {
  destination: any
}

export default function WeatherSection({ destination }: Props) {
  return (
    <section>
      <h2>Weather By Season</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: destination.acf.weather_by_season,
        }}
      />
    </section>
  )
}
