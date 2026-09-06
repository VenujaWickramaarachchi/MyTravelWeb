interface AEOData {
  aeoPrimaryQuestion?: string | null
  aeoDirectAnswer?: string | null
  aeoSupportingQuestions?: string | null
  featuredAnswer?: string | null
}

interface Props {
  data: AEOData
}

export default function AEOContent({ data }: Props) {
  const supportingQuestions = data.aeoSupportingQuestions
    ? data.aeoSupportingQuestions
        .split('\n')
        .map((question) => question.trim())
        .filter(Boolean)
    : []

  return (
    <section>
      {data.featuredAnswer && (
        <div>
          <h2>Quick Answer</h2>
          <p>{data.featuredAnswer}</p>
        </div>
      )}

      {data.aeoPrimaryQuestion && data.aeoDirectAnswer && (
        <div>
          <h2>{data.aeoPrimaryQuestion}</h2>
          <p>{data.aeoDirectAnswer}</p>
        </div>
      )}

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
