import { FAQ } from '@/types/faq'

interface Props {
  faq: FAQ
}

export default function FAQSchema({ faq }: Props) {
  const question = faq.aeoPrimaryQuestion || faq.question || faq.title
  const answer = faq.aeoDirectAnswer || faq.answer

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      },
    ],
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
