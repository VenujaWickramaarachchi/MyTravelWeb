import { getSiteSettings } from '@/lib/wordpress'

import ContactHero from '@/components/Contact/ContactHero'
import ContactInformation from '@/components/Contact/ContactInformation'
import ContactSocialLinks from '@/components/Contact/ContactSocialLinks'
import ContactForm from '@/components/Contact/ContactForm'

export default async function ContactPage() {
  const settings = await getSiteSettings()

  return (
    <main>
      <ContactHero />

      <ContactInformation settings={settings} />

      <ContactForm />

      <ContactSocialLinks settings={settings} />
    </main>
  )
}
