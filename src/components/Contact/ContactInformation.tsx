import type { SiteSettings } from '@/types/site-settings'

interface ContactInformationProps {
  settings: SiteSettings
}

export default function ContactInformation({
  settings,
}: ContactInformationProps) {
  return (
    <section>
      <div>
        <h2>Get in Touch</h2>

        {settings.phone ? (
          <div>
            <h3>Phone</h3>
            <a href={`tel:${settings.phone}`}>{settings.phone}</a>
          </div>
        ) : null}

        {settings.whatsapp ? (
          <div>
            <h3>WhatsApp</h3>
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              Chat on WhatsApp
            </a>
          </div>
        ) : null}

        {settings.email ? (
          <div>
            <h3>Email</h3>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
          </div>
        ) : null}

        {settings.businessAddress ? (
          <div>
            <h3>Address</h3>
            <p>{settings.businessAddress}</p>
          </div>
        ) : null}
      </div>
    </section>
  )
}
