import { getSiteSettings } from '@/lib/wordpress'

import ContactHero from '@/components/Contact/ContactHero'
import ContactInformation from '@/components/Contact/ContactInformation'
import ContactSocialLinks from '@/components/Contact/ContactSocialLinks'
import ContactForm from '@/components/Contact/ContactForm'
import Breadcrumbs from '@/components/Shared/Breadcrumbs'

export default async function ContactPage() {
  const settings = await getSiteSettings()

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <main className="min-h-screen bg-paper pb-24">
      <ContactHero />

      <div className="max-w-7xl mx-auto px-6 pt-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <ContactInformation settings={settings} />
            <ContactSocialLinks settings={settings} />
          </div>
        </div>
      </div>
    </main>
  )
}
