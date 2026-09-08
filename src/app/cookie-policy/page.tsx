import { getCookiePolicy } from '@/lib/api/cookie-policy'

export default async function CookiePolicyPage() {
  const cookiePolicy = await getCookiePolicy()

  if (!cookiePolicy) {
    return (
      <main>
        <section>
          <h1>Cookie Policy</h1>

          <p>Our Cookie Policy is currently unavailable.</p>
        </section>
      </main>
    )
  }

  return (
    <main>
      <section>
        <div>
          <h1>{cookiePolicy.title}</h1>

          <div
            dangerouslySetInnerHTML={{
              __html: cookiePolicy.content,
            }}
          />
        </div>
      </section>
    </main>
  )
}
