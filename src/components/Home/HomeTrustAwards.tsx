import type { TrustAward } from '@/types/trust-award'

interface HomeTrustAwardsProps {
    trustAwards: TrustAward[]
}

export default function HomeTrustAwards({
    trustAwards,
}: HomeTrustAwardsProps) {
    if (!trustAwards || trustAwards.length === 0) {
        return null
    }

    return (
        <section className='bg-ivory/50 py-16 sm:py-20 border-y border-line'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center max-w-2xl mx-auto mb-10'>
                    <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-2'>
                        Trust & Recognition
                    </p>

                    <h2 className='font-serif text-2xl sm:text-3xl font-normal text-ink'>
                        Recognised for Exceptional Travel
                    </h2>

                    <p className='mt-4 text-sm sm:text-base text-ink/65 leading-relaxed'>
                        Our trusted partnerships and industry recognition reflect our
                        commitment to creating thoughtful, high-quality journeys across
                        Sri Lanka.
                    </p>
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {trustAwards.map((award) => (
                        <article
                            key={award.id}
                            className='flex flex-col items-center text-center p-6 bg-paper border border-line rounded'
                        >
                            {award.logo?.url ? (
                                <img
                                    src={award.logo.url}
                                    alt={award.name || award.title}
                                    className='max-w-[140px] max-h-20 w-auto h-auto object-contain mb-5'
                                />
                            ) : (
                                <div className='w-16 h-16 rounded-full border border-line flex items-center justify-center mb-5'>
                                    <span className='text-xs font-semibold text-violet'>
                                        Award
                                    </span>
                                </div>
                            )}

                            <h3 className='text-sm font-semibold text-ink'>
                                {award.name || award.title}
                            </h3>

                            {award.issuingOrganization && (
                                <p className='mt-1 text-xs text-ink/60'>
                                    {award.issuingOrganization}
                                </p>
                            )}

                            {award.awardType && (
                                <p className='mt-2 text-xs uppercase tracking-wider text-gold-deep'>
                                    {award.awardType}
                                </p>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}