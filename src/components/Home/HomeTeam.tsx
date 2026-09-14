import type { TeamMember } from '@/types/team-member'

interface HomeTeamProps {
    teamMembers: TeamMember[]
}

export default function HomeTeam({
    teamMembers,
}: HomeTeamProps) {
    if (!teamMembers || teamMembers.length === 0) {
        return null
    }

    return (
        <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col md:flex-row md:items-end justify-between mb-10'>
                <div className='max-w-2xl'>
                    <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-2'>
                        The People Behind Your Journey
                    </p>

                    <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
                        Meet Our Team
                    </h2>

                    <p className='mt-4 text-ink/65 leading-relaxed'>
                        Local knowledge, genuine hospitality, and a passion for Sri Lanka
                        guide every journey we create.
                    </p>
                </div>

                <a
                    href='/our-story'
                    className='hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-violet hover:text-gold-deep uppercase tracking-wider transition-colors pt-4 md:pt-0'
                >
                    Meet the Team
                    <svg
                        className='w-4 h-4'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M9 5l7 7-7 7'
                        />
                    </svg>
                </a>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {teamMembers.slice(0, 4).map((member) => (
                    <article key={member.id} className='text-center'>
                        {member.profileImage?.url ? (
                            <div className='aspect-[4/5] overflow-hidden rounded bg-ivory mb-4'>
                                <img
                                    src={member.profileImage.url}
                                    alt={member.fullName}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                        ) : (
                            <div className='aspect-[4/5] rounded bg-ivory border border-line mb-4 flex items-center justify-center'>
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
                    </article>
                ))}
            </div>

            <div className='mt-8 text-center md:hidden'>
                <a
                    href='/about'
                    className='inline-flex items-center px-6 py-2.5 text-sm font-medium text-violet border border-violet/30 rounded'
                >
                    Meet the Team
                </a>
            </div>
        </section>
    )
}