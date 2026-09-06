import { FAQ } from '@/types/faq'

interface Props {
  faq: FAQ
}

export default function FAQAnswer({ faq }: Props) {
  const supportingQuestions = faq.aeoSupportingQuestions
    ? faq.aeoSupportingQuestions
        .split('\n')
        .map((question) => question.trim())
        .filter(Boolean)
    : []

  return (
    <section>
      {faq.featuredAnswer && (
        <div>
          <h2>Quick Answer</h2>

          <p>{faq.featuredAnswer}</p>
        </div>
      )}

      <h2>Answer</h2>

      <div
        dangerouslySetInnerHTML={{
          __html: faq.answer,
        }}
      />

      {supportingQuestions.length > 0 && (
        <div>
          <h2>Related Questions</h2>

          <ul>
            {supportingQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
