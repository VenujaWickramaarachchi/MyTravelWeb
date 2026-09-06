import { FAQ } from '@/types/faq'

interface Props {
  faqs: FAQ[]
}

export default function FAQListSchema({ faqs }: Props) {
  const mainEntity = faqs
    .map((faq) => {
      const question = faq.aeoPrimaryQuestion || faq.question || faq.title
      const answer = faq.aeoDirectAnswer || faq.answer

      if (!question || !answer) {
        return null
      }

      return {
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      }
    })
    .filter(Boolean)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
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
