import { Accommodation } from '@/types/accommodation'

interface Props {
  accommodation: Accommodation
}

export default function AccommodationOverview({ accommodation }: Props) {
  return (
    <section>
      <h2 style={{ color: 'red' }}>About {accommodation.title}</h2>

      <div
        dangerouslySetInnerHTML={{
          __html: accommodation.overview,
        }}
      />

      {accommodation.whyStayHere && (
        <>
          <h2 style={{ color: 'green' }}>Why Stay Here</h2>

          <div
            dangerouslySetInnerHTML={{
              __html: accommodation.whyStayHere,
            }}
          />
        </>
      )}
    </section>
  )
}
