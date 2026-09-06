interface AEOData {
  aeoQuestion?: string | null
  aeoAnswer?: string | null
}

interface Props {
  data: AEOData
}

export default function AccommodationAEOAnswerSchema({ data }: Props) {
  if (!data.aeoQuestion || !data.aeoAnswer) {
    return null
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Question',
    name: data.aeoQuestion,
    acceptedAnswer: {
      '@type': 'Answer',
      text: data.aeoAnswer,
    },
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}
