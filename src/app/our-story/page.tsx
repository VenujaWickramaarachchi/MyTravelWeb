import Link from 'next/link'

import { getOurStory } from '@/lib/api/our-story'

export default async function OurStoryPage() {
  const ourStory = await getOurStory()

  if (!ourStory) {
    return (
      <main>
        <section>
          <h1>Our Story</h1>
          <p>Our Story content is currently unavailable.</p>
        </section>
      </main>
    )
  }

  return (
    <main>
      {/* Hero */}
      <section>
        <div>
          <p>Viora Lanka</p>

          <h1>{ourStory.heroTitle}</h1>

          {ourStory.heroSubtitle ? <p>{ourStory.heroSubtitle}</p> : null}

          {ourStory.heroImage?.url ? (
            <img
              src={ourStory.heroImage.url}
              alt={ourStory.heroImage.alt || ourStory.heroTitle}
            />
          ) : null}
        </div>
      </section>

      {/* Introduction */}
      <section>
        <div>
          <p>{ourStory.introduction}</p>
        </div>
      </section>

      {/* Our Story */}
      <section>
        <div>
          <div>
            <h2>{ourStory.storyTitle}</h2>

            <div>
              {ourStory.storyContent
                .split('\n')
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>
          </div>

          {ourStory.storyImage?.url ? (
            <img
              src={ourStory.storyImage.url}
              alt={ourStory.storyImage.alt || ourStory.storyTitle}
            />
          ) : null}
        </div>
      </section>

      {/* Philosophy */}
      <section>
        <div>
          <h2>{ourStory.philosophyTitle}</h2>

          <div>
            {ourStory.philosophyContent
              .split('\n')
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>
        </div>
      </section>

      {/* Why Viora Lanka */}
      <section>
        <div>
          <h2>{ourStory.whyChooseUsTitle}</h2>

          <div>
            {ourStory.whyChooseUsContent
              .split('\n')
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section>
        <div>
          <h2>{ourStory.approachTitle}</h2>

          <div>
            {ourStory.approachContent
              .split('\n')
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div>
          <h2>{ourStory.ctaTitle}</h2>

          {ourStory.ctaDescription ? <p>{ourStory.ctaDescription}</p> : null}

          {ourStory.ctaButtonText && ourStory.ctaButtonUrl ? (
            <Link href={ourStory.ctaButtonUrl}>{ourStory.ctaButtonText}</Link>
          ) : null}
        </div>
      </section>
    </main>
  )
}
