import type { TeamMember } from '@/types/team-member'

interface OurStoryTeamProps {
    teamMembers: TeamMember[]
}

export default function OurStoryTeam({
    teamMembers,
}: OurStoryTeamProps) {
    if (!teamMembers || teamMembers.length === 0) {
        return null
    }

    return (
        <section className='py-20 sm:py-24 border-t border-line'>
            <div className='max-w-7xl mx-auto px-6'>
                <div className='max-w-2xl mx-auto text-center mb-12'>
                    <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-3'>
                        The People Behind Viora Lanka
                    </p>

                    <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
                        Meet Our Team
                    </h2>

                    <p className='mt-4 text-ink/65 leading-relaxed'>
                        Our team brings together local knowledge, genuine hospitality,
                        and a passion for creating meaningful journeys across Sri Lanka.
                    </p>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8'>
                    {teamMembers.map((member) => (
                        <article
                            key={member.id}
                            className='text-center'
                        >
                            {member.profileImage?.url ? (
                                <div className='aspect-[4/5] overflow-hidden rounded bg-ivory mb-5'>
                                    <img
                                        src={member.profileImage.url}
                                        alt={member.fullName}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                            ) : (
                                <div className='aspect-[4/5] rounded bg-ivory border border-line mb-5 flex items-center justify-center'>
                                    <span className='text-sm text-ink/50'>
                                        {member.fullName}
                                    </span>
                                </div>
                            )}

                            <h3 className='font-serif text-lg text-ink'>
                                {member.fullName}
                            </h3>

                            {member.position && (
                                <p className='mt-1 text-xs uppercase tracking-wider text-gold-deep'>
                                    {member.position}
                                </p>
                            )}

                            {member.shortBio && (
                                <p className='mt-3 text-sm text-ink/60 leading-relaxed'>
                                    {member.shortBio}
                                </p>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}