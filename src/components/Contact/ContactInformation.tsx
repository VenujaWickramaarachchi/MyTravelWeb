import type { SiteSettings } from '@/types/site-settings'

interface ContactInformationProps {
  settings: SiteSettings
}

export default function ContactInformation({
  settings,
}: ContactInformationProps) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-ink/8 shadow-xs space-y-6">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold-deep font-semibold block mb-1">
          Direct Inquiries
        </span>
        <h2 className="text-2xl font-serif font-bold text-ink">
          Get in Touch
        </h2>
      </div>

      <div className="space-y-4">
        {settings.phone && (
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-paper border border-ink/6">
            <div className="w-10 h-10 rounded-xl bg-violet/10 text-violet flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-wider text-ink/50 font-bold mb-0.5">Telephone</h3>
              <a href={`tel:${settings.phone}`} className="text-base font-semibold text-ink hover:text-violet transition-colors">
                {settings.phone}
              </a>
            </div>
          </div>
        )}

        {settings.whatsapp && (
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-paper border border-ink/6">
            <div className="w-10 h-10 rounded-xl bg-fern/10 text-fern flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-wider text-ink/50 font-bold mb-0.5">WhatsApp Chat</h3>
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-ink hover:text-fern transition-colors"
              >
                Chat directly on WhatsApp
              </a>
            </div>
          </div>
        )}

        {settings.email && (
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-paper border border-ink/6">
            <div className="w-10 h-10 rounded-xl bg-amethyst/10 text-amethyst flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-wider text-ink/50 font-bold mb-0.5">Email</h3>
              <a href={`mailto:${settings.email}`} className="text-base font-semibold text-ink hover:text-violet transition-colors">
                {settings.email}
              </a>
            </div>
          </div>
        )}

        {settings.businessAddress && (
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-paper border border-ink/6">
            <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold-deep flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-wider text-ink/50 font-bold mb-0.5">Office Address</h3>
              <p className="text-sm text-ink/80 leading-relaxed font-sans">{settings.businessAddress}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
