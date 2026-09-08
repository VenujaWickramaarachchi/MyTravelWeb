import { getTermsConditions } from '@/lib/api/terms-conditions'

export default async function TermsConditionsPage() {
  const terms = await getTermsConditions()

  if (!terms) {
    return (
      <main>
        <section>
          <h1>Terms & Conditions</h1>

          <p>Our Terms & Conditions are currently unavailable.</p>
        </section>
      </main>
    )
  }

  return (
    <main>
      <section>
        <div>
          <h1>{terms.title}</h1>

          <div
            dangerouslySetInnerHTML={{
              __html: terms.content,
            }}
          />
        </div>
      </section>
    </main>
  )
}
