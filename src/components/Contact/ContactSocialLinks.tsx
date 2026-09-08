import type { SiteSettings } from '@/types/site-settings'

interface ContactSocialLinksProps {
  settings: SiteSettings
}

export default function ContactSocialLinks({
  settings,
}: ContactSocialLinksProps) {
  return (
    <section>
      <div>
        <h2>Follow Viora Lanka</h2>

        {settings.facebookUrl ? (
          <a
            href={settings.facebookUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            Facebook
          </a>
        ) : null}

        {settings.instagramUrl ? (
          <a
            href={settings.instagramUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            Instagram
          </a>
        ) : null}

        {settings.youtubeUrl ? (
          <a
            href={settings.youtubeUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            YouTube
          </a>
        ) : null}

        {settings.tiktokUrl ? (
          <a
            href={settings.tiktokUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            TikTok
          </a>
        ) : null}
      </div>
    </section>
  )
}
