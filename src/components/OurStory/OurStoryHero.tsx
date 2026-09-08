import type { OurStory } from '@/types/our-story'

interface OurStoryHeroProps {
  data: OurStory
}

export default function OurStoryHero({ data }: OurStoryHeroProps) {
  return (
    <section>
      <div>
        <p>Viora Lanka</p>

        <h1>{data.heroTitle}</h1>

        {data.heroSubtitle ? <p>{data.heroSubtitle}</p> : null}

        {data.heroImage?.url ? (
          <img
            src={data.heroImage.url}
            alt={data.heroImage.alt || data.heroTitle}
          />
        ) : null}
      </div>
    </section>
  )
}
