import type { SiteSettings } from '@/types/site-settings'

interface ContactSocialLinksProps {
  settings: SiteSettings
}

export default function ContactSocialLinks({
  settings,
}: ContactSocialLinksProps) {
  const hasSocials = settings.facebookUrl || settings.instagramUrl || settings.youtubeUrl || settings.tiktokUrl

  if (!hasSocials) return null

  return (
    <div className="bg-white rounded-3xl p-8 border border-ink/8 shadow-xs space-y-4">
      <span className="text-xs uppercase tracking-widest text-amethyst font-semibold block mb-1">
        Connect With Us
      </span>
      <h2 className="text-2xl font-serif font-bold text-ink">
        Follow Viora Lanka
      </h2>
      <p className="text-sm text-ink/70 font-sans">
        Follow our journeys, traveler stories, and island photography across our channels.
      </p>

      <div className="grid grid-cols-2 gap-3 pt-2">
        {settings.facebookUrl && (
          <a
            href={settings.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl border border-ink/10 bg-paper hover:bg-violet-deep hover:text-ivory transition-colors text-sm font-semibold text-ink"
          >
            <span className="w-2 h-2 rounded-full bg-gold" />
            Facebook
          </a>
        )}

        {settings.instagramUrl && (
          <a
            href={settings.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl border border-ink/10 bg-paper hover:bg-violet-deep hover:text-ivory transition-colors text-sm font-semibold text-ink"
          >
            <span className="w-2 h-2 rounded-full bg-gold" />
            Instagram
          </a>
        )}

        {settings.youtubeUrl && (
          <a
            href={settings.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl border border-ink/10 bg-paper hover:bg-violet-deep hover:text-ivory transition-colors text-sm font-semibold text-ink"
          >
            <span className="w-2 h-2 rounded-full bg-gold" />
            YouTube
          </a>
        )}

        {settings.tiktokUrl && (
          <a
            href={settings.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl border border-ink/10 bg-paper hover:bg-violet-deep hover:text-ivory transition-colors text-sm font-semibold text-ink"
          >
            <span className="w-2 h-2 rounded-full bg-gold" />
            TikTok
          </a>
        )}
      </div>
    </div>
  )
}
