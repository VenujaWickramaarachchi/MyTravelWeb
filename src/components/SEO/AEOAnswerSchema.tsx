interface AEOData {
  aeoPrimaryQuestion?: string | null
  aeoDirectAnswer?: string | null
}

interface Props {
  data: AEOData
}

export default function AEOAnswerSchema({ data }: Props) {
  if (!data.aeoPrimaryQuestion || !data.aeoDirectAnswer) {
    return null
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Question',
    name: data.aeoPrimaryQuestion,
    acceptedAnswer: {
      '@type': 'Answer',
      text: data.aeoDirectAnswer,
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
