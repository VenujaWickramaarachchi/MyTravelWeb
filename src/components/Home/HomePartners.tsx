import type { Partner } from '@/types/partner'

interface HomePartnersProps {
    partners: Partner[]
}

export default function HomePartners({
    partners,
}: HomePartnersProps) {
    if (!partners || partners.length === 0) {
        return null
    }

    return (
        <section className='py-14 sm:py-16 border-y border-line bg-paper'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center max-w-2xl mx-auto mb-10'>
                    <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-2'>
                        Our Partners
                    </p>

                    <h2 className='font-serif text-2xl sm:text-3xl font-normal text-ink'>
                        Trusted by Our Partners
                    </h2>
                </div>

                <div className='flex flex-wrap items-center justify-center gap-8 sm:gap-12'>
                    {partners.map((partner) => (
                        <div
                            key={partner.id}
                            className='flex items-center justify-center'
                        >
                            {partner.partnerLogo?.url ? (
                                <img
                                    src={partner.partnerLogo.url}
                                    alt={partner.partnerName}
                                    className='max-w-[150px] max-h-16 w-auto h-auto object-contain'
                                />
                            ) : (
                                <span className='text-sm font-medium text-ink/60'>
                                    {partner.partnerName}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}