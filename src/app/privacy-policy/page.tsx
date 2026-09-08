import { getPrivacyPolicy } from '@/lib/api/privacy-policy'
import Breadcrumbs from '@/components/Shared/Breadcrumbs'

export default async function PrivacyPolicyPage() {
  const privacyPolicy = await getPrivacyPolicy()

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
  ]

  if (!privacyPolicy) {
    return (
      <main className="min-h-screen bg-paper flex items-center justify-center py-24">
        <section className="text-center px-6">
          <h1 className="text-3xl font-serif font-bold text-ink mb-4">Privacy Policy</h1>
          <p className="text-ink/70">Our Privacy Policy is currently unavailable.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-paper pb-24">
      <section className="bg-violet-deep text-ivory py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold block mb-3">
            Legal & Privacy
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-ivory tracking-tight">
            {privacyPolicy.title || 'Privacy Policy'}
          </h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 pt-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-ink/8 shadow-xs">
          <div
            className="prose-editorial max-w-none text-ink/90 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: privacyPolicy.content,
            }}
          />
        </div>
      </div>
    </main>
  )
}
