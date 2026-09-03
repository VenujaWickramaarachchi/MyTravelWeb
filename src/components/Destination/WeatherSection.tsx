import { Destination } from '@/types/destination'

interface Props {
  destination: Destination
}

export default function WeatherSection({ destination }: Props) {
  return (
    <section>
      <h2 style={{ color: 'red' }}>Weather By Season</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: destination.Weather,
        }}
      />
    </section>
  )
}
