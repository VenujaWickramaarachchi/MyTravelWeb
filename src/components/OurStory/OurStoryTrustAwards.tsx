import type { TrustAward } from '@/types/trust-award'

interface OurStoryTrustAwardsProps {
    trustAwards: TrustAward[]
}

export default function OurStoryTrustAwards({
    trustAwards,
}: OurStoryTrustAwardsProps) {
    if (!trustAwards || trustAwards.length === 0) {
        return null
    }

    return (
        <section className='py-20 sm:py-24 border-t border-line'>
            <div className='max-w-6xl mx-auto px-6'>
                <div className='max-w-2xl mx-auto text-center mb-12'>
                    <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-3'>
                        Trust & Recognition
                    </p>

                    <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
                        Recognised for What We Do
                    </h2>

                    <p className='mt-4 text-ink/65 leading-relaxed'>
                        Our commitment to thoughtful travel, genuine hospitality, and
                        meaningful experiences is reflected in the recognition we have
                        received from trusted organisations.
                    </p>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8'>
                    {trustAwards.map((award) => (
                        <article
                            key={award.id}
                            className='text-center border border-line rounded-lg p-6 bg-ivory/40'
                        >
                            {award.logo?.url ? (
                                <div className='h-20 flex items-center justify-center mb-5'>
                                    <img
                                        src={award.logo.url}
                                        alt={award.name || award.title}
                                        className='max-h-16 max-w-[160px] object-contain'
                                    />
                                </div>
                            ) : (
                                <div className='h-20 flex items-center justify-center mb-5'>
                                    <span className='font-serif text-lg text-ink'>
                                        {award.name || award.title}
                                    </span>
                                </div>
                            )}

                            <h3 className='font-serif text-lg text-ink'>
                                {award.name || award.title}
                            </h3>

                            {award.issuingOrganization && (
                                <p className='mt-2 text-sm text-ink/60'>
                                    {award.issuingOrganization}
                                </p>
                            )}

                            {award.awardType && (
                                <p className='mt-2 text-xs uppercase tracking-wider text-gold-deep'>
                                    {award.awardType}
                                </p>
                            )}

                            {award.websiteUrl && (
                                <a
                                    href={award.websiteUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='inline-block mt-4 text-xs font-semibold uppercase tracking-wider text-ink hover:text-gold-deep transition-colors'
                                >
                                    View Recognition
                                </a>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}