import Link from 'next/link'

import type { OurStory } from '@/types/our-story'

interface OurStoryCTAProps {
  data: OurStory
}

export default function OurStoryCTA({ data }: OurStoryCTAProps) {
  return (
    <section>
      <div>
        <h2>{data.ctaTitle}</h2>

        {data.ctaDescription ? <p>{data.ctaDescription}</p> : null}

        {data.ctaButtonText && data.ctaButtonUrl ? (
          <Link href={data.ctaButtonUrl}>{data.ctaButtonText}</Link>
        ) : null}
      </div>
    </section>
  )
}
