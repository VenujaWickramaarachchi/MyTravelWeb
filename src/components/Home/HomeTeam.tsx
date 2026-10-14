import Image from 'next/image'
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
                    <article key={member.id} className='group text-center'>
                        <div className='relative aspect-[4/5] overflow-hidden rounded-[20px] bg-ivory mb-4 shadow-sm hover:shadow-md transition-shadow border border-line/60'>
                            {member.profileImage?.url ? (
                                <>
                                    <Image
                                        src={member.profileImage.url}
                                        alt={member.fullName}
                                        fill
                                        sizes='(max-width: 768px) 50vw, 25vw'
                                        loading='lazy'
                                        className='object-cover object-[center_20%] transition-transform duration-700 ease-luxury group-hover:scale-[1.025]'
                                    />
                                    <div className='absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent pointer-events-none' />
                                </>
                            ) : (
                                <div className='w-full h-full flex items-center justify-center text-sm text-ink/50 font-serif'>
                                    <span>{member.fullName}</span>
                                </div>
                            )}
                        </div>

                        <h3 className='font-serif text-lg text-ink font-medium leading-tight group-hover:text-violet transition-colors'>
                            {member.fullName}
                        </h3>

                        {member.position && (
                            <p className='mt-1 text-[10px] uppercase tracking-[0.16em] font-semibold text-gold-deep'>
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