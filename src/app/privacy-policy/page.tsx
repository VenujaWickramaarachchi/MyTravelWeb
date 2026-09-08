import { getPrivacyPolicy } from '@/lib/api/privacy-policy'

export default async function PrivacyPolicyPage() {
  const privacyPolicy = await getPrivacyPolicy()

  if (!privacyPolicy) {
    return (
      <main>
        <section>
          <h1>Privacy Policy</h1>
          <p>Our Privacy Policy is currently unavailable.</p>
        </section>
      </main>
    )
  }

  return (
    <main>
      <section>
        <div>
          <h1>{privacyPolicy.title}</h1>

          <div
            dangerouslySetInnerHTML={{
              __html: privacyPolicy.content,
            }}
          />
        </div>
      </section>
    </main>
  )
}
